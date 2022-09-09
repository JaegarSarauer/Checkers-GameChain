import { loadImages } from "./app/game/loader/imageLoader";
import { Board } from "./app/game/objects/board";
import app from "./app/game/Pixi";

const queueForGameButton = document.createElement('button');
document.body.appendChild(queueForGameButton);

loadImages(app.loader, () => {
    //console.info(game);
    const board = new Board();
    app.ticker.add(() => {});
});
