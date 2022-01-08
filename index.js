
  const width = 28
  const grid = document.querySelector(".grid")
  const scoreDisplay = document.querySelector("#score")
  const squares = []
  let score = 0

  // 0 - pacdots
  // 1 - wall
  // 2 - ghost lair
  // 3 - powerpellets
  // 4 - empty

  const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
  ]

  // Create board
  function createBoard() {
    for (let i = 0; i < layout.length; i++) {
      // create a square from the divs
      const square = document.createElement("div")
      // put a square into grid
      grid.appendChild(square)
      // put square into squares array
      squares.push(square)

      if (layout[i] === 0) {
        squares[i].classList.add("pac-dot")
      } else if (layout[i] === 1) {
        squares[i].classList.add("wall")
      } else if (layout[i] === 2) {
        squares[i].classList.add("ghost-lair")
      }  else if (layout[i] === 3) {
        squares[i].classList.add("power-pellet")
      }
    }
  }
  createBoard()

  // control keys
  // left - 37
  // up - 38
  // right - 39
  // down - 40

  // Create Pacman starting position
  let pacmanCurrentIndex = 490
  squares[pacmanCurrentIndex].classList.add("pacman")

  // Move Pacman
  function movePacman(e) { 
    squares[pacmanCurrentIndex].classList.remove("pacman")
    // Using Switch syntax
    switch(e.keyCode) {
      case 37:
      if (
          !squares[pacmanCurrentIndex - 1].classList.contains("ghost-lair") &&
          !squares[pacmanCurrentIndex - 1].classList.contains("wall") && 
          pacmanCurrentIndex % width !== 0
        )
      pacmanCurrentIndex -= 1
      if (squares[pacmanCurrentIndex - 1] === squares[364]) {
        pacmanCurrentIndex = 391
      }
      break

      case 38:
      if (
          !squares[pacmanCurrentIndex - width].classList.contains("ghost-lair") &&
          !squares[pacmanCurrentIndex - width].classList.contains("wall") &&
          pacmanCurrentIndex - width >= 0
        )
      pacmanCurrentIndex -= width
      break

      case 39:
      if (
        !squares[pacmanCurrentIndex + 1].classList.contains("ghost-lair") &&
        !squares[pacmanCurrentIndex + 1].classList.contains("wall") &&
        pacmanCurrentIndex % width < width - 1
        )
      pacmanCurrentIndex +=1
      if (squares[pacmanCurrentIndex + 1] === squares[392]) {
        pacmanCurrentIndex === 364
      }
      break

      case 40:
      if (
        !squares[pacmanCurrentIndex + width].classList.contains("ghost-lair") &&
        !squares[pacmanCurrentIndex + width].classList.contains("wall") &&
        pacmanCurrentIndex + width < width*width
        )
      pacmanCurrentIndex += width
      break
    }
    squares[pacmanCurrentIndex].classList.add("pacman")
    eatPacDot()
    eatPowerPellet()
    gameOver()
    wonGame()  
  }
  document.addEventListener("keyup", movePacman) 

  // When pacdot is eaten
  function eatPacDot() {
    if(squares[pacmanCurrentIndex].classList.contains("pac-dot")) {
      score++
      scoreDisplay.innerHTML = score
      squares[pacmanCurrentIndex].classList.remove("pac-dot")
    }
  }

  // When power pellet is eaten
  function eatPowerPellet() {
    if (squares[pacmanCurrentIndex].classList.contains("power-pellet")) {
      //power-pellet disappears after eaten
      squares[pacmanCurrentIndex].classList.remove("power-pellet")
      // score add by 10
      score +=10
      scoreDisplay.innerHTML = score
      // ghosts are scared
      ghosts.forEach(ghost => ghost.isScared = true)
      // set timer for 10 seconds
      setTimeout(unScareGhost, 10000)
    }
  }

  // Unscare ghosts, stop flashing
  function unScareGhost() {
    ghosts.forEach(ghost => ghost.isScared = false)
  }

  // Create ghosts
  class Ghost {
    constructor (className, startIndex, speed) {
      this.className = className
      this.startIndex = startIndex
      this.speed = speed
      this.currentIndex = startIndex
      this.isScared = false
      this.timerId = NaN
    }
  }

  // Ghosts array
  const ghosts = [
    new Ghost("catty", 348, 250),
    new Ghost("millou", 376, 400),
    new Ghost("binky", 351, 300),
    new Ghost("chubby", 379, 500 )
  ]

  // Draw ghosts into grid
  ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add("ghost")
  })


  // Move ghosts
  ghosts.forEach(ghost => moveGhost(ghost))

  function moveGhost(ghost) { 
    const directions = [-1, +1, +width, -width]
    let direction = directions[Math.floor(Math.random() * directions.length)]

    ghost.timerId = setInterval(function() {

      if (
        !squares[ghost.currentIndex + direction].classList.contains("wall") &&
        !squares[ghost.currentIndex + direction].classList.contains("ghost")
      ) {
      //remove any ghost
      squares[ghost.currentIndex].classList.remove(ghost.className)
      squares[ghost.currentIndex].classList.remove("ghost", "scared-ghost")
      //add direction to ghost currentIndex
      ghost.currentIndex += direction
      //add any ghost
      squares[ghost.currentIndex].classList.add(ghost.className, "ghost")
      } else direction = directions[Math.floor(Math.random() * directions.length)]

      //if ghosts are scared
      if (ghost.isScared) {
        squares[ghost.currentIndex].classList.add("scared-ghost")
      }

      //if the ghost is scared AND pacman is on it
      if (ghost.isScared && squares[ghost.currentIndex].classList.contains("pacman")) {
        console.log(ghost.currentIndex)
        // remove classNames ghost and scared-ghost
        squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost")
        // change ghost position to startIndex
        console.log(ghost.startIndex)
        ghost.currentIndex = ghost.startIndex
        // add score 100
        score +=100
        scoreDisplay.innerHTML = score
        //re-add classnames of ghost to the new position
        squares[ghost.currentIndex].classList.add(ghost.className, "ghost")
      }
    gameOver()

    }, ghost.speed)
  }

  function gameOver() {
    // if pacman bumps into ghost and ghost is NOT scared
    if (squares[pacmanCurrentIndex].classList.contains("ghost") &&
    !squares[pacmanCurrentIndex].classList.contains("scared-ghost")) {
      // Each ghost needs to stop moving
      ghosts.forEach(ghost => clearInterval(ghost.timerId))
      // remove eventlistener from control function
      document.removeEventListener("keyup", movePacman)
      // notify user Game if Over
      scoreDisplay.innerHTML = "Uh-oh 😯 You LOSE!"
    }
  }

  function wonGame() {
    if (score === 333) {
      // each ghost has to stop moving
      ghosts.forEach(ghost => clearInterval(ghost.timerId))
      // remove eventlistener
      document.removeEventListener("keyup", movePacman)
      // nostify user wins the game
      scoreDisplay.innerHTML = "You WON 🙌!"
    }
  }


