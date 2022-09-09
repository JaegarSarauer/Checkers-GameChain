import { loadImages } from "./app/game/loader/imageLoader";
import { Board } from "./app/game/objects/board";
import app from "./app/game/Pixi";
import Lobby from "./app/lobby/Lobby";
import Web3 from 'web3';

const lobby = new Lobby();

loadImages(app.loader, () => {

    const web3 = new Web3();
    
    console.info(web3)
    //console.info(game);
    const board = new Board();
    app.ticker.add(() => {});
});
