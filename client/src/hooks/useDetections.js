//Dependencies
import * as faceApi from 'face-api.js';

export default function useDetections(videoWidth, videoHeight, videoRef, canvasRef){

    const loadModels = async () => {
        const MODEL_URL = `../../public/models`;
        Promise.all([
            faceApi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
            faceApi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
            faceApi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
            faceApi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
            faceApi.nets.ageGenderNet.loadFromUri(MODEL_URL),
            faceApi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        ]).then(async () => {
            try {
                videoRef.current.srcObject = await navigator.mediaDevices.getUserMedia({
                    audio: false,
                    video: {
                        width: videoWidth,
                        height: videoHeight,
                    },
                });
            } catch (err) {
                console.error(err);
            }
        }).catch((err) => console.log(err));
    };

    const handleVideoOnPlay = () => {

        setInterval(async () => {
            try {
                if (canvasRef.current) {
                    canvasRef.current.innerHTML = faceApi.createCanvasFromMedia(
                        videoRef.current
                    );

                    faceApi.matchDimensions(canvasRef.current, {
                        width: videoWidth,
                        height: videoHeight,
                    });

                    const detections = await faceApi
                        .detectAllFaces(
                            videoRef.current,
                            new faceApi.TinyFaceDetectorOptions()
                        )
                        .withFaceLandmarks()
                        .withFaceExpressions();
 
                    const resizedDetections = faceApi.resizeResults(
                        detections,
                        {
                            width: videoWidth,
                            height: videoHeight,
                        }
                    );
 
                    if (canvasRef.current) {
                        canvasRef.current
                            .getContext('2d') // The HTMLCanvasElement.getContext() method returns a drawing context on the canvas, or null if the context identifier is not supported.
                            .clearRect(0, 0, videoWidth, videoHeight); // The clearRect() method in HTML canvas is used to clear the pixels in a given rectangle.
                        // Draw our detections, face landmarks and expressions.
                        faceApi.draw.drawDetections(canvasRef.current, resizedDetections);
                        faceApi.draw.drawFaceLandmarks(
                            canvasRef.current,
                            resizedDetections
                        );
                        faceApi.draw.drawFaceExpressions(
                            canvasRef.current,
                            resizedDetections
                        );
                    }
                }
            } catch (err) {
                alert(err);
            }
        }, 100);
    };

    return {
        loadModels,
        handleVideoOnPlay
    }

}

