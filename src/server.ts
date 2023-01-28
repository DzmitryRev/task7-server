import express, { Express } from "express";
import { Server } from "socket.io";
import http from "http";
import Player from "./Player/Player";
import Game from "./Game/Game";
import UsersOnline from "./data/usersOnline";
import ActiveGames from "./data/activeGames";
import { exceptions } from "./Excepsions/excepsions.ts";
import { checkWinner } from "./Game/GameLogic";
import { GameNextMoveType, MarkerType } from "./Game/GameModels";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.use(express.json());

const usersOnline = new UsersOnline();
const activeGames = new ActiveGames();

io.use((socket, next) => {
  const username = <string>socket.handshake.auth.username;
  if (!username || usersOnline.getAll().includes(username)) {
    next(new Error(exceptions.UserAlreadyOnline));
  } else {
    (socket as any).username = username;
    next();
  }
});

io.on("connection", (socket) => {
  const user = <string>socket.handshake.auth.username;

  const joinToGame = (gameId: string) => {
    socket.join(gameId);
  };

  const callException = (message: string) => {
    socket.emit("exception", message);
  };

  const callConnectToGame = (gameId: string, game: Game) => {
    socket.emit("connect to game", game);
    socket.to(gameId).emit("game action", game);
  };

  usersOnline.setItem(user);
  socket.emit("login");

  socket.on("user active game", () => {
    const userGame = activeGames
      .getAll()
      .find((game) => game.playerOne.name === user || game.playerTwo?.name === user);
    socket.emit("user active game", userGame?.gameId || "");
  });

  socket.on("connect to game", (gameId: string) => {
    const availdableUsersGames = activeGames
      .getAll()
      .find((item) => item.playerOne.name === user || item.playerTwo?.name === user);
    if (availdableUsersGames && gameId !== availdableUsersGames.gameId) {
      callException(exceptions.YouAlredyInGame);
    } else {
      const game = activeGames.getItem(gameId);
      if (game) {
        if (game.playerOne.name === user) {
          joinToGame(gameId);
          callConnectToGame(gameId, game);
        } else if (!game.playerTwo) {
          game.playerTwo = new Player(user, "O", true);
          joinToGame(gameId);
          callConnectToGame(gameId, game);
        } else if (game.playerTwo.name === user) {
          joinToGame(gameId);
          callConnectToGame(gameId, game);
        } else {
          callException(exceptions.HaveNotAcessToGame);
        }
      } else {
        activeGames.setItem(new Game(gameId, new Player(user, "X", true), null, "X", null));
        joinToGame(gameId);
        callConnectToGame(gameId, activeGames.getItem(gameId) as Game);
      }
    }
  });

  socket.on("reset game", (gameId: string) => {
    let game = activeGames.getItem(gameId);
    if (!game) {
      callException(exceptions.GameDoesNotExist);
    } else {
      game.gameBoardState = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ];
      game.move = "X";
      game.result = null;
      socket.emit("game action", game);
      socket.to(gameId).emit("game action", game);
    }
  });

  socket.on("game action", ({ gameId, move }: { gameId: string; move: GameNextMoveType }) => {
    let game = activeGames.getItem(gameId);
    if (!game) {
      callException(exceptions.GameDoesNotExist);
    } else {
      game.playerOne.isOnline = !!usersOnline.getItem(game.playerOne.name);
      if (game.playerTwo) {
        game.playerTwo.isOnline = !!usersOnline.getItem(game.playerTwo.name);
      }

      let nextMove: MarkerType = game.move === "X" ? "O" : "X";

      if (game.move === move.marker) {
        if (!game.gameBoardState[move.cellIndex.row][move.cellIndex.pos]) {
          game.gameBoardState[move.cellIndex.row][move.cellIndex.pos] = move.marker;
          game.move = nextMove;
        }
      }

      const hasWinner = checkWinner(game.gameBoardState);

      if (hasWinner) {
        game.result = game.move === "X" ? "O" : "X";
      }

      socket.emit("game action", game);
      socket.to(gameId).emit("game action", game);
    }
  });

  socket.on("destroy game", (gameId: string) => {
    let game = activeGames.getItem(gameId);
    if (!game) {
      callException(exceptions.GameDoesNotExist);
    } else {
      activeGames.removeItem(gameId);
      socket.emit("destroy game");
      socket.to(gameId).emit("destroy game");
    }
  });

  socket.on("disconnect", (a) => {
    usersOnline.removeItem(user);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
