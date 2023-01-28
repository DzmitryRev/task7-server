import { MarkerType } from "../Game/GameModels";

class Player {
  name: string;
  marker: MarkerType;
  isOnline: boolean;

  constructor(name: string, marker: MarkerType, isOnline: boolean) {
    this.name = name;
    this.marker = marker;
    this.isOnline = isOnline;
  }
}

export default Player;
