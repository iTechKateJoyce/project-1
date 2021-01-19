/* 
Local variables
const displayScore = document.querySelector('.points')//grabs the points cell element
displayScore.innerHTML = `Score ${points}`  
*/
let lives = 3  
let points = 0 
let playerPosition = 93 //relates to index of cell array where player starts on the board, will be used to keep track of the frog too
let logPosition = null
const grid  = document.querySelector('.grid')//relates to container div for whole grid html element with grid class 
const width = 9 
const height = 12 
const cells  =  [] //a single array of dom elements
let carsRight = [72, 75, 78]//indicies of car starting point
let carsLeft = [62, 59, 56]//indicies of car starting point
let startTime = 90//90 seconds start

function generateGrid (grid, gridStyling) {//generate the grid 
  for (let index = 0; index < width * height; index++) {
    // Generate each element
    const cell = document.createElement('div')
    cell.classList.add('cell')
    grid.appendChild(cell)
    cells.push(cell)
    cell.innerHTML = index // Number each cell by its index.
    cell.id = index //adds an individual id to each cell - remove if N/A
    // Set the width and height of my cells
    cell.style.width = `${100 / width}%`
    cell.style.height = `${100 / height}%`
    gridStyling(index, cell)//adds background styling to grid cells 
    displayTimer()//displays countdown timer in grid
  }

}
function gridStyling(index, cell) {//adds grid styling/classes to cells
  if(index >= 54 && index <= 89){ //add road styling
    cell.classList.add('road')
  }
  else if(index <= 44 && index >= 18){//adds river styling to grid
    cell.classList.add('river')
    //add logs to the river
    if(index === 36 || index === 37 || index === 38 || index === 41 || index === 42 || index === 43 || index === 28 || index === 29 || index === 30 || index === 33 || index === 34 || index === 35){
      cell.classList.add('log')
    }
  }
  else if(index <= 107 && index >= 99){  //add status bar
    cell.classList.add('statusBar')
  }
  else if(index === 11 || index === 13 || index === 15){//adds home cells, these give you points if you reach them
    cell.classList.add('home')
  }
  else if(index === 0){ //add timer class to cell
    cell.classList.add('timer')
  }
  else if(index === 4){  //add points class to cell and display starting points
    cell.classList.add('points')
    const displayScore = document.querySelector('.points')//grabs the points cell element
    displayScore.innerHTML = `Score ${points}`
  }
  else if(index === 8){ //adds lives class to cell 
    cell.classList.add('lives')
  }
}
generateGrid(grid, gridStyling) 

function displayLives(lives){ //displays current player lives inside .lives div
  const heart = '&#128150;'
  const span = document.createElement('span')
  span.classList.add('displayHearts')
  document.getElementById(8).appendChild(span)//append to div with id of 8
  span.innerHTML = (`${heart}`.repeat( `${lives}`)) 
}
displayLives(lives)

function displayTimer () {//displays countdown timer inside div
  const displayTimer = document.querySelector('.timer')//introduce the timer cell to JS
  let startTime = 90//90 seconds start
  displayTimer.innerHTML = startTime
  let intervalId = 0
  intervalId = setInterval(() => {
    if (startTime <= 0){
      clearInterval(intervalId)
      displayTimer.innerHTML = 'out of time!'
    }
    else{
      displayTimer.innerHTML = startTime--
    }
  }, 1000)
}

//puts frog on grid starting position
cells[playerPosition].classList.remove('frog')
playerPosition += 1
cells[playerPosition].classList.add('frog')

document.addEventListener('keyup', (event) => {//listens for keyup on arrows to trigger moveFrog() which controls frog movement & boundary logic
  const key = event.key
    if(key === 'ArrowUp' && !((playerPosition - width) < width) ){
      cells[playerPosition].classList.remove('frog')
      playerPosition -= width
      cells[playerPosition].classList.add('frog')
      points += 10
      
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
})

function win (){
  if(points >= 3000){
    console.log('WINNER!')
  }
  else if(cells[playerPosition].classList.contains('home')){ //if frog position has the class home
    console.log('froggy reached home')
    points += 1000 //add 1000 points 
     //reset frog to starting position 
    cells[playerPosition].classList.remove('frog')//remove frog
    cells[playerPosition].classList.add('frogReachedHome')//update cell with winning frog  
    playerPosition = 94
    cells[playerPosition].classList.add('frog')
  }
  const displayScore = document.querySelector('.points')//grabs the points cell element
  displayScore.innerHTML = `Score ${points}` // updates the innerHTML to current points
}
// function lose() {
//   if(timer)

// }

// function generatePoints(playerPosition, points){ //add, remove, display points

// }

// const carsL = Array.from(document.querySelectorAll('.carL')) //dom elements containing car travelling left
carsRight.forEach(car => {
  cells[car].classList.add('carR')
})

function moveCarRight() {
  carsRight.forEach((car, i) => {
  // console.log(cells[item])
  if(car === 80){ //if the car hits the boundary, then reset
    cells[car].classList.remove('carR')
    carsRight[i] -= (width - 1)//update location
    cells[car -= (width -1)].classList.add('carR')
  }else{
    cells[car].classList.remove('carR')//remove carR class
    carsRight[i] += 1//update location
    cells[car +=1].classList.add('carR')//adds carR class
  }
  })
}

carsLeft.forEach(car => {
  cells[car].classList.add('carL')
})

function moveCarLeft() {
  carsLeft.forEach((car, i) => {
    if(car === 54){ //boundary logic
      cells[car].classList.remove('carL')
      carsLeft[i] += (width - 1)//update to starting point location
      cells[car += (width - 1)].classList.add('carL')
    }
    else{ //move the cars 
    cells[car].classList.remove('carL')
    carsLeft[i] -= 1//update location
    cells[car -=1].classList.add('carL')
    }

  
  })

}
function moveCars() { //one second loop for cars, could also add logs and potentially win/lose funcs too
  setInterval(() => {
    moveCarRight()
    moveCarLeft()
    win()

  }, 1000)
}

moveCars()
