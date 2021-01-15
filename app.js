let lives = 3  
let points = 0 
let playerPosition = 86 //relates to index of cell array where player starts on the board, will be used to keep track of the frog too
const grid  = document.querySelector('.grid')//relates to container div for whole grid html element with grid class 
const width = 7 
const height = 14 
const cells  =  [] //a single array of dom elements

//? Generate the grid - adjust css .grid to make this work
for (let index = 0; index < width * height; index++) {
  // Generate each element
  const cell = document.createElement('div')
  cell.classList.add('cell')
  grid.appendChild(cell)
  cells.push(cell)
  // Number each cell by its index.
  cell.innerHTML = index
  // Set the width and height of my cells
  cell.style.width = `${100 / width}%`
  cell.style.height = `${100 / height}%`
}

//? Put frog on board and make him move
  //add boundary logic
cells[playerPosition].classList.remove('frog')
playerPosition += 1
cells[playerPosition].classList.add('frog')

document.addEventListener('keyup', (event) => {
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
})