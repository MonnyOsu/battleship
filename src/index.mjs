import { shipFactory } from "./shipFactory.mjs";
import { gameboardFactory } from "./gameboardFactory.mjs";
import { renderGameboard, renderCpuGameboard, renderDockedShip } from "./domFunctions.mjs";
import { renderActiveShips } from "./domFunctions.mjs";
import { renderHitAttacks } from "./domFunctions.mjs";
import { renderMissedAttacks } from "./domFunctions.mjs";

const rotateButton = document.querySelector('.rotate-button');
const playerFleet = shipFactory();
const cpuFleet = shipFactory();
const playerGameboard = gameboardFactory();
const cpuGameboard = gameboardFactory();

let activeShips = 0
let horizontal = true

//render usergrid
renderGameboard(playerGameboard);
renderCpuGameboard(cpuGameboard)
renderDockedShip(playerFleet, activeShips, horizontal);
//define user grid to be used in renderActiveShips()
const playerGrid = document.querySelectorAll('.player-gameboard-div')
const cpuGrid = document.querySelectorAll('.cpu-gameboard-div')
const draggables = document.querySelectorAll(".draggable");

rotateButton.addEventListener('click', () => {
  const dockedShip = document.querySelector('.ship-wrapper')
  rotateShip(dockedShip)
})

// PRE GAME SET UP
//drag event listeners
draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });

  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
});

//drop
playerGrid.forEach((box) => {
  box.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.target.classList.add("grid-hover");
  });
  box.addEventListener("dragleave", (e) => {
    e.preventDefault();
    e.target.classList.remove("grid-hover");
  });
  box.addEventListener("drop", (e) => {
    e.preventDefault();
    e.target.classList.remove("grid-hover");
    const startIndex = e.target.dataset.coordinate;
    
    playerGameboard.placeShip(playerFleet[activeShips], startIndex, horizontal )
    renderActiveShips(playerGrid, playerGameboard)

    // checks if placeShip was valid before increasing active ship variable. This ensures the player will be able to place the invalid ship again.
    if (playerGameboard.shipLocations.length > activeShips) {
      activeShips++
    }
    
    if (activeShips <= 4) {
    horizontal = true
    renderDockedShip(playerFleet, activeShips)
    }

    if (activeShips === 5) {
    cpuGameboard.placeCpuShips(cpuFleet)
    console.log(cpuGameboard)
    startGame();
    }

  });
});


//GAME START
// event listner on CPU's board to wait for players first attack. 

cpuGrid.forEach(div => {
  div.addEventListener('click', (e) => {
    let attackCoordinate = e.target.dataset.coordinate
  
    //trigger attach on game board
    cpuGameboard.receiveAttack(attackCoordinate)
    console.log(cpuGameboard)
    playerGameboard.receiveAttack(playerGameboard.cpuAttackGenerator())
    console.log(playerGameboard)
  
    // render Attack & Miss
    renderAllAttacks()
})
})



function rotateShip(ship) {
  if (horizontal) {
      ship.style.flexDirection = 'column'  
      horizontal = false
  } else {
      ship.style.flexDirection = 'row'
      horizontal = true
  }
}


function startGame() {
  // remove player docks
  document.querySelector('.player-docks').style.display = 'none';
  // make cpu gameboardGrid visible
  document.querySelector("[data-cpu-gameboard]").style.display = 'grid'
}

function renderAllAttacks() {
  renderHitAttacks(playerGrid, playerGameboard)
  renderHitAttacks(cpuGrid, cpuGameboard)
  renderMissedAttacks(cpuGrid, cpuGameboard)
  renderMissedAttacks(playerGrid, playerGameboard)
}
