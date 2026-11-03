console.log("hello world");

const container = document.querySelector('#camera-container');
const video = document.querySelector('#camera');
const playButton = document.querySelector('#start-camera');
const captureButton = document.querySelector('#capture');

let cameraOn = false;
let localStream = null;

playButton.addEventListener('click', async () => {
    if (!cameraOn) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'user'
                },
                audio: false
            });
    
            video.srcObject = stream;
            localStream = stream;
            cameraOn = true;
            playButton.textContent = "tutup camera";
        } catch (error) {
            console.error('Kamera gagal dibuka:', error);
        }
    } else {
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
        }
        video.srcObject = null;
        cameraOn = false;
        playButton.textContent = "start camera";
    }
});


captureButton.addEventListener('click', () => {
    if (cameraOn && video.srcObject) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const dataURL = canvas.toDataURL('image/png');
        
        let resultImage = document.querySelector('#result-image');
        if (!resultImage) {
            resultImage = document.createElement('img');
            resultImage.id = 'result-image';
            resultImage.style.width = '100%';
            resultImage.style.marginTop = '10px';
            container.appendChild(resultImage);
        }
        resultImage.src = dataURL;
    }
});

