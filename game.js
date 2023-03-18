const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnup = document.querySelector('#up');
const btnleft = document.querySelector('#left');
const btndown = document.querySelector('#down');
const btnright = document.querySelector('#right');
const spanLives = document.querySelector('#lives'); 
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record'); 
const pResult = document.querySelector('#result');



let canvasSize;
let elementSize;
let level = 0;
let lives=3;

let timeInterval;
let timeStart;
let timePlayer;

const playerPosition = {
  x:undefined,
  y:undefined,
};
const exitPosition = {
  x:undefined,
  y:undefined,
};
const alienPosition = {
  x:undefined,
  y:undefined,
}
let obstaclePositions = [];

window.addEventListener('load',setCanvasSize);
window.addEventListener('resize',setCanvasSize);

function setCanvasSize() {

  if (window.innerHeight>window.innerWidth){
    canvasSize = window.innerWidth * 0.7;
  }else{
    canvasSize = window.innerHeight * 0.7;
  };
  canvasSize= Number(canvasSize.toFixed(0));

  canvas.setAttribute('width',canvasSize);
  canvas.setAttribute('height', canvasSize);

  elementSize = canvasSize / 10.3;
  playerPosition.x= undefined;
  playerPosition.y= undefined;
  startGame();
}
function startGame() {
  
//  console.log({ canvasSize, elementSize });

  game.font = elementSize + 'px Verdana';
  game.textAlign= 'end';
 
  const map = maps[level];
  if(!map){
    gameWin();
    return
  } 
  if (!timeStart) {
    timeStart = Date.now();
    timeInterval = setInterval(showTime, 100);
    showRecord();
  }

  const mapRows = map.trim().split('\n');
  const mapColums = mapRows.map(row => row.trim().split(''));
 // console.log(map,mapRows,mapColums);

 showLives();

 obstaclePositions =[]; 
 game.clearRect(0,0,canvasSize, canvasSize);

  mapColums.forEach((row,rowI) => {
    row.forEach( (col,colI) =>{
      const emoji = emojis[col];
      const posX =18 + elementSize*(colI+1);
      const posY =elementSize*(rowI+1);
    game.fillText(emoji,posX,posY);
  if(!playerPosition.x && !playerPosition.y){
    if(col == 'O'){
    playerPosition.x=posX;
    playerPosition.y=posY;
    console.log({playerPosition});    
  }
  }
  if (col == 'I'){
    exitPosition.x=posX;
    exitPosition.y=posY;
//    console.log({exitPosition});
  }
  if (col=='X'){
    obstaclePositions.push({
      x: posX,
      y: posY,
    })
  }
  if (col=='J'){
    alienPosition.x=posX;
    alienPosition.y=posY;
  }
    }); 
  });
movePlayer();
}

function movePlayer(){
  game.fillText(emojis['PLAYER'],playerPosition.x,playerPosition.y);

  const alienColisionX = playerPosition.x.toFixed(3) == alienPosition.x.toFixed(3);
  const alienColisionY = playerPosition.y.toFixed(3) == alienPosition.y.toFixed(3);
  const alienColision = alienColisionX && alienColisionY;

  if (alienColision){
    lives++
  }

  const exitColisionX = playerPosition.x.toFixed(3) == exitPosition.x.toFixed(3);
  const exitColisionY = playerPosition.y.toFixed(3) == exitPosition.y.toFixed(3);
  const exitColision = exitColisionX && exitColisionY;

  if (exitColision){
    levelWin();
 //   window.alert ('¡ENHORABUENA! Has llegado a casa sano y salvo. ¿Aceptas la siguiente misión?');
    console.warn ('¡Lo lograstes!')
  }

  const obstacleColision = obstaclePositions.find(obstacle =>{
    const obstacleColisionX = obstacle.x.toFixed(3) == playerPosition.x.toFixed(3);
    const obstacleColisionY = obstacle.y.toFixed(3) == playerPosition.y.toFixed(3);
    const colision = obstacleColisionX && obstacleColisionY;
    if (colision){
    console.warn ('¡Has chocado!')
    levelColision();
  } 
  });
 
}
function levelColision(){
  playerPosition.x=undefined;
  playerPosition.y=undefined;
  lives--;


  if(lives<=0){
    window.alert('GAME OVER, Try again!');
    level=0;
    lives=4;
    timeStart=undefined;

    startGame();
  }
  startGame();
}
function levelWin() {
  console.log('Has pasado de nivel')
  level ++;
  startGame();
}
function gameWin(){
  clearInterval(timeInterval);
  console.log('Has ganado');
  const recordTime = localStorage.getItem('record_time');
  const playerTime = Date.now() - timeStart;
  window.alert('¡LO LOGRASTES! No hay más misiones, 👩‍🚀👨‍🚀💃🕺🎊🎊¿Volver a empezar?');
  location.reload();
 
  if (recordTime) {
    if (recordTime >= playerTime) {
      localStorage.setItem('record_time', playerTime);
      pResult.innerHTML = 'SUPERASTE EL RECORD :)';
    } else {
      pResult.innerHTML = 'lo siento, no superaste el records :(';
    }
  } else {
    localStorage.setItem('record_time', playerTime);
    pResult.innerHTML = 'Primera vez? Muy bien, pero ahora trata de superar tu tiempo :)';
  }

  console.log({recordTime, playerTime});
}
function showLives() {
  const hardsArray = Array(lives).fill(emojis['HEART'])
  spanLives.innerHTML= hardsArray;
};
function showTime() {
  spanTime.innerHTML = Date.now() - timeStart;
}
function showRecord() {
  spanRecord.innerHTML = localStorage.getItem('record_time');
}


  btnup.addEventListener('click',moveUp);
  btnleft.addEventListener('click',moveLeft);
  btnright.addEventListener('click',moveRight);
  btndown.addEventListener('click',moveDown);

  window.addEventListener('keydown', moveByKeys);

  function moveByKeys(event){
    if (event.key == 'ArrowUp')moveUp();
      else if (event.key == 'ArrowLeft')moveLeft();
      else if (event.key == 'ArrowRight')moveRight();
      else if (event.key == 'ArrowDown')moveDown();   
  }

  function moveUp() {
    console.log('moviendonos arrriba');
    if((playerPosition.y-elementSize)<elementSize){
      console.log('OUT')}else{
    playerPosition.y-=elementSize;
    startGame();
      }
  }
  function moveLeft() {
    console.log('moviendonos izquierda');
    if((playerPosition.x-elementSize)<elementSize){
      console.log('OUT')}else{
      playerPosition.x-=elementSize;
    startGame();
    }
  }
  function moveRight() {
    console.log('moviendonos derecha');
    if((playerPosition.x)>canvasSize){
      console.log('OUT')}else{
    playerPosition.x+=elementSize;
    startGame();
      }
  }
  function moveDown() {
    console.log('moviendonos abajo');
    if((playerPosition.y+elementSize)>canvasSize){
      console.log('OUT')}else{
    playerPosition.y+=elementSize;
    startGame();
      }
  }







 
  /*for (let row=1; row<=10; row++){
    for (let colum=1; colum<=10; colum++){   
      game.fillText(emojis[mapColums[row-1][colum-1]], elementSize*colum, elementSize*row);
    };  
  };*/

   // game.fillRect(0,0,100,100);
   // game.clearRect(0,0,50,50);
   // game.clearRect(50,50,50,50);

    // game.font = '25px Verdana'
  // game.fillStyle = 'purple';
  // game.textAlign = 'center';
  // game.fillText('Platzi', 25, 25);
