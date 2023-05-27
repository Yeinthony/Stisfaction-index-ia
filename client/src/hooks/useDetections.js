//Dependencies
import * as faceApi from 'face-api.js';

export default function useDetections(videoRef, canvasRef){

    const loadModels = async () => {
        const MODEL_URL = `/models`;
        
        try {

            await faceApi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
            await faceApi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
            await faceApi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
            await faceApi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
            await faceApi.nets.ageGenderNet.loadFromUri(MODEL_URL);
            await faceApi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);

            return {success: true};

        } catch (error) {
            
            return {success: false, err: error}

        }
    };

    const startVideo = async () => {
        videoRef.current.srcObject = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {}
        });
    }

    const stopVideo = async () => {
        videoRef.current.srcObject = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {}
        }).then(MediaStream => {
            const stream = MediaStream;
            const tracks = stream.getTracks();

            tracks[0].stop;
        });
    }

    const handleVideoOnPlay = () => {

        setInterval(async () => {
            try {
                console.log(canvasRef);
                if (canvasRef.current) {
                    canvasRef.current.innerHTML = faceApi.createCanvasFromMedia(
                        videoRef.current
                    );

                    const detections = await faceApi
                        .detectAllFaces(
                            videoRef.current,
                            new faceApi.TinyFaceDetectorOptions()
                        )
                        .withFaceLandmarks()
                        .withFaceDescriptors()
                        .withFaceExpressions()
                        .withAgeAndGender();
                    
                    console.log(detections);
 
                    const dims = faceApi.matchDimensions(canvasRef.current, videoRef.current, true);

                    const resizedDetections = faceApi.resizeResults(detections, dims);
 
                    if (canvasRef.current) {
                        canvasRef.current
                            .getContext('2d') // The HTMLCanvasElement.getContext() method returns a drawing context on the canvas, or null if the context identifier is not supported.
                            .clearRect(0, 0, dims.width, dims.height); // The clearRect() method in HTML canvas is used to clear the pixels in a given rectangle.
                        // Draw our detections, face landmarks and expressions.
                        faceApi.draw.drawDetections(canvasRef.current, resizedDetections);
                        faceApi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
                        faceApi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
                    }
                }
            } catch (err) {
                alert(err);
            }
        }, 100);
    };

    return {
        loadModels,
        startVideo,
        stopVideo,
        handleVideoOnPlay
    }

}

