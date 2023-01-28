import { GameBoardStateType } from "./GameModels";

export const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const checkWinner = (gameBoardState: GameBoardStateType) => {
  const cells = gameBoardState.flat(1);
  for (let comb of winCombinations) {
    if (
      cells[comb[0]] == cells[comb[1]] &&
      cells[comb[1]] == cells[comb[2]] &&
      cells[comb[0]] !== ""
    ) {
      return true;
    }
  }
  return false;
};
