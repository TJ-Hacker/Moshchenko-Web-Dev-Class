
// Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Mesh data
const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
const material = new THREE.MeshNormalMaterial();
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

addEventListener("mousemove", (event) => {
    if (event.buttons == 1){
        cameraMovement(event.movementX, event.movementY);
    }
});

function cameraMovement(movementX, movementY) {
    scene.rotation.y += movementX / 200;
    scene.rotation.x += movementY / 200;
}
