import {useEffect, useRef, useState} from 'react';

//Dependencies
import { IoPauseCircleOutline, IoCaretForwardCircleOutline } from 'react-icons/io5';

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

export function Home() {

    const [play, setPlay] = useState(false);

    const videoRef = useRef();
    const canvasRef = useRef();

    const {loadModels, startVideo, stopVideo, handleVideoOnPlay} = useDetections(videoRef, canvasRef);

    useEffect(() => {

        const loadingModels = async() => {
            const res = await loadModels();
            console.log(res)
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
                                onPlay={handleVideoOnPlay}
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
                            <PieChart 
                                title="Expresiones detectadas" 
                                labels={["Enojo", "Disgusto", "Miedo", "Felicidad", "Neutral", "Tristeza", "Sorpresa"]} 
                                dataset={[0.070, 0.0006, 0.0004, 76.43, 22.84, 0.14, 0.49]}
                            />
                        </div>
                   </div>

                    <div className='w-full h-94 flex mt-4'>
                        <div className='w-1/2 h-max p-4 bg-white-custon-light border border-gray-200 rounded-lg shadow'>
                            <HorizontalBar 
                                title="Generos detectados" 
                                labels={["M", "F"]} 
                                dataset={[60, 40]}
                            />
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