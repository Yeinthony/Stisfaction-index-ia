import {useEffect, useRef, useState} from 'react';

//Dependencies
import { IoPauseCircleOutline, IoCaretForwardCircleOutline } from 'react-icons/io5';
import { DateTime } from 'luxon';

//Components
import { Sidebar } from "../components/Sidebar";
import { Navbar } from "../components/Navbar";
import { Button } from '../components/buttons/Button';
import { HorizontalBar } from '../components/charts/bars/HorizontalBar';
import { VerticalBar } from '../components/charts/bars/VerticalBar';

//Others
import { Unfold } from "../helpers/Unfold";
import useDetections from '../hooks/useDetections';
import { PieChart } from '../components/charts/pie/pie';
import { averagePorcentage } from '../helpers/AveragePorcentange';

export function Home() {

    const [play, setPlay] = useState(false);
    const [expressions, setExpretions] = useState({});
    const [genders, setGenders] = useState({});
    const [ages, useAges] = useState({});

    const videoRef = useRef();
    const canvasRef = useRef();

    const {loadModels, startVideo, stopVideo, handleVideoOnPlay} = useDetections(videoRef, canvasRef);

    const today = new Date();
    const token = sessionStorage.getItem('token');
    const id = localStorage.getItem('id');
    const day = today.getDate();
    const week = DateTime.local().weekNumber;
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    
    const detectedGenders =  [];

    useEffect(() => {

        const loadingModels = async() => {
            const res = await loadModels();
            console.log(res);
        }
            
        loadingModels();
        
    }, []);

    const startDetections = () =>{
        setPlay(true);
        startVideo();
    }

    const finishDetections = () =>{
        setPlay(false)
        stopVideo();
    }

    const onPlay = () =>{
        let count = 0;
        setInterval(async () => {
            const detections = await handleVideoOnPlay();
            if(detections.length > 0){

                const dt = detections[0];
                detectedGenders.push(dt.gender);

                // Counts the number of times male or female is repeated in detectedGenders
                const resG = detectedGenders.reduce((a, d) => (a[d] ? a[d] += 1 : a[d] = 1, a), {});
                const length = detectedGenders.length;

                if(count === 0){

                    setExpretions({
                        angry: dt.expressions.angry * 100,
                        disgust: dt.expressions.disgust * 100,
                        fear: dt.expressions.fear * 100,
                        happy: dt.expressions.happy * 100,
                        neutral: dt.expressions.neutral * 100,
                        sad: dt.expressions.sad * 100,
                        surprise: dt.expressions.surprise * 100,
                        day,
                        week,
                        month,
                        year,
                        user: id
                    });

                    if(resG.male){
                        setGenders({
                            male: (resG.male / length) * 100,
                            female: 0,
                            day,
                            week,
                            month,
                            year,
                            user: id
                        });
                    }

                    if(resG.female){
                        setGenders({
                            male: 0,
                            female: (resG.female / length) * 100,
                            day,
                            week,
                            month,
                            year,
                            user: id
                        });
                    }

                    console.log(expressions);
                    console.log(genders);
                    
                }else{

                    // Set expressions with average porcentage
                    expressions.angry = averagePorcentage(expressions.angry, dt.expressions.angry * 100);
                    expressions.disgust = averagePorcentage(expressions.disgust, dt.expressions.disgust * 100);
                    expressions.fear =  averagePorcentage(expressions.fear, dt.expressions.fear * 100);
                    expressions.happy = averagePorcentage(expressions.happy, dt.expressions.happy * 100);
                    expressions.neutral = averagePorcentage(expressions.neutral, dt.expressions.neutral * 100);
                    expressions.disgust = averagePorcentage(expressions.disgust, dt.expressions.sad * 100);
                    expressions.disgust = averagePorcentage(expressions.disgust, dt.expressions.surprise * 100);

                    // Set genders with average porcentage
                    if(resG.female){
                        genders.female = (resG.female / length) * 100;
                    }
                    if(resG.male){
                        genders.male = (resG.male / length) * 100;
                    }

                    console.log(expressions);
                    console.log(genders);

                }

                count += 1;
            }
        }, 100);
    }

    return (
        <div onClick={Unfold}>
            <Navbar/>
            <Sidebar/>
            <div className="p-4 sm:ml-64 bg-white-custon">
                <div className="p-4 rounded-lg dark:border-gray-700 mt-14">
                   <div className="flex justify-center">
                        <div className='flex relative overflow-hidden w-8/12 h-94 bg-white-custon-light border border-gray-200 rounded-lg shadow'>
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
                        </div>
                        <div className='lg:w-4/12 lg:ml-6 flex justify-center h-94 py-9 bg-white-custon-light border border-gray-200 rounded-lg shadow'>
                            {expressions ?
                                <PieChart 
                                    title="Expresiones detectadas" 
                                    labels={["Enojo", "Disgusto", "Miedo", "Felicidad", "Neutral", "Tristeza", "Sorpresa"]} 
                                    dataset={[
                                        expressions.angry, 
                                        expressions.disgust, 
                                        expressions.fear, 
                                        expressions.happy, 
                                        expressions.neutral, 
                                        expressions.sad, 
                                        expressions.surprise
                                    ]}
                                 />:
                                 <PieChart 
                                    title="Expresiones detectadas" 
                                    labels={["Enojo", "Disgusto", "Miedo", "Felicidad", "Neutral", "Tristeza", "Sorpresa"]} 
                                    dataset={[0, 0, 0, 0, 0, 0, 0]}
                                 />
                            }
                        </div>
                   </div>

                    <div className='w-full h-94 flex mt-4'>
                        <div className='w-1/2 h-max p-4 bg-white-custon-light border border-gray-200 rounded-lg shadow'>
                            {genders ?
                                <HorizontalBar 
                                    title="Generos detectados" 
                                    labels={["M", "F"]} 
                                    dataset={[genders.male, genders.female]}
                                />:
                                <HorizontalBar 
                                    title="Generos detectados" 
                                    labels={["M", "F"]} 
                                    dataset={[0, 0]}
                                />
                            }
                        </div>    
                        <div className='w-1/2 h-max ml-4 p-4 bg-white-custon-light border border-gray-200 rounded-lg shadow'>
                            <VerticalBar 
                                title="Edades detectadas" 
                                labels={["6-11", "12-18", "19-26", "27-59", "60-80"]} 
                                dataset={[10, 40, 35, 15, 12]}
                            />
                        </div>                      
                    </div>
                        
                </div>
            </div>
        </div>
    )
}