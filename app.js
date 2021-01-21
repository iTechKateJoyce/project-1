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
const carsRight = [72, 75, 78]//indicies of car starting point
const carsLeft = [62, 59, 56]//indicies of car starting point
const logsRight = [42, 41, 40, 38, 37, 36, 24, 23, 22, 20, 19, 18]// bothlanes
const logsLeft = [28, 29, 30, 33, 34, 35]
let time = 90

//Game overlay - press enter to play
document.addEventListener('keyup', (event) => {
  const startKey = event.key
  if(startKey === 'Enter'){
    document.getElementById("overlay").style.display = 'none'
    document.getElementById("text").style.display = 'none'
    document.getElementById("p").style.display = 'none'
  
  }
})

function generateGrid (grid, gridStyling) {//generate the grid 
  for (let index = 0; index < width * height; index++) {
    // Generate each element
    const cell = document.createElement('div')
    cell.classList.add('cell')
    grid.appendChild(cell)
    cells.push(cell)
    // cell.innerHTML = index // Number each cell by its index.
    cell.id = index //adds an individual id to each cell - remove if N/A
    // Set the width and height of grid cells
    cell.style.width = `${100 / width}%`
    cell.style.height = `${100 / height}%`
    gridStyling(index, cell)//adds background styling to grid cells 
  }

}
function gridStyling(index, cell) {//adds grid styling/classes to cells
  if(index === 100){ //add timer class to cell
    cell.classList.add('countdown')
  }
  else if(index >= 54 && index <= 89){ //add road styling
    cell.classList.add('road')
  }
  else if(index <= 53 && index >= 45){
    cell.classList.add('sidewalk')
  }
  else if(index <= 44 && index >= 18){//adds river styling to grid
    cell.classList.add('river')
  }
  else if(index === 11 || index === 13 || index === 15){//adds home cells, these give you points if you reach them
    cell.classList.add('home')
  }
  else if(index === 9 || index === 10 || index === 12 ||index === 14 || index === 16 || index === 17){
    cell.classList.add('grass')
  }
  else if(index === 8){  //add points class to cell and display starting points
    cell.classList.add('points')
    const displayScore = document.querySelector('.points')//grabs the points cell element
    displayScore.innerHTML = `Score ${points}`
  }
  else if(index <= 107 && index >= 90 || index >= 0 && index <= 8){  //add status bar
    cell.classList.add('statusBar')//get rid of home row extras 
  }
  else if(index === 106){ //adds lives class to cell 
    cell.classList.add('lives')
  }
}
generateGrid(grid, gridStyling)
displayTimer() 

const heart = '&#128154;'
const heartSpan = document.createElement('span')
heartSpan.classList.add('displayHearts')
document.getElementById(106).appendChild(heartSpan)

function displayLives(lives){ //displays current player lives inside .lives div
  
  if(lives > 0){
    heartSpan.innerHTML = (`${heart}`.repeat( `${lives}`))
  }
  else if(lives <= 0){
    heartSpan.innerHTML = ''
  }
}

function displayTimer () {//displays countdown timer
  const displayTimer = document.querySelector('.countdown')//introduce the timer cell to JS
  let time = 90//90 seconds start
  displayTimer.innerHTML = time
  let intervalId = 0
  intervalId = setInterval(() => {
    if (time <= 0){
      clearInterval(intervalId)
      displayTimer.innerHTML = '0'
    }
    else{
      displayTimer.innerHTML = time--
    }
  }, 900)
}

//puts frog on grid starting position
cells[playerPosition].classList.remove('frog')
playerPosition += 1
cells[playerPosition].classList.add('frog')
displayLives(lives)

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

function resetGame (){ 
  //remove any frogs that reached home
const homeCells = [11, 13, 15]
homeCells.forEach((home, i) =>{
  if(cells[home].classList.contains('frogReachedHome')){
    cells[home].classList.remove('frogReachedHome')
  }
})
//reset frog position 
cells[playerPosition].classList.remove('frog')//remove frog
playerPosition = 94
cells[playerPosition].classList.add('frog')
  }

const result = document.createElement('span')
result.classList.add('result')
document.getElementById(102).appendChild(result)

function win (){
  if(points >= 3000){
    result.innerHTML = 'Winner'
    //add time bonus = points plus timervalue
    resetGame()
    
  }
  else if(cells[playerPosition].classList.contains('home')){ //if frog position has the class home
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
function lose() {
  if(time === 0 || lives === 0){
    // cells[playerPosition].classList.remove('frog')//remove frog
    // playerPosition = 94
    // cells[playerPosition].classList.add('frog')
    result.innerHTML = 'Try again!'
    resetGame()
  }
  // else if(cells[playerPosition].classList.contains('river')){
  else if(cells[playerPosition].className === 'cell river frog'){
    lives--
    displayLives(lives)
    cells[playerPosition].classList.remove('frog')//remove frog
    playerPosition = 94
    cells[playerPosition].classList.add('frog')
    console.log('just died and lives are', lives)
  }
  else if(cells[playerPosition].classList.contains('carR') || cells[playerPosition].classList.contains('carL')){
    lives--
    displayLives(lives)
    cells[playerPosition].classList.remove('frog')//remove frog
    playerPosition = 94
    cells[playerPosition].classList.add('frog')
  }
}

logsRight.forEach(log => {
  cells[log].classList.add('logR')
})

function moveLogRight() {
  logsRight.forEach((log, i) => {
    if(log == 44 || log === 26){ //if the log hits the boundary, then reset
      cells[log].classList.remove('logR')
      logsRight[i] -= width - 1//update location
      cells[log -= 8].classList.add('logR')
    }
    else{
      cells[log].classList.remove('logR')//remove logR class
      logsRight[i] += 1//update location
      cells[log += 1].classList.add('logR')
    }
    })

}
logsLeft.forEach(log => {
  cells[log].classList.add('logL')
})

function moveLogLeft() {
  logsLeft.forEach((log, i) => {
    if(log === 27){ //boundary logic
      cells[log].classList.remove('logL')
      logsLeft[i] += (width - 1)//update to starting point location
      cells[log += (width - 1)].classList.add('logL')
    }
    else{ //move the logs
    cells[log].classList.remove('logL')
    logsLeft[i] -= 1//update location
    cells[log -=1].classList.add('logL')
    }
  })
}

carsRight.forEach(car => {
  cells[car].classList.add('carR')
})
function moveCarRight() {
  carsRight.forEach((car, i) => {
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

function frogOnLog (){// --is there a way of importing that log logic here? log l vs log r
    if(cells[playerPosition].classList.contains('logR') && !(playerPosition % width === width - 1)){
      //move frog right
      cells[playerPosition].classList.remove('frog')//remove logR class
      playerPosition += 1//update location looky here
      cells[playerPosition].classList.add('frog')
      //boundary log if frog hits sides too -> could do this in lose 
      }
      else if(cells[playerPosition].classList.contains('logL') && !(playerPosition % width === 0)){
        cells[playerPosition].classList.remove('frog')
        playerPosition -= 1
        cells[playerPosition].classList.add('frog')
      }
}


function moveStuff() { //one second loop for cars, could also add logs and potentially win/lose funcs too
  const intervalIDMS = setInterval(() => {
    moveLogRight()
    moveLogLeft()
    frogOnLog()
    moveCarRight()
    moveCarLeft()
    win()
    lose()
  }, 800)
}

moveStuff()
