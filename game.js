const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

let canvasSize;
let elementSize;

window.addEventListener('load',setCanvasSize);
window.addEventListener('resize',setCanvasSize);

function setCanvasSize() {

  if (window.innerHeight>window.innerWidth){
    canvasSize = window.innerWidth * 0.8;
  }else{
    canvasSize = window.innerHeight * 0.8;
  };

  canvas.setAttribute('width',canvasSize);
  canvas.setAttribute('height', canvasSize);

  elementSize = canvasSize / 10.3;

  startGame();
}
function startGame() {
  
  console.log({ canvasSize, elementSize });

  game.font = elementSize + 'px Verdana';
  game.textAlign= 'end';
 
  const map = maps[2];
  const mapRows = map.trim().split('\n');
  const mapColums = mapRows.map(row => row.trim().split(''));
  console.log(map,mapRows,mapColums);

  mapColums.forEach((row,rowI) => {
    row.forEach( (col,colI) =>{
      const emoji = emojis[col];
      const posX =18 + elementSize*(colI+1);
      const posY =elementSize*(rowI+1);
    game.fillText(emoji,posX,posY);
    }); 
  });

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
