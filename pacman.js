let board;

// each tile is 32px x 32px
// 21 rows (0-20), 19 columns (0-18)

const rowCount = 21;
const columnCount = 19;
const tileSize = 32;
const boardWidth = columnCount*tileSize;
const boardHeight = rowCount*tileSize;
let context;

let blueGhostImg;
let orangeGhostImg;
let pinkGhostImg;
let redGhostImg;
let pacmanUpImg;
let pacmanDownImg;
let pacmanLeftImg;
let pacmanRightImg;
let pacmanClosedImg;
let wallImg;

//X = wall, O = skip, P = pac man, ' ' = food
//Ghosts: b = blue, o = orange, p = pink, r = red

const walls = new Set();
const foods = new Set();
const ghosts = new Set();
let pacman;

const tileMap1 = [
    "XXXXXXXXXXXXXXXXXXX",
    "X        X        X",
    "X XX XXX X XXX XX X",
    "X                 X",
    "X XX X XXXXX X XX X",
    "X    X       X    X",
    "XXXX XXXX XXXX XXXX",
    "OOOX X       X XOOO",
    "XXXX X XXrXX X XXXX",
    "O      XbpoX      O",
    "XXXX X XXXXX X XXXX",
    "OOOX X       X XOOO",
    "XXXX X XXXXX X XXXX",
    "X        X        X",
    "X XX XXX X XXX XX X",
    "X  X     P     X  X",
    "XX X X XXXXX X X XX",
    "X    X   X   X    X",
    "X XXXXXX X XXXXXX X",
    "X                 X",
    "XXXXXXXXXXXXXXXXXXX" 
];

const tileMap2 = [
    "XXXXXXXXXXXXXXXXXXX",
    "X        X        X",
    "X XX XXX X XXX XX X",
    "X      X   X      X",
    "XXX XX X X X XX XXX",
    "X    X   X   X    X",
    "X XX X XXXXX X XX X",
    "X  X           X  X",
    "XX X X XXrXX X X XX",
    "O    X XbpoX X    O",
    "XX XXX XXXXX XXX XX",
    "X                 X",
    "X XX X XXXXX X XX X",
    "X X  X   X   X  X X",
    "X X XXXX X XXXX X X",
    "X        P        X",
    "XXXX X XXXXX X XXXX",
    "X    X   X   X    X",
    "X XXXXXX X XXXXXX X",
    "X        X        X",
    "XXXXXXXXXXXXXXXXXXX" 
];

const tileMap3 = [
    "XXXXXXXXXXXXXXXXXXX",
    "X        X        X",
    "X XX XXX X XXX XX X",
    "X  X   X   X   X  X",
    "XX X X X X X X X XX",
    "OX   X   X   X   XO",
    "OX XXX XXXXX XXX XO",
    "OX               XO",
    "XX X X XXrXX X X XX",
    "O  X X XbpoX X X  O",
    "XXXX X XXXXX X XXXX",
    "O  X X       X X  O",
    "XX X XXX X XXX X XX",
    "OX   X   X   X   XO",
    "XX X X XXXXX X X XX",
    "X  X     P     X  X",
    "X XX XXX X XXX XX X",
    "X    X   X   X    X",
    "X XX X XXXXX X XX X",
    "X                 X",
    "XXXXXXXXXXXXXXXXXXX" 
];

const tileMap4 = [
    "XXXXXXXXXXXXXXXXXXX",
    "X                 X",
    "X XX XXX X XXX XX X",
    "X      X X X      X",
    "XX XXX X X X XXX XX",
    "O    X       X    O",
    "XX X X XXXXX X X XX",
    "X  X           X  X",
    "X XXXX XXrXX XXXX X",
    "X      XbpoX      X",
    "X X XX XXXXX XX X X",
    "X X  X       X  X X",
    "X XX X X X X X XX X",
    "X X    X X X    X X",
    "X X XXXX X XXXX X X",
    "X        P        X",
    "X X XX XXXXX XX X X",
    "X X  X   X   X  X X",
    "X XX X X X X X XX X",
    "X      X   X      X",
    "XXXXXXXXXXXXXXXXXXX" 
];

const tileMap5 = [
    "XXXXXXXXXXXXXXXXXXX",
    "X                 X",
    "X XX X XXXXX X XX X",
    "X X  X   X   X  X X",
    "X X XX X X X XX X X",
    "O    X X   X X    O",
    "X XX X XXXXX X XX X",
    "X  X           X  X",
    "XX X X XXrXX X X XX",
    "OX   X XbpoX X   XO",
    "OX XXX XXXXX XXX XO",
    "OX               XO",
    "XX XXXXX X XXXXX XX",
    "O  X     X     X  O",
    "XX X X XXXXX X X XX",
    "X    X   P   X    X",
    "X XX XXX X XXX XX X",
    "X X      X      X X",
    "X X XXX XXX XXX X X",
    "X                 X",
    "XXXXXXXXXXXXXXXXXXX" 
];

const tileMap6 = [
    "XXXXXXXXXXXXXXXXXXX",
    "X        X        X",
    "X XX XXX X XXX XX X",
    "X X    X   X    X X",
    "X X XX X X X XX X X",
    "X    X   X   X    X",
    "X XX X XXXXX X XX X",
    "X  X           X  X",
    "XX   X XXrXX X   XX",
    "OX X X XbpoX X X XO",
    "XX X X XXXXX X X XX",
    "X  X X       X X  X",
    "X XX XXX X XXX XX X",
    "X        X        X",
    "XX XXX XXXXX XXX XX",
    "O    X   P   X    O",
    "XX X X XXXXX X X XX",
    "X  X   X   X   X  X",
    "X XXXX X X X XXXX X",
    "X        X        X",
    "XXXXXXXXXXXXXXXXXXX" 
];

const tileMap7 = [
    "XXXXXXXXXXXXXXXXXXX",
    "X    X       X    X",
    "X XX X XXXXX X XX X",
    "X    X X   X X    X",
    "X X XX X X X XX X X",
    "X X      X      X X",
    "X XX X XXXXX X XX X",
    "X    X       X    X",
    "XX XXX XXrXX XXX XX",
    "OX   X XbpoX X   XO",
    "OX X X XXXXX X X XO",
    "OX X           X XO",
    "OX XXX XXXXX XXX XO",
    "OX       X       XO",
    "XX XXX X X X XXX XX",
    "O    X X P X X    O",
    "XX X X X X X X X XX",
    "X  X X   X   X X  X",
    "X XX X XXXXX X XX X",
    "X                 X",
    "XXXXXXXXXXXXXXXXXXX" 
];

const tileMap8 = [
    "XXXXXXXXXXXXXXXXXXX",
    "X                 X",
    "X XXXXXX X XXXXXX X",
    "X    X   X   X    X",
    "X XX X XXXXX X XX X",
    "X X             X X",
    "X X XX XXXXX XX X X",
    "X    X       X    X",
    "X XX   XXrXX   XX X",
    "X  X X XbpoX X X  X",
    "XX X X XXXXX X X XX",
    "OX   X       X   XO",
    "OX XXX XXXXX XXX XO",
    "OX       X       XO",
    "XX XXXXX X XXXXX XX",
    "O    X   P   X    O",
    "XX X X XXXXX X X XX",
    "X  X     X     X  X",
    "X XXXX X X X XXXX X",
    "X      X   X      X",
    "XXXXXXXXXXXXXXXXXXX" 
];

const tileMap9 = [
    "XXXXXXXXXXXXXXXXXXX",
    "X        X        X",
    "X X XXXX X XXXX X X",
    "X X    X   X    X X",
    "X XX X X X X X XX X",
    "X    X   X   X    X",
    "XX XXX XXXXX XXX XX",
    "OX   X       X   XO",
    "XX X X XXrXX X X XX",
    "O  X   XbpoX   X  O",
    "XXXXXX XXXXX XXXXXX",
    "O  X           X  O",
    "XX X X XXXXX X X XX",
    "OX   X   X   X   XO",
    "OX XXX X X X XXX XO",
    "OX     X P X     XO",
    "XX X XXX X XXX X XX",
    "X  X     X     X  X",
    "X XX X XXXXX X XX X",
    "X    X       X    X",
    "XXXXXXXXXXXXXXXXXXX" 
];

const directions = ['U', 'D', 'L', 'R'];
const tileMaps = [tileMap1, tileMap2, tileMap3, tileMap4, tileMap5, tileMap6, tileMap7, tileMap8, tileMap9]; 
let previousMapIndex = -1;
let highScore = 0;
let score = 0;
let lives = 3;
let level = 1;
let gameOver = false;
let updateLoop = null;
let pacmanMouthOpen = true;
let usedMapIndices = new Set(); // used so that when users level up, they will never see the same map twice

const initialIndex = getRandomMapIndex();
usedMapIndices.add(initialIndex);
let currentTileMap = tileMaps[initialIndex];

let scatterMode = true;
const modePhases = [
    { mode: 'scatter', duration: 7000 },
    { mode: 'chase', duration: 20000 },
    { mode: 'scatter', duration: 7000 },
    { mode: 'chase', duration: 20000 },
    { mode: 'scatter', duration: 5000 },
    { mode: 'chase', duration: 20000 },
    { mode: 'scatter', duration: 5000 },
    { mode: 'chase', duration: Infinity }
];
let currentPhase = 0;
let modeTimeoutID = null;

let phaseStartTime = Date.now();


const ghostBoxArea = {
    minX: 7,
    maxX: 11,
    minY: 8,
    maxY: 10
};

// Quadrant boundaries for scatter mode
const quadrantBounds = {
    blinky: { minX: Math.ceil(columnCount / 2), minY: 0, maxX: columnCount - 1, maxY: Math.floor(rowCount / 2) },  // Top-right
    pinky:  { minX: 0, maxX: Math.floor(columnCount / 2) - 1, minY: 0, maxY: Math.floor(rowCount / 2) },           // Top-left
    inky:   { minX: Math.ceil(columnCount / 2), minY: Math.ceil(rowCount / 2), maxX: columnCount - 1, maxY: rowCount - 1 }, // Bottom-right
    clyde:  { minX: 0, maxX: Math.floor(columnCount / 2) - 1, minY: Math.ceil(rowCount / 2), maxY: rowCount - 1 }, // Bottom-left
};

function animatePacmanMouth(){
    if(!pacman) return;

    pacmanMouthOpen = !pacmanMouthOpen;

    if (pacman.direction === 'U') {
        pacman.image = pacmanMouthOpen ? pacmanUpImg : pacmanClosedImg;
    } else if (pacman.direction === 'D') {
        pacman.image = pacmanMouthOpen ? pacmanDownImg : pacmanClosedImg;
    } else if (pacman.direction === 'L') {
        pacman.image = pacmanMouthOpen ? pacmanLeftImg : pacmanClosedImg;
    } else if (pacman.direction === 'R') {
        pacman.image = pacmanMouthOpen ? pacmanRightImg : pacmanClosedImg;
    }
}

function scaleCanvas() {
    const container = document.getElementById("canvas-container");
    const scaleX = window.innerWidth / boardWidth;
    const scaleY = window.innerHeight / boardHeight;
    const scale = Math.min(scaleX, scaleY);
    container.style.transform = `scale(${scale})`;
}

window.addEventListener("resize", scaleCanvas);
window.addEventListener("load", scaleCanvas);


window.onload = function(){
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    const savedHighScore = localStorage.getItem("highScore");
    if(savedHighScore !== null){
        highScore = parseInt(savedHighScore);
    }

    document.getElementById("up").addEventListener("click", () => {
        movePacman({ code: "ArrowUp" });
    });
    document.getElementById("down").addEventListener("click", () => {
        movePacman({ code: "ArrowDown" });
    });
    document.getElementById("left").addEventListener("click", () => {
        movePacman({ code: "ArrowLeft" });
    });
    document.getElementById("right").addEventListener("click", () => {
        movePacman({ code: "ArrowRight" });
    });

    document.getElementById("restart").addEventListener("click", () => {
        if (gameOver) {
            currentTileMap = tileMaps[getRandomMapIndex()];
            loadMap();
            resetPositions();
            lives = 3;
            score = 0;
            level = 1;
            gameOver = false;
            document.getElementById("restart").style.display = "none";
            clearTimeout(updateLoop);
            update();
        }
    });

    loadImages();
    loadMap();
    setInterval(animatePacmanMouth, 200);
    // console.log(walls.size)
    // console.log(foods.size)
    // console.log(ghosts.size)
    for (let ghost of ghosts.values()) {
        const newDirection = directions[Math.floor(Math.random()*4)]; // 0-3
        ghost.updateDirection(newDirection);
    }
    update();
    document.addEventListener("keyup", movePacman);

    startModeCycle();
}

function loadImages() {
    wallImg = new Image();
    wallImg.src = "./wall.png";

    blueGhostImg = new Image();
    blueGhostImg.src = "./blueGhost.png";

    orangeGhostImg = new Image();
    orangeGhostImg.src = "./orangeGhost.png";

    pinkGhostImg = new Image();
    pinkGhostImg.src = "./pinkGhost.png";

    redGhostImg = new Image();
    redGhostImg.src = "./redGhost.png";

    pacmanUpImg = new Image();
    pacmanUpImg.src = "./pacmanUp.png";

    pacmanDownImg = new Image();
    pacmanDownImg.src = "./pacmanDown.png";

    pacmanLeftImg = new Image();
    pacmanLeftImg.src = "./pacmanLeft.png";

    pacmanRightImg = new Image();
    pacmanRightImg.src = "./pacmanRight.png";

    pacmanClosedImg = new Image();
    pacmanClosedImg.src = "./pacmanClosed.png";
}

function loadMap(){
    walls.clear();
    foods.clear();
    ghosts.clear();

    for (let r = 0; r <rowCount; r++){
        for(let c = 0; c < columnCount; c++){
            const row = currentTileMap[r];
            const tileMapChar = row[c];

            const x = c*tileSize;
            const y = r*tileSize;

            if (tileMapChar == 'X') { //block wall
                const wall = new Block(wallImg, x, y, tileSize, tileSize);
                walls.add(wall);  
            }
            else if (tileMapChar == 'b') { //blue ghost
                const ghost = new Block(blueGhostImg, x, y, tileSize, tileSize, true);
                ghost.type = 'inky';
                ghost.scatterBounds = quadrantBounds[ghost.type];
                ghosts.add(ghost);
            }
            else if (tileMapChar == 'o') { //orange ghost
                const ghost = new Block(orangeGhostImg, x, y, tileSize, tileSize, true);
                ghost.type = 'clyde';
                ghost.scatterBounds = quadrantBounds[ghost.type];
                ghosts.add(ghost);
            }
            else if (tileMapChar == 'p') { //pink ghost
                const ghost = new Block(pinkGhostImg, x, y, tileSize, tileSize, true);
                ghost.type = 'pinky';
                ghost.scatterBounds = quadrantBounds[ghost.type];
                ghosts.add(ghost);
            }
            else if (tileMapChar == 'r') { //red ghost
                const ghost = new Block(redGhostImg, x, y, tileSize, tileSize, true);
                ghost.type = 'blinky';
                ghost.scatterBounds = quadrantBounds[ghost.type];
                ghosts.add(ghost);
            }
            else if (tileMapChar == 'P') { //pacman
                pacman = new Block(pacmanRightImg, x, y, tileSize, tileSize);
            }
            else if (tileMapChar == ' ') { //empty is food
                const food = new Block(null, x + 14, y + 14, 4, 4); // (32 - 4)/2 = 14
                foods.add(food);
            }
        }
    }
}

function getRandomMapIndex() {
    let index;
    do {
        index = Math.floor(Math.random() * tileMaps.length);
    } while (index === previousMapIndex);
    previousMapIndex = index;
    return index;
}

function update(){
    if(gameOver){
        return;
    }
    move();
    draw();
    updateLoop = setTimeout(update, 50); // recursive
}

function draw(){
    context.clearRect(0,0,board.width, board.height);    
    context.drawImage(pacman.image, pacman.x, pacman.y, pacman.width, pacman.height);
    for (let ghost of ghosts.values()){
        context.drawImage(ghost.image, ghost.x, ghost.y, ghost.width, ghost.height);
    }
    for (let wall of walls.values()){
        context.drawImage(wall.image, wall.x, wall.y, wall.width, wall.height);
    }
    context.fillStyle = "white";
    for (let food of foods.values()){
        context.fillRect(food.x, food.y, food.width, food.height);
    }

    context.fillStyle = "white";
    context.font = "14px sans-serif";
    if (gameOver) {
        if (score > highScore){
            highScore = score;
            localStorage.setItem("highScore", highScore);
        }
        context.fillText("Game Over, your score was: " + String(score) + "   Press any key to restart game.", tileSize/2, tileSize/1.7);

        // show restart button on mobile
        if (/Mobi|Android/i.test(navigator.userAgent)) {
            document.getElementById("restart").style.display = "block";
        }
    }
    else {
        context.fillText("Level: " + String(level) + " Lives: x" + String(lives), tileSize/2, tileSize/1.7);
        context.fillText("Current Score: " + score, tileSize * 10, tileSize / 1.7);
        context.fillText("High Score: " + highScore, tileSize * 15, tileSize / 1.7);
    }

    // Display current phase and timer
    // const phase = modePhases[currentPhase];
    // const elapsed = Date.now() - phaseStartTime;
    // let remaining = phase.duration - elapsed;
    // if (remaining < 0) remaining = 0;

    // context.fillStyle = "yellow";
    // context.font = "14px sans-serif";

    // const displayText = `Phase ${currentPhase + 1}: ${phase.mode.toUpperCase()} | Time Left: ${phase.duration === Infinity ? '∞' : (remaining / 1000).toFixed(1) + 's'}`;
    // context.fillText(displayText, tileSize / 2, tileSize * 1.7);

}

function applyWrapAround(block){
    const col = Math.floor(block.x /tileSize);
    const row = Math.floor(block.y /tileSize);

    // left edge
    if (block.x + block.width < 0 && block.velocityX < 0 && currentTileMap[row][columnCount - 1] !== 'X') {
        wrapWithDelay(block, (columnCount) * tileSize, block.y)
        return;
    }

    // right edge
    if (block.x > boardWidth && block.velocityX > 0 && currentTileMap[row][0] !== 'X') {
        wrapWithDelay(block, -block.width, block.y);
        return;
    }

    // top edge
    if (block.y + block.height <= 0 && block.velocityY < 0 && currentTileMap[rowCount - 1][col] !== 'X') {
        wrapWithDelay(block, block.x, (rowCount) * tileSize);
        return;
    }

    // bottom edge
    if (block.y >= boardHeight && block.velocityY > 0 && currentTileMap[0][col] !== 'X') {
        wrapWithDelay(block, block.x, -block.height);
        return;
    }
}

function wrapWithDelay(block, newX, newY){
    const originalVX = block.velocityX;
    const originalVY = block.velocityY;

    block.velocityX = 0;
    block.velocityY = 0;

    setTimeout(() => {
        block.x = newX;
        block.y = newY;
        block.velocityX = originalVX;
        block.velocityY = originalVY;
    }, 500); // 500ms = .5s
}

function isAtTileCenter(obj){
    return obj.x % tileSize === 0 && obj.y % tileSize === 0;
}

function getValidDirections(ghost, ignoreQuadrant = false){
    const dirs = [
        { name: 'U', dx: 0, dy: -1 },
        { name: 'D', dx: 0, dy: 1 },
        { name: 'L', dx: -1, dy: 0 },
        { name: 'R', dx: 1, dy: 0 },
    ];

    const valid = [];
    const bounds = ghost.scatterBounds;

    for (let dir of dirs){
        const nextX = ghost.x + dir.dx * tileSize;
        const nextY = ghost.y + dir.dy * tileSize;

        const col = Math.floor(nextX / tileSize);
        const row = Math.floor(nextY / tileSize);

        if (scatterMode && !ignoreQuadrant) {
            if (
                col < bounds.minX || col > bounds.maxX ||
                row < bounds.minY || row > bounds.maxY
            ) {
                continue;
            }
        }

        const temp = {...ghost,x: nextX, y:nextY};
        let hitsWall = false;
        for(let wall of walls.values()){
            if(collision(temp,wall)){
                hitsWall = true;
                break;
            }
        }
        if(!hitsWall) valid.push(dir.name);
    }
    return valid;
}

function pickDirection(validDirs, currentDir){
    const opposites = { U: 'D', D: 'U', L: 'R', R: 'L' };
    const nonOpposite = validDirs.filter(d => d !== opposites[currentDir]);

    const choices = nonOpposite.length > 0 ? nonOpposite : validDirs;
    return choices[Math.floor(Math.random() * choices.length)];
}

function tryDirection(block, direction) {
    let dx = 0, dy = 0;
    if (direction === 'U') dy = -tileSize;
    else if (direction === 'D') dy = tileSize;
    else if (direction === 'L') dx = -tileSize;
    else if (direction === 'R') dx = tileSize;

    const temp = {...block, x: block.x + dx, y: block.y + dy};
    for (let wall of walls.values()) {
        if (collision(temp, wall)) {
            return false;
        }
    }
    return true;
}

function startModeCycle() {
    if (modeTimeoutID) clearTimeout(modeTimeoutID); // clear any existing timer

    const phase = modePhases[currentPhase];
    scatterMode = (phase.mode === 'scatter');

    phaseStartTime = Date.now();

    if (phase.duration !== Infinity) {
        modeTimeoutID = setTimeout(() => {
            currentPhase++;
            if (currentPhase >= modePhases.length) currentPhase = modePhases.length - 1; // stay at last phase
            startModeCycle(); // recurse to next phase
        }, phase.duration);
    }
}

function move(){
    pacmanMovement();
    ghostMovement();
    foodAndLevel();
    applyWrapAround(pacman);
}

function pacmanMovement(){
    const inTunnel = (
        pacman.x < tileSize ||
        pacman.x + pacman.width > boardWidth - tileSize
    );

    if (inTunnel && (pacman.nextDirection === 'U' || pacman.nextDirection === 'D')) {
        pacman.nextDirection = null;
    }

    if (isAtTileCenter(pacman)) {
        if (pacman.nextDirection) {
            const attempted = tryDirection(pacman, pacman.nextDirection);
            if (attempted) {
                pacman.direction = pacman.nextDirection;
                pacman.updateVelocity();
            }
        }

        const currentValid = tryDirection(pacman, pacman.direction);
        if (!currentValid) {
            pacman.velocityX = 0;
            pacman.velocityY = 0;
        }
    }
    pacman.x += pacman.velocityX;
    pacman.y += pacman.velocityY;
}

function isTunnelRow(row) {
    // Check if the row has 'O' tiles (skip/tunnel)
    return currentTileMap[row].includes('O');
}

function bfsFindDirection(startX, startY, targetX, targetY) {
    const queue = [];
    const visited = new Set();
    const parent = {};
    const directionsMap = {
        'U': { dx: 0, dy: -1 },
        'D': { dx: 0, dy: 1 },
        'L': { dx: -1, dy: 0 },
        'R': { dx: 1, dy: 0 },
    };

    const key = (x, y) => `${x},${y}`;

    queue.push({ x: startX, y: startY });
    visited.add(key(startX, startY));

    while (queue.length > 0) {
        const current = queue.shift();

        if (current.x === targetX && current.y === targetY) {
            // backtrack to get first direction
            let backtrack = key(targetX, targetY);
            while (parent[backtrack] && parent[backtrack] !== key(startX, startY)) {
                backtrack = parent[backtrack];
            }
            const [cx, cy] = backtrack.split(',').map(Number);
            if (cx > startX) return 'R';
            if (cx < startX) return 'L';
            if (cy > startY) return 'D';
            if (cy < startY) return 'U';
            return null;
        }

        for (let dir in directionsMap) {
            const dx = directionsMap[dir].dx;
            const dy = directionsMap[dir].dy;
            let nx = current.x + dx;
            let ny = current.y + dy;

            //if (nx < 0 || ny < 0 || nx >= columnCount || ny >= rowCount) continue;
            // if (ny >= 0 && ny < rowCount && isTunnelRow(ny)) {
            //     if (nx < 0) nx = columnCount - 1;
            //     else if (nx >= columnCount) nx = 0;
            // }
            // if (nx < 0 || nx >= columnCount || ny < 0 || ny >= rowCount) continue;
            // Wrap around horizontally ONLY if current row is a tunnel row
            // Hardcode wraparound only on 'O' tiles
            // const currentRow = currentTileMap[current.y];
            // if (currentRow.includes('O')) {
            //     // If moving left off the map from an 'O' tile
            //     if (nx < 0 && currentRow[columnCount - 1] === 'O') {
            //         nx = columnCount - 1;
            //     }
            //     // If moving right off the map from an 'O' tile
            //     else if (nx >= columnCount && currentRow[0] === 'O') {
            //         nx = 0;
            //     }
            // } else {
            //     // If not an 'O' tunnel row, prevent out of bounds horizontally
            //     if (nx < 0 || nx >= columnCount) continue;
            // }
            // Wrap horizontally on tunnel rows
            if (ny >= 0 && ny < rowCount && isTunnelRow(ny)) {
                if (nx < 0) nx = columnCount - 1;
                else if (nx >= columnCount) nx = 0;
            } else {
                // If not a tunnel row, prevent out of bounds horizontally
                if (nx < 0 || nx >= columnCount) continue;
            }

            // Check vertical bounds
            if (ny < 0 || ny >= rowCount) continue;



            if (visited.has(key(nx, ny))) continue;
            if (currentTileMap[ny][nx] === 'X') continue;

            queue.push({ x: nx, y: ny });
            visited.add(key(nx, ny));
            parent[key(nx, ny)] = key(current.x, current.y);
        }
    }

    return null;
}


function getGhostTargetTile(ghost){
    const px = Math.floor(pacman.x / tileSize);
    const py = Math.floor(pacman.y / tileSize);

    // red -> pacman position
    if (ghost.type === 'blinky'){
        return {x: px, y: py};
    }

    // pink -> pacman position + 4 tiles infront of him
    if (ghost.type === 'pinky'){
        let dx = 0, dy = 0;
        if (pacman.direction === 'U'){
            dy = -4;
        } else if (pacman.direction === 'D'){
            dy = 4;
        } else if (pacman.direction === 'L'){
            dx = -4;
        } else if (pacman.direction === 'R') {
            dx = 4;
        }
        return { x: px + dx, y: py + dy };
    }

    // cyan -> trap pacman between blinky and itself
    if (ghost.type === 'inky') {
        const blinky = [...ghosts].find(g => g.type === 'blinky');

        if (!blinky) return { x: px, y: py }; // fallback if Blinky not found

        // 2 tiles in front of Pac-Man
        let dx = 0, dy = 0;
        if (pacman.direction === 'U') {
            dx = 0;
            dy = -2;
        } else if (pacman.direction === 'D') {
            dx = 0;
            dy = 2;
        } else if (pacman.direction === 'L') {
            dx = -2;
            dy = 0;
        } else if (pacman.direction === 'R') {
            dx = 2;
            dy = 0;
        }

        const targetX = px + dx;
        const targetY = py + dy;

        const blinkyTileX = Math.floor(blinky.x / tileSize);
        const blinkyTileY = Math.floor(blinky.y / tileSize);

        // Vector from Blinky to target tile
        const vx = targetX - blinkyTileX;
        const vy = targetY - blinkyTileY;

        // Double the vector
        const finalX = blinkyTileX + 2 * vx;
        const finalY = blinkyTileY + 2 * vy;

        // Clamp the target to board bounds
        let clampedX = Math.max(0, Math.min(columnCount - 1, finalX));
        let clampedY = Math.max(0, Math.min(rowCount - 1, finalY));

        if (currentTileMap[clampedY][clampedX] === 'X') {
            // Try slight adjustments: right, left, down, up (in priority order)
            const directions = [
                { dx: 1, dy: 0 },
                { dx: -1, dy: 0 },
                { dx: 0, dy: 1 },
                { dx: 0, dy: -1 }
            ];

            for (let dir of directions) {
                const newX = clampedX + dir.dx;
                const newY = clampedY + dir.dy;
                // Check bounds and if it's a walkable tile
                if (
                    newX >= 0 && newX < columnCount &&
                    newY >= 0 && newY < rowCount &&
                    currentTileMap[newY][newX] !== 'X'
                ) {
                    clampedX = newX;
                    clampedY = newY;
                    break;
                }
            }
        }
        return { x: clampedX, y: clampedY };
    }

    // orange -> chase if far, random if near
    if (ghost.type === 'clyde'){
        const gx = ghost.x / tileSize;
        const gy = ghost.y / tileSize;
        const dist = Math.abs(gx - px) + Math.abs(gy - py);

        if (dist >= 8) {
            return { x: px, y: py }; // chase
        } else {
            let oppositeX = (gx < columnCount / 2) ? columnCount - 1 : 0;
            let oppositeY = (gy < rowCount / 2) ? rowCount - 1 : 0;

            // Clamp within map bounds
            oppositeX = Math.max(0, Math.min(columnCount - 1, oppositeX));
            oppositeY = Math.max(0, Math.min(rowCount - 1, oppositeY));

            // If opposite tile is a wall, fallback to a random tile in his scatter quadrant
            if (currentTileMap[oppositeY][oppositeX] === 'X') {
                const bounds = ghost.scatterBounds;
                let randomX, randomY;

                do {
                    randomX = Math.floor(Math.random() * (bounds.maxX - bounds.minX + 1)) + bounds.minX;
                    randomY = Math.floor(Math.random() * (bounds.maxY - bounds.minY + 1)) + bounds.minY;
                } while (currentTileMap[randomY][randomX] === 'X');

                return { x: randomX, y: randomY };
            }

            return { x: oppositeX, y: oppositeY };
        }
    }

    return { x: px, y: py }; // safety net
}

function ghostMovement() {
    for (let ghost of ghosts.values()) {
        applyWrapAround(ghost);

        const inBounds = (
            ghost.x >= 0 && ghost.x < boardWidth &&
            ghost.y >= 0 && ghost.y < boardHeight
        );

        if (inBounds && isAtTileCenter(ghost)) {
            const gx = Math.floor(ghost.x / tileSize);
            const gy = Math.floor(ghost.y / tileSize);

            const inBox = (
                gx >= ghostBoxArea.minX && gx <= ghostBoxArea.maxX &&
                gy >= ghostBoxArea.minY && gy <= ghostBoxArea.maxY
            );

            let direction;

            if (inBox) {
                // Random movement to get out of box
                const validDirs = getValidDirections(ghost, true);
                if (validDirs.length > 0) {
                    direction = pickDirection(validDirs, ghost.direction);
                }
            } else if (!inBox && scatterMode) {
                // Scatter Mode: Quadrant limited random movement
                const bounds = ghost.scatterBounds; 

                const gx = Math.floor(ghost.x / tileSize);
                const gy = Math.floor(ghost.y / tileSize);

                const inQuadrant = (
                    gx >= bounds.minX && gx <= bounds.maxX &&
                    gy >= bounds.minY && gy <= bounds.maxY
                );

                if (!inQuadrant) {
                    // Move towards quadrant if outside
                    const dx = gx < bounds.minX ? 'R' : gx > bounds.maxX ? 'L' : null;
                    const dy = gy < bounds.minY ? 'D' : gy > bounds.maxY ? 'U' : null;

                    const prefer = dx ? [dx] : [];
                    if (dy) prefer.push(dy);

                    // Try preferred directions first
                    let foundDirection = false;
                    for (let d of prefer) {
                        if (tryDirection(ghost, d)) {
                            direction = d;
                            foundDirection = true;
                            break;
                        }
                    }

                    // if cannot move towards quadrant, allow any direction
                    if (!foundDirection) {
                        const validDirs = getValidDirections(ghost, true);
                        if (validDirs.length > 0) {
                            direction = pickDirection(validDirs, ghost.direction);
                        }
                    }
                }

                if (!direction) {
                    // Otherwise random movement within quadrant
                    const validDirs = getValidDirections(ghost);
                    if (validDirs.length > 0) {
                        direction = pickDirection(validDirs, ghost.direction);
                    }
                }
            } else if (!inBox && !scatterMode) {
                // Chase mode: BFS to target tile
                const targetTile = getGhostTargetTile(ghost);
                if (targetTile) {
                    direction = bfsFindDirection(gx, gy, targetTile.x, targetTile.y);
                    if (!direction) {
                        // Fallback: pick any valid direction if BFS fails
                        const validDirs = getValidDirections(ghost, true);
                        if (validDirs.length > 0) {
                            direction = pickDirection(validDirs, ghost.direction);
                        }
                    }
                }
            }

            if (direction) {
                ghost.updateDirection(direction);
            }
        }

        ghost.x += ghost.velocityX;
        ghost.y += ghost.velocityY;

        for (let wall of walls.values()) {
            if (collision(ghost, wall)) {
                ghost.x -= ghost.velocityX;
                ghost.y -= ghost.velocityY;
                break;
            }
        }

        if (collision(ghost, pacman)) {
            lives -= 1;
            if (lives == 0) {
                gameOver = true;
                clearTimeout(modeTimeoutID);
                modeTimeoutID = null;
                return;
            }
            resetPositions();
        }
    }
}

function foodAndLevel(){
    let foodEaten = null;
    for (let food of foods.values()){
        if(collision(pacman, food)){
            foodEaten = food;
            score += 10;
            break;
        }
    }
    foods.delete(foodEaten);

    if(foods.size == 0){ 
        levelUp();
    }

    applyWrapAround(pacman);
}

function levelUp(){
    level += 1;
    lives += 1;
    currentTileMap = tileMaps[getLevelUpMapIndex()];

    currentPhase = 0;
    startModeCycle();

    loadMap();
    resetPositions();
}

function getLevelUpMapIndex() {
    // Reset every 9 levels
    if (usedMapIndices.size >= tileMaps.length) {
        usedMapIndices.clear();
    }

    // Build pool of available indices
    const available = tileMaps
        .map((_, index) => index)
        .filter(index => !usedMapIndices.has(index));

    // Pick random from available
    const index = available[Math.floor(Math.random() * available.length)];
    usedMapIndices.add(index);
    previousMapIndex = index; // still update this in case of game over next
    return index;
}

function movePacman(e){
    // testing purposes
    // if (e.code === "KeyP") {
    //     gameOver = true;
    //     draw(); // update screen with Game Over text
    //     return;
    // }

    // if(e.code === "KeyO"){
    //     foods.clear();
    // }

    // // testing blinkys speed increase
    // if (e.code === "KeyI") {
    //     // Remove foods until only 10 remain
    //     while (foods.size > 10) {
    //         // Remove one arbitrary food item
    //         const firstKey = foods.keys().next().value;
    //         foods.delete(firstKey);
    //     }
    // }

    if(gameOver){
        currentTileMap = tileMaps[getRandomMapIndex()];
        loadMap();
        resetPositions();
        lives = 3;
        score = 0;
        level = 1;
        gameOver = false;
        clearTimeout(updateLoop);
        update();
        return;
    }

    const inTunnel = (
        pacman.x < tileSize || // approaching or in left tunnel
        pacman.x + pacman.width > boardWidth - tileSize // approaching or in right tunnel
    );

    // prevent users from going up down when in tunnel
    if (inTunnel && (pacman.nextDirection === 'U' || pacman.nextDirection === 'D')) {
        pacman.nextDirection = null;
    }

    if (e.code == "ArrowUp" || e.code == "KeyW") {
        if (!inTunnel) pacman.nextDirection = 'U'; 
    }
    else if (e.code == "ArrowDown" || e.code == "KeyS") {
        if (!inTunnel) pacman.nextDirection = 'D'; 
    }
    else if (e.code == "ArrowLeft" || e.code == "KeyA") {
        pacman.nextDirection = 'L'; 
    }
    else if (e.code == "ArrowRight" || e.code == "KeyD") {
        pacman.nextDirection = 'R'; 
    }

    //update pacman images
    if (pacman.direction == 'U') {
        pacman.image = pacmanUpImg;
    }
    else if (pacman.direction == 'D') {
        pacman.image = pacmanDownImg;
    }
    else if (pacman.direction == 'L') {
        pacman.image = pacmanLeftImg;
    }
    else if (pacman.direction == 'R') {
        pacman.image = pacmanRightImg;
    }
}

function collision(a,b){
    return a.x < b.x + b.width &&   
           a.x + a.width > b.x &&   
           a.y < b.y + b.height &&  
           a.y + a.height > b.y; 
}

function resetPositions(){
    pacman.reset();
    pacman.velocityX = 0;
    pacman.velocityY = 0;

    currentPhase = 0;
    startModeCycle();

    for (let ghost of ghosts.values()){
        ghost.x = ghost.startX;
        ghost.y = ghost.startY;
        const newDirection = directions[Math.floor(Math.random()*4)];
        ghost.updateDirection(newDirection);
    }
}

function getGhostSpeed(level, ghost, foods) {
    const remainingFood = foods.size;

    if (ghost.type === 'blinky') {
        if (level >= 5) {
            if (remainingFood <= 20) return tileSize / 4; 
        } else if (level >= 2) {
            if (remainingFood <= 15) return tileSize / 4; 
        } else {
            if (remainingFood <= 10) return tileSize / 4; 
        }
    }

    return tileSize / 8; // default speed for all others
}

class Block{
    constructor(image,x,y,width,height, isGhost = false){
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.startX = x;
        this.startY = y;

        this.direction = 'R';
        this.velocityX = 0;
        this.velocityY = 0;

        this.nextDirection = null; 

        this.isGhost = isGhost;
    }

    updateDirection(direction){
        const prevDirection = this.direction;
        this.direction = direction;
        this.updateVelocity();
        this.x += this.velocityX;
        this.y += this.velocityY;

        for(let wall of walls.values()){
            if(collision(this,wall)){
                this.x -= this.velocityX;
                this.y -= this.velocityY;
                this.direction = prevDirection;
                this.updateVelocity();
                return;
            }
        }
    }

    updateVelocity() {

        const speed = this.isGhost ? getGhostSpeed(level, this, foods) : tileSize/4;

        if (this.direction == 'U') {
            this.velocityX = 0;
            this.velocityY = -speed;
        }
        else if (this.direction == 'D') {
            this.velocityX = 0;
            this.velocityY = speed;
        }
        else if (this.direction == 'L') {
            this.velocityX = -speed;
            this.velocityY = 0;
        }
        else if (this.direction == 'R') {
            this.velocityX = speed;
            this.velocityY = 0;
        }
    }

    reset(){
        this.x = this.startX;
        this.y = this.startY;
    }
}