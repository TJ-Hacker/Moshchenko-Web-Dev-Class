
// Setup
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const raycaster = new THREE.Raycaster();
raycaster.layers.set(5);
const pointer = new THREE.Vector2();
pointer.x = 1;
pointer.y = 1;
const groundLength = gridSize * 25;


// Geometries

// Used to detect mouse placement
const colliderPlane = new THREE.BoxGeometry(groundLength, 0.05, groundLength);

// Board lines
const vert = new THREE.BoxGeometry(groundLength, 2, 2);
vert.translate(0, 0, 12);
const vert2 = new THREE.BoxGeometry(groundLength, 2, 2);
vert2.translate(0, 0, -12);
const hori = new THREE.BoxGeometry(2, 2, groundLength);
hori.translate(12, 0, 0);
const hori2 = new THREE.BoxGeometry(2, 2, groundLength);
hori2.translate(-12, 0, 0);


const O_Geo = new THREE.TorusGeometry(8, 2.5, 12, 40);
O_Geo.rotateX(Math.PI / 2);

// Materials
const Ground_Mat = new THREE.MeshStandardMaterial({ color: 0xffffff });
const X_Mat = new THREE.MeshStandardMaterial({ color: 0x33ebeb });
const O_Mat = new THREE.MeshStandardMaterial({ color: 0xeb3434 });
const invis_Mat = new THREE.MeshStandardMaterial({ color: 0xffffff });

invis_Mat.transparent = true;
invis_Mat.opacity = 0.1;

O_Mat.flatShading = true;

// Lighting
const mainPointL = new THREE.PointLight(0xffffff, 1, 100); // Main Lighting
mainPointL.position.set(0, 30, 10);

const light = new THREE.AmbientLight(0x404040, 0.5); // Some Light Ambient Lighting

// Meshes

const v1 = new THREE.Mesh(vert, Ground_Mat);
const v2 = new THREE.Mesh(vert2, Ground_Mat);
const h1 = new THREE.Mesh(hori, Ground_Mat);
const h2 = new THREE.Mesh(hori2, Ground_Mat);




const collider = new THREE.Mesh(colliderPlane, invis_Mat);
collider.layers.set(5);

xP = [];
oP = [];


const CameraFocalPoint = new THREE.Object3D();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
CameraFocalPoint.add(camera);

scene.add(v1);
scene.add(v2);
scene.add(h1);
scene.add(h2);
scene.add(mainPointL);
scene.add(light);
scene.add(collider);
scene.add(CameraFocalPoint);

camera.translateZ(55);
camera.translateY(55);
camera.rotation.x = -1 * Math.PI / 4;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function onPointerMove( event ) {
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function shootRay() {
    raycaster.setFromCamera( pointer, camera );
    const intersects = raycaster.intersectObjects( scene.children );

    if (intersects.length > 0) {
        move(humanPlayer, clampPoint(intersects[0].point.x, intersects[0].point.z));
    }
}


// The mouselock logic is used to prevent accidental plays
mouseLock = 0;

addEventListener("mousemove", (event) => {
    if (cont) {
        if (event.buttons === 1) {
            cameraMovement(event.movementX);
            if (mouseLock === 1) {
                mouseLock = -1;
            }
        }
    }
});

addEventListener("pointermove", (event) => {
    if (cont) {
        onPointerMove(event);
    }
});

addEventListener("mouseup", (event) => {
    if (mouseLock > 0 && cont) {
        shootRay();
    } 
    mouseLock = 0;
});

addEventListener("mousedown", () => {
    mouseLock = 1;
});

function cameraMovement(movementX) {
    CameraFocalPoint.rotation.y += ((-1 * movementX / 500) % (Math.PI * 2));
    CameraFocalPoint.rotation.z = 0;
}

function clampPoint(pointX, pointY) {
    pointX += groundLength / 2;
    pointY += groundLength / 2;
    return [Math.floor(pointX / (groundLength / gridSize)), Math.floor(pointY / (groundLength / gridSize))];
}

function addPiece(player, tile, second=false) {
    PlaceClick.play();
    if (player === "X") {
        let piece = new THREE.Object3D();

        let line1 = new THREE.BoxGeometry(4, 4, 20);
        line1.rotateY(Math.PI / 4);
        let m1 = new THREE.Mesh(line1, X_Mat);
        let line2 = new THREE.BoxGeometry(4, 4, 20);
        let m2 = new THREE.Mesh(line2, X_Mat);
        line2.rotateY(-1 * Math.PI / 4);

        piece.add(m1);
        piece.add(m2);

        xP[xP.length] = piece;
        scene.add(xP[xP.length-1]);
        xP[xP.length-1].position.z = (tile[1]+1) * (groundLength / gridSize) - 2*groundLength / 3;
        xP[xP.length-1].position.x = (tile[0]+1) * (groundLength / gridSize) - 2*groundLength / 3;
        if (second) {
            xP[xP.length-1].position.y = 10;
        }
    } else {
        let piece = new THREE.Mesh(O_Geo, O_Mat);
        oP[oP.length] = piece;
        scene.add(oP[oP.length-1]);
        oP[oP.length-1].position.z = (tile[1]+1) * (groundLength / gridSize) - 2*groundLength / 3;
        oP[oP.length-1].position.x = (tile[0]+1) * (groundLength / gridSize) - 2*groundLength / 3;
        if (second) {
            oP[oP.length-1].position.y = 10;
        }
    }
}

function winAnimation() {
    id = setInterval(frame, 100);
    let messageCont = document.getElementById("winMes");
    let message = `Congrats Player ${winner}, you won! -- refresh to play again...`;
    messageCont.style.display = "block";
    messageCont.innerHTML = "";
    let framePos = 0;
    function frame() {
        if (framePos === message.length) {
            clearInterval(id);
        } else {
            framePos ++;
            messageCont.innerHTML += message.slice(framePos - 1, framePos);
        }
    }
}

function reset() {
    grid = [];
    lastMove = [];
    winner = -1;
    cont = true;
    for (let i = 0; i < gridSize; i ++) {
        grid[i] = [];
        for (let j = 0; j < gridSize; j ++) {
            grid[i][j] = [];
        }
    }

    return -1;
}

goAhead = reset();
animate();

if (humanPlayer == "O") {
    move("X", [Math.floor(Math.random() * 3), Math.floor(Math.random() * 3)]);
}