import { loadImages } from "./app/game/loader/imageLoader";
import { Board } from "./app/game/objects/board";
import app from "./app/game/Pixi";
import Lobby from "./app/lobby/Lobby";

const lobby = new Lobby();

loadImages(app.loader, () => {
    //console.info(game);
    const board = new Board();
    app.ticker.add(() => {});
});
