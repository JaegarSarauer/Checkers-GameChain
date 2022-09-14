import { GameController, ValidatorController } from '@cajarty/gamechain';
import ActorController from './app/ActorController';
import GameState from './app/game/GameState';
import { loadImages } from './app/game/loader/imageLoader';
import app from './app/game/Pixi';
import LobbyUI from './app/UI/LobbyUI';

class Main {
    actorController: ActorController | null = null;

    game: GameState | null = null;
    gameController: GameController | null = null;
    validatorController: ValidatorController | null = null;
    constructor() {
        loadImages(app.loader, () => {
            this.actorController = new ActorController();

            const lobby = new LobbyUI();
        });
    }

    createGame() {
        const wallets = this.actorController!.getWalletsForGame();
        this.game = new GameState(wallets[0], wallets[1]);
        this.gameController = new GameController(this.game);
        this.validatorController = new ValidatorController(this.gameController.game, this.gameController.receipt);
        // TODO this has to be after game controller to create a receipt item for init. This needs to be fixed by figuring out where to put controller.
        this.game.initialize();
    }
}

const main = new Main();
export default main;
