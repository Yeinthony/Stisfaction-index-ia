import {useEffect, useRef, useState} from 'react';

//Dependencies
import { IoPauseCircleOutline, IoCaretForwardCircleOutline } from 'react-icons/io5';
import { DateTime } from 'luxon';

//Components
import { Sidebar } from "../components/Sidebar";
import { Navbar } from "../components/Navbar";
import { Button } from '../components/buttons/Button';

//Others
import { Unfold } from "../helpers/Unfold";
import useDetections from '../hooks/useDetections';
import { averagePorcentage } from '../helpers/AveragePorcentange';
import { createExpressions } from '../api/expressions.api';
import { createGenders } from '../api/genders.api';
import { createAges } from '../api/ages.api';
import { useNavigate } from 'react-router-dom';

export function Home() {

    const [play, setPlay] = useState(false);
    const [loadModel, setLoadModel] = useState(false);
    const [expressions, setExpressions] = useState({
        angry: 0,
        disgust: 0,
        fear: 0,
        happy: 0,
        neutral: 0,
        sad: 0,
        surprise: 0,
        day: 0,
        week: 0,
        month: 0,
        year: 0,
        user: ""
    });
    const [genders, setGenders] = useState({
        male: 0,
        female: 0,
        day: 0,
        week: 0,
        month: 0,
        year: 0,
        user: ""
    });
    const [ages, setAges] = useState({
        six_to_eleven: 0,
        twelve_to_eighteen: 0,
        nineteen_to_twentysix: 0,
        twentyseveven_to_fiftynine: 0,
        sixty_to_eighty: 0,
        day: 0,
        week: 0,
        month: 0,
        year: 0,
        user: ""
    });

    const videoRef = useRef();
    const canvasRef = useRef();
    const navigate = useNavigate();

    const {loadModels, startVideo, stopVideo, handleVideoOnPlay} = useDetections(videoRef, canvasRef);

    const today = new Date();
    const token = sessionStorage.getItem('token');
    const id = localStorage.getItem('id');
    const day = today.getDate();
    const week = DateTime.local().weekNumber;
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    
    const detectedGenders =  [];
    const detectedAges =  [];

    useEffect(() => {

        const loadingModels = async() => {
            const res = await loadModels();
            if(res.success) setLoadModel(true);
        }
            
        loadingModels();
        
    }, []);

    const startDetections = () =>{
        setPlay(true);
        startVideo();
    }

    const finishDetections = () =>{
        setPlay(false)
        const createDetections = async() =>{
            const resCreEx = await createExpressions(token, expressions);
            const resCreGe = await createGenders(token, genders);
            const resCreAg = await createAges(token, ages);
            if (resCreEx.status === 201 && resCreGe.status === 201 && resCreAg.status === 201) {
                stopVideo();
                navigate("/statistics-days");
            }
            
            window.location.reload();
        }
        createDetections();
    }

    const onPlay = () =>{

        let count = 0;
        expressions.day = day;
        expressions.week = week;
        expressions.month = month;
        expressions.year = year;
        expressions.user = id;

        genders.day = day;
        genders.week = week;
        genders.month = month;
        genders.year = year;
        genders.user = id;

        ages.day = day;
        ages.week = week;
        ages.month = month;
        ages.year = year;
        ages.user = id;

        setInterval(async () => {
            const detections = await handleVideoOnPlay();
            if(detections.length > 0){

                const dt = detections[0];
                detectedGenders.push(dt.gender);

                if(dt.age >= 6 && dt.age <= 11) detectedAges.push("six_to_eleven");
                if(dt.age >= 12 && dt.age <= 18) detectedAges.push("twelve_to_eighteen");
                if(dt.age >= 19 && dt.age <= 26) detectedAges.push("nineteen_to_twentysix");
                if(dt.age >= 27 && dt.age <= 59) detectedAges.push("twentyseveven_to_fiftynine");
                if(dt.age >= 60 && dt.age <= 80) detectedAges.push("sixty_to_eighty");

                // Counts the number of times male or female is repeated in detectedGenders
                const resG = detectedGenders.reduce((a, d) => (a[d] ? a[d] += 1 : a[d] = 1, a), {});
                const lengthG = detectedGenders.length;

                const resA = detectedAges.reduce((a, d) => (a[d] ? a[d] += 1 : a[d] = 1, a), {});
                const lengthA = detectedAges.length;


                if(count === 0){

                    //Average expressions
                    expressions.angry = (dt.expressions.angry * 100).toFixed(2);
                    expressions.disgust = (dt.expressions.disgusted * 100).toFixed(2);
                    expressions.fear = (dt.expressions.fearful * 100).toFixed(2);
                    expressions.happy = (dt.expressions.happy * 100).toFixed(2);
                    expressions.neutral = (dt.expressions.neutral * 100).toFixed(2);
                    expressions.sad = (dt.expressions.sad * 100).toFixed(2);
                    expressions.surprise = (dt.expressions.surprised * 100).toFixed(2);

                    //Average genders
                    if(resG.male){                       
                        genders.male = ((resG.male / lengthG) * 100).toFixed(2);     
                    }

                    if(resG.female){
                        genders.female = ((resG.female / lengthG) * 100).toFixed(2);
                    }

                    //Average ages
                    if(resA.six_to_eleven){                       
                        ages.six_to_eleven = ((resA.six_to_eleven / lengthA) * 100).toFixed(2);     
                    }

                    if(resA.twelve_to_eighteen){
                        ages.twelve_to_eighteen = ((resA.twelve_to_eighteen / lengthA) * 100).toFixed(2);
                    }

                    if(resA.nineteen_to_twentysix){                       
                        ages.nineteen_to_twentysix = ((resA.nineteen_to_twentysix / lengthA) * 100).toFixed(2);     
                    }

                    if(resA.twentyseveven_to_fiftynine){
                        ages.twentyseveven_to_fiftynine = ((resA.twentyseveven_to_fiftynine / lengthA) * 100).toFixed(2);
                    }

                    if(resA.sixty_to_eighty){
                        ages.sixty_to_eighty = ((resA.sixty_to_eighty / lengthA) * 100).toFixed(2);
                    }

                    
                    
                }else{
                    // Set expressions with average porcentage
                    expressions.angry = (averagePorcentage(expressions.angry, dt.expressions.angry * 100)).toFixed(2);
                    expressions.disgust = (averagePorcentage(expressions.disgust, dt.expressions.disgusted * 100)).toFixed(2);
                    expressions.fear =+ (dt.expressions.fearful * 100).toFixed(2);
                    expressions.happy = (averagePorcentage(expressions.happy, dt.expressions.happy * 100)).toFixed(2);
                    expressions.neutral = (averagePorcentage(expressions.neutral, dt.expressions.neutral * 100)).toFixed(2);
                    expressions.disgust = (averagePorcentage(expressions.disgust, dt.expressions.sad * 100)).toFixed(2);
                    expressions.disgust = (averagePorcentage(expressions.disgust, dt.expressions.surprised * 100)).toFixed(2);

                    // Set genders with average porcentage
                    if(resG.female){
                        genders.female = ((resG.female / lengthG) * 100).toFixed(2);
                    }
                    if(resG.male){
                        genders.male = ((resG.male / lengthG) * 100).toFixed(2);
                    }

                    // Set ages with average porcentage
                    if(resA.six_to_eleven){                       
                        ages.six_to_eleven = ((resA.six_to_eleven / lengthA) * 100).toFixed(2);     
                    }

                    if(resA.twelve_to_eighteen){
                        ages.twelve_to_eighteen = ((resA.twelve_to_eighteen / lengthA) * 100).toFixed(2);
                    }

                    if(resA.nineteen_to_twentysix){                       
                        ages.nineteen_to_twentysix = ((resA.nineteen_to_twentysix / lengthA) * 100).toFixed(2);     
                    }

                    if(resA.twentyseveven_to_fiftynine){
                        ages.twentyseveven_to_fiftynine = ((resA.twentyseveven_to_fiftynine / lengthA) * 100).toFixed(2);
                    }

                    if(resA.sixty_to_eighty){
                        ages.sixty_to_eighty = ((resA.sixty_to_eighty / lengthA) * 100).toFixed(2);
                    }

                    
                }

                count += 1;

                // To float
                parseFloat(expressions.angry);
                parseFloat(expressions.disgust);
                parseFloat(expressions.fear);
                parseFloat(expressions.happy);
                parseFloat(expressions.sad);
                parseFloat(expressions.surprise);

                parseFloat(genders.male);
                parseFloat(genders.female);

                parseFloat(ages.six_to_eleven);
                parseFloat(ages.twelve_to_eighteen);
                parseFloat(ages.nineteen_to_twentysix);
                parseFloat(ages.twentyseveven_to_fiftynine);
                parseFloat(ages.sixty_to_eighty);

                const expre = expressions;
                const gen = genders;
                const ag = ages;

                setExpressions(expre);
                setGenders(gen);
                setAges(ag);

            }
        }, 1000);

    }

    return (
        <div onClick={Unfold}>
            <Navbar/>
            <Sidebar/>
            <div className="p-4 sm:ml-64 bg-white-custon">
                <div className="p-4 rounded-lg dark:border-gray-700 mt-12">
                   <div className="flex justify-center h-screen">
                        {loadModel ? 
                            <div className='flex relative overflow-hidden w-8/12 h-5/6 bg-white-custon-light border border-gray-200 rounded-lg shadow'>
                                <video
                                    className='absolute z-10 w-full'
                                    ref={videoRef}
                                    playsInline
                                    autoPlay
                                    onPlay={onPlay}
                                />
                                <canvas className='relative z-20 w-full' ref={canvasRef}/>
                                <div className='absolute z-30 top-1 right-1'>
                                    {play ? 
                                        <Button name={<IoPauseCircleOutline/>} handlePlay={finishDetections} />:
                                        <Button name={<IoCaretForwardCircleOutline/>} handlePlay={startDetections} />
                                    }
                                </div>                           
                            </div> : 
                            <div className='my-auto text-center'>
                                <svg aria-hidden="true" className="inline w-16 h-16 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#283447"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#38BDF2"/>
                                </svg>
                                <h4 className="mb-4 text-center text-1xl font-extrabold text-white-custon dark:text-white md:text-2xl lg:text-3xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-gray from-gray-dark">Cargando modelos...</span></h4>  
                            </div>  
                        }
                   </div>                        
                </div>
            </div>
        </div>
    )
}