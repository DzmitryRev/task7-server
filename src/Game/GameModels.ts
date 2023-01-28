export type MarkerType = "X" | "O";

type GameBoardCellType = MarkerType | "";

type GameBoardRowType = [GameBoardCellType, GameBoardCellType, GameBoardCellType];

export type GameBoardStateType = [GameBoardRowType, GameBoardRowType, GameBoardRowType];

export type GameNextMoveType = {
  cellIndex: { row: number; pos: number };
  marker: MarkerType;
  name: string;
};
