import { el } from './dom.js';
import { clearResult, renderError } from './render.js';

let localStream = null;
let capturedImage = null;

const START_LABEL = 'Buka Kamera';
const STOP_LABEL = 'Tutup Kamera';

function stopStream() {
    localStream?.getTracks().forEach((track) => track.stop());
    localStream = null;
    el.video.srcObject = null;
}

function setPreviewMode(active) {
    el.previewContainer.hidden = !active;
    el.video.hidden = active;
    el.cameraButtons.hidden = active;

    el.start.disabled = active;
    el.capture.disabled = active || !localStream;
    el.scan.disabled = !active;
}

el.start.addEventListener('click', async () => {
    if (localStream) {
        stopStream();
        el.start.textContent = START_LABEL;
        el.capture.disabled = true;
        return;
    }

    try {
        localStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' },
            audio: false,
        });

        el.video.srcObject = localStream;
        el.start.textContent = STOP_LABEL;
        el.capture.disabled = false;
    } catch (error) {
        console.error(error);
        renderError('Kamera tidak dapat dibuka. Periksa izin kamera di browser.');
    }
});

el.capture.addEventListener('click', () => {
    el.canvas.width = el.video.videoWidth;
    el.canvas.height = el.video.videoHeight;
    el.canvas.getContext('2d').drawImage(el.video, 0, 0);

    el.canvas.toBlob((blob) => {
        if (!blob) return;

        capturedImage = blob;
        el.preview.src = URL.createObjectURL(blob);
        setPreviewMode(true);
    }, 'image/jpeg', 0.85);
});

el.retake.addEventListener('click', () => {
    URL.revokeObjectURL(el.preview.src);
    el.preview.removeAttribute('src');
    capturedImage = null;

    setPreviewMode(false);
    clearResult();
});

export function getCapturedImage() {
    return capturedImage;
}
