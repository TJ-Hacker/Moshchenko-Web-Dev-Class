
// Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Geometries
const plane = new THREE.BoxGeometry(gridSize, 0.05, gridSize);
// const xPiece = new THREE.BoxGeometry(1, 1, 1);
const xPiece = new THREE.SphereGeometry(0.5, 32, 16);
const oPiece = new THREE.SphereGeometry(0.5, 32, 16);

// Materials
const xPiece_mat = new THREE.MeshStandardMaterial({ color: 0x4287f5 });
const oPiece_mat = new THREE.MeshStandardMaterial({ color: 0xb03131 });
const ghost_mat = new THREE.MeshStandardMaterial({ color: 0xffffff });

// Lighting
const mainPointL = new THREE.PointLight(0xffffff, 1, 100);
mainPointL.position.set(0, 30, 10);

// Meshes
const ground = new THREE.Mesh(plane, ghost_mat);

xP = [];
oP = [];

scene.add(ground);
scene.add(mainPointL);

camera.position.z = 3.4;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

addEventListener("mousemove", (event) => {
    if (event.buttons == 1) {
        cameraMovement(event.movementX, event.movementY);
    }
});

function cameraMovement(movementX, movementY) {
    scene.rotation.y += movementX / 200;
    scene.rotation.x += movementY / 200;
}

function addPiece(player, tile, second=false) {
    if (player == "X") {
        let piece = new THREE.Mesh(xPiece, xPiece_mat);
        xP[xP.length] = piece;
        scene.add(xP[xP.length-1]);
        xP[xP.length-1].position.x = tile[1]-1;
        xP[xP.length-1].position.z = tile[0]-1;
        if (second) {
            xP[xP.length-1].position.y = 1;
        }
    } else {
        let piece = new THREE.Mesh(oPiece, oPiece_mat);
        oP[oP.length] = piece;
        scene.add(oP[oP.length-1]);
        oP[oP.length-1].position.x = tile[1]-1;
        oP[oP.length-1].position.z = tile[0]-1;
        if (second) {
            oP[oP.length-1].position.y = 1.5;
        }
    }
}