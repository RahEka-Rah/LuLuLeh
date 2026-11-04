

const $ = (id) => document.getElementById(id);

export const API_URL = 'http://localhost:5173/api/detect';

export const el = {
    video: $('camera'),
    canvas: $('canvas'),
    cameraButtons: $('camera-button'),
    start: $('start-camera'),
    capture: $('capture'),
    retake: $('retake'),
    preview: $('preview'),
    previewContainer: $('preview-container'),
    scan: $('scan'),
    result: $('result'),
};

export function escapeHtml(value) {
    return String(value ?? '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

export function safeUrl(url) {
    try {
        const parsed = new URL(url);
        return ['http:', 'https:'].includes(parsed.protocol) ? parsed.href : '#';
    } catch {
        return '#';
    }
}
