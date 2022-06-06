
const playerDocks = document.querySelector('.player-docks')
const shipName = document.querySelector('.ship-name')
const playerGameboardGridWrapper = document.querySelector("[data-player-gameboard]");
const cpuGameboardGridWrapper = document.querySelector("[data-cpu-gameboard]");


// create 10x10 grid and assign each div a data attribute to be used as a coordinate

export function renderGameboard(userGameboard) {

    for (let i = 0; i <= userGameboard.gameboard.length - 1; i++ ) {
        let gameDiv = document.createElement('div');
        gameDiv.dataset.coordinate = userGameboard.gameboard[i];

        gameDiv.classList.add('gameboard-div');
        gameDiv.classList.add('player-gameboard-div');
        playerGameboardGridWrapper.appendChild(gameDiv)
    }
}

export function renderCpuGameboard(userGameboard) {
    for (let i = 0; i <= userGameboard.gameboard.length - 1; i++ ) {
        let gameDiv = document.createElement('div');
        gameDiv.dataset.coordinate = userGameboard.gameboard[i];

        gameDiv.classList.add('gameboard-div');
        gameDiv.classList.add('cpu-gameboard-div');
        cpuGameboardGridWrapper.appendChild(gameDiv)
    }
}

 export function renderDockedShip(fleet, index){
    clearDocks();
    let shipDiv = document.createElement('div');    shipDiv.dataset.ship = fleet[index].name;
    shipDiv.dataset.length = fleet[index].length;
    shipDiv.classList.add('ship-wrapper');
    shipDiv.classList.add('draggable');
    shipDiv.setAttribute('draggable', true);

    for (let i = 0; i < fleet[index].length; i++) {
        let shipSpan = document.createElement('span');
        shipSpan.classList.add('ship-span')
        shipDiv.appendChild(shipSpan);
    }
    shipName.textContent = fleet[index].name;

    playerDocks.appendChild(shipDiv)
}

export function renderActiveShips(userGrid, userGameboard) {
    userGrid.forEach((div) => {
        userGameboard.shipLocations.forEach((ship) => {
            if (ship.coordinates.includes(div.dataset.coordinate)) {
                div.classList.add('active-ship')
            }
        })
    })
}

export function renderMissedAttacks(userGrid, userGameboard) {
    userGrid.forEach(div => {
        if (userGameboard.missedAttacks.includes(div.dataset.coordinate)) {
            div.classList.add('missed-attack')
            div.textContent = '.'
        }
    })
}

export function renderHitAttacks(userGrid, userGameboard) {
    userGrid.forEach(div => {
        if (userGameboard.hitAttacks.includes(div.dataset.coordinate)) {
            div.classList.add('hit-attack')
            div.textContent = 'X'
        }
    })
}




function clearDocks() {
// removes previous ship from dock (after being placed on board)
    playerDocks.removeChild(playerDocks.lastChild)
}

// missed & hit attacks not rendering correctly.


