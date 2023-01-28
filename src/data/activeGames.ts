import Game from "../Game/Game.ts";
import SessionData from "./SessionData.ts";

class ActiveGames extends SessionData<Game> {
  getItem(gameId: string) {
    const item = this.data.find((item) => item.gameId === gameId);
    return item ? item : null;
  }
  removeItem(gameId: string) {
    this.data = this.data.filter((item) => item.gameId !== gameId);
  }
}

export default ActiveGames;
