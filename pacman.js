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
    "X  X           X  X",
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
    "X                 X",
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
    "OX  XX XXXXX XX  XO",
    "OX               XO",
    "XX XXXXX X XXXXX XX",
    "O  X     X     X  O",
    "XX X X XXXXX X X XX",
    "X    X       X    X",
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
    "O    X       X    O",
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
    "O    X X   X X    O",
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
    "O    X       X    O",
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
    "OX     X   X     XO",
    "XX X XXX X XXX X XX",
    "X  X     X     X  X",
    "X XX X XXXXX X XX X",
    "X    X       X    X",
    "XXXXXXXXXXXXXXXXXXX" 
];

const directions = ['U', 'D', 'L', 'R'];
const tileMaps = [tileMap1, tileMap2, tileMap3, tileMap4, tileMap5, tileMap6, tileMap7, tileMap8, tileMap9]; 
let previousMapIndex = -1;
let currentTileMap = tileMap1;
let highScore = 0;
let score = 0;
let lives = 3;
let level = 1;
let gameOver = false;
let updateLoop = null;
let pacmanMouthOpen = true;

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

window.onload = function(){
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    const savedHighScore = localStorage.getItem("highScore");
    if(savedHighScore !== null){
        highScore = parseInt(savedHighScore);
    }

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
                const ghost = new Block(blueGhostImg, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            }
            else if (tileMapChar == 'o') { //orange ghost
                const ghost = new Block(orangeGhostImg, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            }
            else if (tileMapChar == 'p') { //pink ghost
                const ghost = new Block(pinkGhostImg, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            }
            else if (tileMapChar == 'r') { //red ghost
                const ghost = new Block(redGhostImg, x, y, tileSize, tileSize);
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
    }
    else {
        context.fillText("Level: " + String(level) + " Lives: x" + String(lives), tileSize/2, tileSize/1.7);
        context.fillText("Current Score: " + score, tileSize * 10, tileSize / 1.7);
        context.fillText("High Score: " + highScore, tileSize * 15, tileSize / 1.7);
    }
}

function applyWrapAround(block){
    const col = Math.floor(block.x /tileSize);
    const row = Math.floor(block.y /tileSize);

    // left edge
    if (block.x + block.width <= 0 && block.velocityX < 0 && currentTileMap[row][columnCount - 1] !== 'X') {
        wrapWithDelay(block, (columnCount) * tileSize, block.y)
        return;
    }

    // right edge
    if (block.x >= boardWidth && block.velocityX > 0 && currentTileMap[row][0] !== 'X') {
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

function getValidDirections(ghost){
    const dirs = [
        { name: 'U', dx: 0, dy: -1 },
        { name: 'D', dx: 0, dy: 1 },
        { name: 'L', dx: -1, dy: 0 },
        { name: 'R', dx: 1, dy: 0 },
    ];

    const valid = [];

    for (let dir of dirs){
        const nextX = ghost.x + dir.dx * tileSize;
        const nextY = ghost.y + dir.dy * tileSize;

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

function move(){
    pacman.x += pacman.velocityX;
    pacman.y += pacman.velocityY;

    for (let wall of walls.values()){
        if(collision(pacman,wall)){
            pacman.x -= pacman.velocityX;
            pacman.y -= pacman.velocityY;
            break;
        }
    }

    for (let ghost of ghosts.values()){

        applyWrapAround(ghost);

        const inBounds = (
            ghost.x >= 0 && ghost.x < boardWidth &&
            ghost.y >= 0 && ghost.y < boardHeight
        );

        if(inBounds && isAtTileCenter(ghost)){
            const validDirs = getValidDirections(ghost);
            if(validDirs.length > 0){
                const newDir = pickDirection(validDirs, ghost.direction);
                ghost.updateDirection(newDir);
            }
        }

        ghost.x += ghost.velocityX;
        ghost.y += ghost.velocityY;

        for(let wall of walls.values()){
            if (collision(ghost, wall)){
                ghost.x -= ghost.velocityX;
                ghost.y -= ghost.velocityY;
                break;
            }
        }

        if(collision(ghost, pacman)){
            lives -= 1;
            if(lives == 0){
                gameOver = true;
                return;
            }
            resetPositions();
        }
    }

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
        level += 1;
        loadMap();
        resetPositions();
    }

    applyWrapAround(pacman);
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
    if (e.code == "ArrowUp" || e.code == "KeyW") {
        pacman.updateDirection('U'); 
    }
    else if (e.code == "ArrowDown" || e.code == "KeyS") {
        pacman.updateDirection('D'); 
    }
    else if (e.code == "ArrowLeft" || e.code == "KeyA") {
        pacman.updateDirection('L'); 
    }
    else if (e.code == "ArrowRight" || e.code == "KeyD") {
        pacman.updateDirection('R'); 
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
    for (let ghost of ghosts.values()){
        ghost.reset();
        const newDirection = directions[Math.floor(Math.random()*4)];
        ghost.updateDirection(newDirection);
    }
}

class Block{
    constructor(image,x,y,width,height){
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
        if (this.direction == 'U') {
            this.velocityX = 0;
            this.velocityY = -tileSize/4;
        }
        else if (this.direction == 'D') {
            this.velocityX = 0;
            this.velocityY = tileSize/4;
        }
        else if (this.direction == 'L') {
            this.velocityX = -tileSize/4;
            this.velocityY = 0;
        }
        else if (this.direction == 'R') {
            this.velocityX = tileSize/4;
            this.velocityY = 0;
        }
    }

    reset(){
        this.x = this.startX;
        this.y = this.startY;
    }
}