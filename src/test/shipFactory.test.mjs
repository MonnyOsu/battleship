import { shipFactory } from "../shipFactory";

const fleet = shipFactory();

test("does shipFactory contain a battlship", () => {
  expect(fleet).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        name: "Battleship",
      }),
    ])
  );
});

test("does calling hit push to hitmarks 1 ", () => {
  fleet[0].hit("a1");
  fleet[0].hit("a2");
  fleet[0].hit("a3");
  fleet[0].hit("a4");
  fleet[0].hit("a5");
  expect(fleet[0].hitPoints).toEqual(0);
});

test("does isSunk return true when hitpoints are reached", () => {
  //   fleet[0].hit("a1");
  //   fleet[0].hit("a2");
  //   fleet[0].hit("a3");
  //   fleet[0].hit("a4");
  //   fleet[0].hit("a5");
  fleet[0].isSunk();

  expect(fleet[0].isSunk()).toEqual(true);
});

test("does calling hit push to hitmarks 2", () => {
  fleet[1].hit("a1");
  fleet[1].hit("a2");
  fleet[1].hit("a3");
  fleet[1].hit("a4");
  expect(fleet[1].hitPoints).toEqual(0);
});

test("does isSunk update the sunk boolean when hitmarks = length 2", () => {
  //   fleet[1].hit("a1");
  //   fleet[1].hit("a2");
  //   fleet[1].hit("a3");
  //   fleet[1].hit("a4");
  fleet[1].isSunk();

  expect(fleet[1].isSunk()).toEqual(true);
});
