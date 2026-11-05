
import * as THREE from 'three';

const container = document.getElementById('earth-container');

if (!container) {
    throw new Error('earth-container tidak ditemukan');
}

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    100
);

camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setSize(
    container.clientWidth,
    container.clientHeight
);

renderer.setPixelRatio(window.devicePixelRatio);

container.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(1, 64, 64);

const textureLoader = new THREE.TextureLoader();

const earthTexture = textureLoader.load(
    'https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg'
);

const material = new THREE.MeshStandardMaterial({
    map: earthTexture,
    roughness: 0.8,
    metalness: 0
});

material.color.set(0xffffff);

const earth = new THREE.Mesh(geometry, material);

const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);

scene.add(ambientLight);

const sunlight = new THREE.DirectionalLight(0xffffff, 1.5);

sunlight.position.set(5, 3, 5);

scene.add(sunlight);
scene.add(earth);

function animate() {
    requestAnimationFrame(animate);

    earth.rotation.y += 0.005;

    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    const width = container.clientWidth;
    const height = container.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
});
