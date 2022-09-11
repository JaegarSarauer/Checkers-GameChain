import GameState from './app/game/GameState';
import { loadImages } from './app/game/loader/imageLoader';
import app from './app/game/Pixi';
import Lobby from './app/lobby/Lobby';

class Main {
    game: GameState | null = null;
    constructor() {
        loadImages(app.loader, () => {
            //const web3 = new Web3(Web3.givenProvider);

            // TODO create and destroy w/ lobby
            this.game = new GameState();
            const lobby = new Lobby();
            //console.info(web3)
            //console.info(window?.web3);
            //console.info(game);
            app.ticker.add(() => {});
        });
    }
}

const main = new Main();
export default main;
