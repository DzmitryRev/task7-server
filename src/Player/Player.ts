class Player {
  name: string;
  marker: "X" | "O";
  isOnline: boolean;

  constructor(name: string, marker: "X" | "O", isOnline: boolean) {
    this.name = name;
    this.marker = marker;
    this.isOnline = isOnline;
  }
}

export default Player;
