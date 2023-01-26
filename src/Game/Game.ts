import Player from "../Player/Player";

class Game {
  owner: Player;
  opponent: Player | null;
  move: "owner" | "opponent";
  result: "owner" | "opponent" | null;

  constructor(
    onwer: Player,
    opponent: Player | null,
    move: "owner" | "opponent",
    result: "owner" | "opponent" | null
  ) {
    this.owner = onwer;
    this.opponent = opponent;
    this.move = move;
    this.result = result;
  }
}

export default Game;
