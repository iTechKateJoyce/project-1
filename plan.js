let lives = 3  
let points = 0 
let displayPoints = document.querySelector('.showPoints')//DOMelement - necessary here?
let playerPosition = 86 //relates to index of cell array where player starts on the board, will be used to keep track of the frog too
let logPosition = null
const grid  = document.querySelector('.grid')//relates to container div for whole grid html element with grid class 
const width = 7 
const height = 14 
const cells  =  [] //a single array of dom elements


//? Generate the grid - adjust css .grid to make this work
//put inside a page load event listener
for (let index = 0; index < width * height; index++) {
  // Generate each element
  const cell = document.createElement('div')
  cell.classList.add('cell')
  grid.appendChild(cell)
  cells.push(cell)
  // Number each cell by its index.
  cell.innerHTML = index
  cell.id = index
  // Set the width and height of my cells
  cell.style.width = `${100 / width}%`
  cell.style.height = `${100 / height}%`
  //adds background styling to grid cells 
  gridStyling(index, cell)
}
trafficAppears(cells) 
logAppears(cells)
collisionDetection(cells, logPosition, playerPosition)

function gridStyling(index, cell) {//add some basic css to define road, river, home and statusBar
  if(index >= 49 && index <= 83){ //add road styling
    cell.classList.add('road')
  }
  //adding river styling to grid
  else if(index <= 41 && index >= 14){
    cell.classList.add('river')
  }
  //add status bar
  else if(index <= 97 && index >= 91){
    cell.classList.add('statusBar')
  }
  //add home cells, these give you points if you reach them
  else if(index === 8 || index === 10 || index === 12){
    cell.classList.add('home')
  }
  //add timer display
  else if(index === 0){
    cell.classList.add('timer')
  }
  //add points display
  else if(index === 3){
    // cell.classList.add('showPoints')
    cell.innerHTML = 'POINTS'
  }
  else if(index === 6){
    // cell.classList.add('lives')
    cell.innerHTML = 'LIVES'
  }
}

//? Put frog on board and make him move
cells[playerPosition].classList.remove('frog')
playerPosition += 1
cells[playerPosition].classList.add('frog')

document.addEventListener('keyup', (event) => {//listen for keyup on arrows to trigger frog movement & boundary logic
  const key = event.key
  if(key === 'ArrowUp' && !((playerPosition - width) < width) ){
    cells[playerPosition].classList.remove('frog')
    playerPosition -= width
    cells[playerPosition].classList.add('frog')
  }
  else if(key === 'ArrowDown' && !((playerPosition + width) + width >= width * height)){
    cells[playerPosition].classList.remove('frog')
    playerPosition += width
    cells[playerPosition].classList.add('frog')
  }
  else if(key === 'ArrowRight'&& !(playerPosition % width === width - 1)) {
    cells[playerPosition].classList.remove('frog')
    playerPosition += 1
    cells[playerPosition].classList.add('frog')
  }
  else if(key === 'ArrowLeft' && !(playerPosition % width === 0)) {
    cells[playerPosition].classList.remove('frog')
    playerPosition -= 1
    cells[playerPosition].classList.add('frog')
  }
  generatePoints(playerPosition, points)
})

function generatePoints(playerPosition, points){ //add, remove, display points
  if(cells[playerPosition].classList.contains('home')){ //if frog position has the class home
    console.log('froggy reached home')
    points=+ 100 //add 100 points 
    cells[playerPosition].classList.add('frogReachedHome')//update cell with winning frog
    //reset frog to starting position 
  }
  // else if frog moves forward 
  //         +1 point
  // - is it worth calling generatePoints function inside keyup arrowUp event listener?
}
function trafficAppears() { //car loop (one row)
   //traffic starting point
   let carPosition = 70
   let displayCar = cells[carPosition].classList.add('car') //dom element for starting cell
   setInterval(() => { 
    if(cells[carPosition].classList.contains('car')){//if cell has car class
      if(cells[carPosition].id >= 76){ //if car has reached the "end of the road", restart loop
        cells[carPosition].classList.remove('car')//remove car
        carPosition = 70//reset car at position to cell 70
        cells[carPosition].classList.add('car')//add car class
      }else{
        cells[carPosition].classList.remove('car')//remove car class
        carPosition += 1 //move car right one cell 
        cells[carPosition].classList.add('car')//add car class to new cell 
      }
    }
  }, 500)
}

function logAppears(cells){ //log loop (one row)
  //log starting point
  let logPosition = 27
  let displayLog = cells[logPosition].classList.add('log') //dom element for starting cell
  //log loop across row
  const intervalId = setInterval(() => { 
    if(cells[logPosition].classList.contains('log')){//if cell has log class
      if(cells[logPosition].id <= 21){ //check if log has reached the "end of the road" to restart loop
        cells[logPosition].classList.remove('log')//remove log
        logPosition = 27//reset log at position to cell 27
        cells[logPosition].classList.add('log')//add log class
      }
      else { //otherwise log is still looping, continue moving
        cells[logPosition].classList.remove('log')//remove log class
        logPosition -= 1 //move log left one cell 
        cells[logPosition].classList.add('log')//add log class to new cell 
      }
    }
  }, 1000)
}

function collisionDetection(cells){
      // if(cell.classList.contains('frog')){
      //   console.log('hello')
      // } 
    } 

    //if a cell has log class and frog class 
       //toggle frog on log loop
       //cancel normal setinterval


