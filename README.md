# Frogger: Grid Game

## Overview

Frogger was the very first project as part of the GA software Engineering immersive course. We were tasked to re-create a classic grid game over the course of a week as a solo project, at this point we'd studied JavaScript for two weeks. The functionality of the game includes automated moving elements, collision detection, timers and player movement logic.

🔗 https://kate1562.github.io/project-1/ 

## Game demo 
![frogger](https://user-images.githubusercontent.com/68645584/117049803-8b1bcd80-ad0c-11eb-915a-9ea9a6c222c5.gif)


## Brief & Timeframe:
* Build a game individually.
* Be creative.
* Render a game in the browser.
* Design logic for winning & visually display the winner.
* Include separate HTML / CSS / JavaScript files.
* Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles.
* Use JavaScript for DOM manipulation.
* Deploy your game online, where the rest of the world can access it.
* Use semantic markup for HTML and CSS (adhere to best practices).
* The game should be playable for one player.
* The obstacles should be auto-generated and animated.
* The aim of the game is to guide a frog across a road, and a river to its home at the top of the screen.
* Must detect any collision (e.g. with cars and river).
* Timers should be present.
* Timeframe : 1 week.

## Technologies used
* HTML5
* CSS3
* JavaScript (ES6)
* Git and GitHub
* Google Fonts

## Approach 
I started by whiteboarding out the rules of the game and the functionalities it should include for the MVP and any stretch goals too. The week was then divided into mini deadlines including delivery of  MVP, time for stretch goals and styling. 

### The Grid:
The first step was to create a grid structure, I used a for loop to generate the cells dynamically rather than hard coding div`s with HTML.
```javascript
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
```  
Inside the generateGrid function the gridStyling function is called to group thematically similar divs and apply styling such as road, river, status bar etc using DOM manipulation methods.

```javascript
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
```
### Moving parts
#### Frog
The player starting position was defined inside a variable according to the grid index, whilst building it was helpful to see the cell indexes to plan movement and boundary logic. It's possible to move the frog using arrow keys, this code sat inside an event listener and used DOM manipulation to add and remove the frog class from grid cells. In order to actually move the frog the playerPosition was updated using width or a number.The boundary logic was included to stop the frog from moving "through the walls". 

#### Cars and creatures
The traffic, turtles and fish movement is all automated. This was done using functions called inside a set interval to create the movement. See examples below:
The starting indices of the cars were saved in an array and the car class was added using forEach to iterate over each starting point. Next,  the moveCarRight function, which is called inside a setInterval, adds and removes the car class to mimicking movement across the road. When the car moves right until it hits a wall boundary it resets.

#### Collision detection
In this game the frog loses a life by either getting hit by a car or by falling in the water. If the frog collides with these dangers one life is removed and the player position is reset to the starting point.The lose function checks if the frog cell contains river or a car, if so, the frog loses a life. If the player has 0 lives or the time runs out then they lose the game.

## Challenges
The main challenge was moving obstacles and detecting collision, to achieve this there were a number of functions inside a setInterval timer.

```javascript
function ruleCheck(){
  const intervalIDRS = setInterval(() => {
    win()
    lose()
  }, 400)

}
```
```javascript
function moveStuff() { //one second loop for cars, could also add logs and potentially win/lose funcs too
  const intervalIDMS = setInterval(() => {
    moveLogRight()
    moveLogLeft()
    frogOnLog()
    moveCarRight()
    moveCarLeft()
  }, 800)
}

moveStuff()
ruleCheck()
```


## Bugs
* Sometimes the frog drops off their turtle, this is to do with the way the movement was programmed. Occasionally, the log is removed before the frog is moved onto the cell resulting in the frog "dropping off" and losing a life.
* The car collision detection can be somewhat slow off the mark to recognise that the frog is in the same cell as the car. 

## Suggested enhancements
* Refactor the code!
* Additional levels, each one increasing in difficulty
* High score board using localStorage
* Randomised lucky coin to move across the page for extra points
* CSS animations to achieve a more impactful design 


## Key learnings
* Building my first JavaScript game from scratch was a great learning experience and a fun way to practise working with DOM manipulation, different array methods and timers.
* I was super happy to get the main game logic working to win and lose 
* The CSS overlay was simpler to implement than I initially thought.

