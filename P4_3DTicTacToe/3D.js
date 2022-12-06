
// Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const raycaster = new THREE.Raycaster();
raycaster.layers.set(5);
const pointer = new THREE.Vector2();

pointer.x = 1;
pointer.y = 1;

// Geometries

const groundLength = gridSize * 25;

const colliderPlane = new THREE.BoxGeometry(groundLength, 0.05, groundLength);

const vert = new THREE.BoxGeometry(groundLength, 2, 2);
vert.translate(0, 0, 12);
const vert2 = new THREE.BoxGeometry(groundLength, 2, 2);
vert2.translate(0, 0, -12);
const hori = new THREE.BoxGeometry(2, 2, groundLength);
hori.translate(12, 0, 0);
const hori2 = new THREE.BoxGeometry(2, 2, groundLength);
hori2.translate(-12, 0, 0);

const X_Geo = new THREE.SphereGeometry(0.5, 32, 16);
const O_Geo = new THREE.TorusGeometry(8, 2, 12, 40);
O_Geo.rotateX(Math.PI / 2);

// Materials
const Ground_Mat = new THREE.MeshStandardMaterial({ color: 0xffffff });
const X_Mat = new THREE.MeshStandardMaterial({ color: 0x33ebeb });
const O_Mat = new THREE.MeshStandardMaterial({ color: 0xeb3434 });
const invis_Mat = new THREE.MeshStandardMaterial({ color: 0xffffff });

invis_Mat.transparent = true;
invis_Mat.opacity = 0.1;

O_Mat.flatShading = true;
// O_Mat.transparent = true;
// O_Mat.opacity = 0.4;

// Lighting
const mainPointL = new THREE.PointLight(0xffffff, 1, 100); // Main Lighting
mainPointL.position.set(0, 30, 10);

const light = new THREE.AmbientLight(0x404040, 0.5); // Ambient Lighting

// Meshes

const v1 = new THREE.Mesh(vert, Ground_Mat);
const v2 = new THREE.Mesh(vert2, Ground_Mat);
const h1 = new THREE.Mesh(hori, Ground_Mat);
const h2 = new THREE.Mesh(hori2, Ground_Mat);

const collider = new THREE.Mesh(colliderPlane, invis_Mat);
collider.layers.set(5);

xP = [];
oP = [];

scene.add(v1);
scene.add(v2);
scene.add(h1);
scene.add(h2);
scene.add(mainPointL);
scene.add(light);
scene.add(collider);

camera.position.z = 75;

function animate() {
    requestAnimationFrame(animate);

    raycaster.setFromCamera( pointer, camera );
    const intersects = raycaster.intersectObjects( scene.children );

    if (intersects.length > 0) {
        console.log(intersects[0].point);
    }

    renderer.render(scene, camera);
}
animate();


function onPointerMove( event ) {
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

addEventListener("mousemove", (event) => {
    if (event.buttons == 1) {
        cameraMovement(event.movementX, event.movementY);
    }
});

addEventListener("pointermove", (event) => {
    onPointerMove(event);
});

function cameraMovement(movementX, movementY) {
    scene.rotation.y += movementX / 200;
    scene.rotation.x += movementY / 200;
}

function addPiece(player, tile, second=false) {
    if (player == "X") {
        let piece = new THREE.Mesh(X_Geo, X_Mat);
        xP[xP.length] = piece;
        scene.add(xP[xP.length-1]);
        xP[xP.length-1].position.x = tile[1]-1;
        xP[xP.length-1].position.z = tile[0]-1;
        if (second) {
            xP[xP.length-1].position.y = 1;
        }
    } else {
        let piece = new THREE.Mesh(O_Geo, O_Mat);
        oP[oP.length] = piece;
        scene.add(oP[oP.length-1]);
        oP[oP.length-1].position.x = tile[1]-1;
        oP[oP.length-1].position.z = tile[0]-1;
        if (second) {
            oP[oP.length-1].position.y = 1.5;
        }
    }
}

move("O", [1, 1]);