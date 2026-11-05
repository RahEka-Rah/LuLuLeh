import { API_URL, el } from './dom.js';
import { getCapturedImage } from './camera.js';
import { renderError, renderResult } from './render.js';

const SCAN_LABEL = 'Cek Sampah';

el.scan.addEventListener('click', async () => {
    const image = getCapturedImage();
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image, 'capture.jpg');

    try {
        el.scan.disabled = true;
        el.scan.textContent = 'Menganalisis...';

        const response = await fetch(API_URL, { method: 'POST', body: formData });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Scan gagal');
        }

        renderResult(data);

    } catch (error) {

        renderError(error.message);
    } finally {
        el.scan.disabled = false;
        el.scan.textContent = SCAN_LABEL;
    }
});
