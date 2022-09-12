import { ValidatorController } from '@cajarty/gamechain';
import GameState from './app/game/GameState';
import { loadImages } from './app/game/loader/imageLoader';
import app from './app/game/Pixi';
import LobbyUI from './app/UI/LobbyUI';

class Main {
    game: GameState | null = null;
    validator: ValidatorController;
    constructor() {
        loadImages(app.loader, () => {
            //const web3 = new Web3(Web3.givenProvider);

            // TODO create and destroy w/ lobby
            this.game = new GameState();
            this.validator = new ValidatorController(this.game, this.game.gameController.receipt);
            const lobby = new LobbyUI();
            //console.info(web3)
            //console.info(window?.web3);
            //console.info(game);
            app.ticker.add(() => {});
        });
    }
}

const main = new Main();
export default main;
