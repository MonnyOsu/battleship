import { gameboardFactory } from '../gameboardFactory';
import { shipFactory } from '../shipFactory';
const shipFleet = shipFactory();
const testGameBoard = gameboardFactory();

testGameBoard.placeShip(shipFleet[0], 'e1', 'i1');
testGameBoard.receiveAttack('e1');
testGameBoard.receiveAttack('f1');
testGameBoard.receiveAttack('g1');
testGameBoard.receiveAttack('h1');
testGameBoard.receiveAttack('d2');
testGameBoard.receiveAttack('i1');



test('does placeShip() place ships at specific coordinites', () => {
    expect(testGameBoard.shipLocations).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Aircraft Carrier",
          }),
        ]),
    );
})

test('does placeShip() place ships at specific coordinites', () => {
    expect(testGameBoard.shipLocations).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            coordinates: ['e1', 'f1', 'g1','h1','i1'],
          }),
        ]),
    );
})


test('does receiveAttack correctly mark ship as hit', () => {
    expect(testGameBoard.shipLocations[0].hitPoints).toBe(0);
})

test('does the missedAttack array update with missed attacks', () => {
    expect(testGameBoard.missedAttacks).toEqual(expect.arrayContaining(['d2']))
});

test('is game clear correctly checks if all ships on board are sunk', () => {
    expect(testGameBoard.isGameClear()).toBe(true);
})

