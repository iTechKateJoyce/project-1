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
const heart = '&#128150;'
//? Generate the grid

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

function gridStyling(index, cell) {
  if(index >= 54 && index <= 89){ //add road styling
    cell.classList.add('road')
      //add cars to the road area
  }
  //adding river styling to grid
  else if(index <= 44 && index >= 18){
    cell.classList.add('river')
    //add logs to the river
    if(index === 36 || index === 37 || index === 38 || index === 41 || index === 42 || index === 43 || index === 28 || index === 29 || index === 30 || index === 33 || index === 34 || index === 35){
      cell.classList.add('log')
    }
  }
  //add status bar
  else if(index <= 107 && index >= 99){
    cell.classList.add('statusBar')
  }
  //add home cells, these give you points if you reach them
  else if(index === 11 || index === 13 || index === 15){
    cell.classList.add('home')
  }
  //add timer display
  else if(index === 0){
    cell.classList.add('timer')
  }
  //add points display
  else if(index === 4){
    cell.classList.add('points')
    cell.innerHTML = 'POINTS'
  }
  else if(index === 8){
    cell.classList.add('lives')
    // cell.innerHTML = 
    
  }
}
//display current level score for player
const displayScore = document.querySelector('.points')//grabs the points cell element
displayScore.innerHTML = points //update inner html to points number variable 


function displayLives(lives, heart){
  const span = document.createElement('span')
  span.classList.add('displayHearts')
  document.getElementById(8).appendChild(span)//append to div with id of 8
  span.innerHTML = (`${heart}`.repeat( `${lives}`)) 
}

displayLives(lives, heart)


function displayTimer () {
  const displayTimer = document.querySelector('.timer')//introduce the timer cell to JS

  let startTime = 90//90 seconds start
  let intervalId = 0
  
  intervalId = setInterval(() => {
    if (startTime < 0){
      clearInterval(intervalId)
      displayTimer.innerHTML = 'out of time!'
    }
    else{
      displayTimer.innerHTML = startTime--
    }
  }, 1000)
}


//? Put frog on board and make him move
cells[playerPosition].classList.remove('frog')
playerPosition += 1
cells[playerPosition].classList.add('frog')

document.addEventListener('keyup', (event) => {//listens for keyup on arrows to trigger frog movement & boundary logic
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
    cells[playerPosition].classList.remove('frog')//remove frog
    cells[playerPosition].classList.add('frogReachedHome')//update cell with winning frog  
    // cells[87].classList.add('frog')

    //reset frog to starting position 
  }
  // else if frog moves forward 
  //         +1 point
  // - is it worth calling generatePoints function inside keyup arrowUp event listener?
}

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
function moveCars() { //cars loop through 
  setInterval(() => {
    moveCarRight()
    moveCarLeft()

  }, 1000)
  // carsR.forEach(item => moveCarRight(item))
}

moveCars()















  // //if the cell contains a car
  //   //get carlocation
  //   let carlocation = Number(item.id)
  //   //if car location = 72/75/78
  //   if(carlocation == 72 || carlocation == 75 || carlocation == 78){
  //     //remove
  //     //remove the car
  //     //update
  //     carlocation += 2 //update car location ----------needs to dynamically update the array i guess?
  //     //add 
  //     //add car
  //   }
  //   else if(carlocation === 74 || carlocation === 77 || carlocation === 80){
      

  //     cells[carlocation].classList.remove('carL')//remove the car
  //     carlocation = Number(item.id) - 1 //carLocation -1
  //     cells[carlocation].classList.add('carL')//add car
  //   }
           
    //else if its 74/77 || 80
      //remove car
      //carLocation-1
      //add car
    //else if it's 73|| 76 || 79
      //remove car
      //carLocation -1
      //add car
    
  
  // cells[carlocation].classList.remove('carL')
  // carlocation = Number(item.id) - 1
  // cells[carlocation].classList.add('carL')
  // cells[carlocation].classList.remove('carL')
  // carlocation = Number(item.id)--
  // cells[carlocation].classList.add('carL')
  //location + 2
  //add car to new location 


  // switch (true) {
  //   case item.classList.contains('carL')://the actual car
  //     item.classList.remove('carL')
  //     item.classList.add('road')
  //   break
  //   case item.classList.contains('road'):
  //     item.classList.remove('road')
  //     item.classList.add('road')
  //   break
  //   case item.classList.contains('road'):
  //     item.classList.remove('road')
  //     item.classList.add('car')
  //   break
  // }
// }


//car.classList.contains(carsLeft) if the car div contains classLeft 
//remove it
//add one to the position 
//add class to new position 


// moveCars() 




// function moveCarLeft(carsLeft){
//   const carLeftPositions = {
//     'car1': 72,
//     'car2': 75,
//     'car3': 78,
//   }
//   if(carLeftPositions){ //if above is true then
//     // console.log(carLeftPositions, carsLeft, cells)
//      //remove the class from the key cell
//      console.log(cells[carLeftPositions[]])
//     // cells[(carLeftPositions.car1)].classList.remove('carsLeft')
    
    
//      //  

//     // cells[playerPosition].classList.remove('frog')
//   }

  
 

//     //update car positions +2 
//     //add car class for new positions
//     //remove car class for current position
//     //update car positions -1
//     //add car class for new positions 
//     //remove car class from current posotion 
//     //update car positions -1
//     //add car class
  

// }





//   }
//   cells[playerPosition].classList.remove('frog')
//   playerPosition += 1
//   cells[playerPosition].classList.add('frog')

// // }



//    //traffic starting point
//    let carPosition = 72
//    let displayCar = cells[carPosition].classList.add('car') //dom element for starting cell
//    setInterval(() => { 
//     if(cells[carPosition].classList.contains('car')){//if cell has car class
//       if(cells[carPosition].id >= 80){ //if car has reached the "end of the road", restart loop
//         cells[carPosition].classList.remove('car')//remove car
//         carPosition = 72//reset car at position to cell 70
//         cells[carPosition].classList.add('car')//add car class
//       }else{
//         cells[carPosition].classList.remove('car')//remove car class
//         carPosition += 1 //move car right one cell 
//         cells[carPosition].classList.add('car')//add car class to new cell 
//       }
//     }
//   }, 500)
// }

// function logAppears(cells){ //log loop (one row)
//   //log starting point
//   let logPosition = [36]
//   let displayLog = cells[logPosition].classList.add('log') //dom element for starting cell
//   //log loop across row
//   const intervalId = setInterval(() => { 
//     if(cells[logPosition].classList.contains('log')){//if cell has log class
//       if(cells[logPosition].id <= 44){ //check if log has reached the "end of the road" to restart loop
//         cells[logPosition].classList.remove('log')//remove log
//         logPosition = 36//reset log at position to original cell
//         cells[logPosition].classList.add('log')//add log class
//       }
//       else { //otherwise log is still looping, continue moving
//         cells[logPosition].classList.remove('log')//remove log class
//         logPosition -= 1 //move log left one cell 
//         cells[logPosition].classList.add('log')//add log class to new cell 
//       }
//     }
//   }, 1000)
// }

// function collisionDetection(cells){
//       // if(cell.classList.contains('frog')){
//       //   console.log('hello')
//       // } 
//     } 

    //if a cell has log class and frog class 
       //toggle frog on log loop
       //cancel normal setinterval


