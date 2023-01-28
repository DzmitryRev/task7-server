import Player from "../Player/Player";
import { GameBoardStateType, MarkerType } from "./GameModels";

class Game {
  gameId: string;
  playerOne: Player;
  playerTwo: Player | null;
  gameBoardState: GameBoardStateType;
  move: MarkerType;
  result: MarkerType | null;

  constructor(
    gameId: string,
    playerOne: Player,
    opponent: Player | null,
    move: MarkerType,
    result: MarkerType | null
  ) {
    this.gameId = gameId;
    this.playerOne = playerOne;
    this.playerTwo = opponent;
    this.move = move;
    this.result = result;
    this.gameBoardState = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  }
}

export default Game;
