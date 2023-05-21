//Dependencies
import {useEffect, useRef} from 'react';

//Components
import { Sidebar } from "../components/Sidebar";
import { Navbar } from "../components/Navbar";

//Others
import { Unfold } from "../helpers/Unfold";
import useDetections from '../hooks/useDetections';

export function Home() {

    const videoWidth = 640;
    const videoHeight = 480;

    const videoRef = useRef();
    const canvasRef = useRef();

    const {loadModels, handleVideoOnPlay} = useDetections(videoWidth, videoHeight, videoRef, canvasRef);

    useEffect(() => {
        loadModels();
    }, []);

    return (
        <div onClick={Unfold}>
            <Navbar/>
            <Sidebar/>
            <div className="p-4 sm:ml-64">
                <div className="p-4 rounded-lg dark:border-gray-700 mt-14">
                   <div className='realtive flex'>
                        <video
                            ref={videoRef}
                            width="640"
                            height="480"
                            playsInline
                            autoPlay
                            onPlay={handleVideoOnPlay}
                        />
                        <canvas className='absolute' ref={canvasRef}/>
                   </div>
                </div>
            </div>
        </div>
    )
}