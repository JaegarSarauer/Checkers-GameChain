import { GameController, ValidatorController, LobbyController, Wallet } from '@cajarty/gamechain';
import PlayerController from './app/PlayerController';
import GameState from './app/game/GameState';
import { loadImages } from './app/game/loader/imageLoader';
import app from './app/game/Pixi';
import LobbyUI from './app/UI/LobbyUI';

class Main {
    playerController: PlayerController | null = null;
    lobbyController: LobbyController | null = null;

    //game: GameState | null = null;
    //gameController: GameController | undefined = undefined;
    validatorController: ValidatorController | null = null;
    constructor() {
        loadImages(app.loader, () => {
            this.createLobby();
        });
    }

    createLobby() {
        this.lobbyController = new LobbyController((lobby: LobbyController) => {
            return lobby.clients.length >= 2 ? 2 : -1;
        }, (actors: Wallet[]) => {
            return new GameState()
        })
        this.playerController = new PlayerController(this.lobbyController);
        this.playerController.onGameReadyCallbacks.push((gameController: GameController) => {
            this.validatorController = new ValidatorController(gameController.game.game, gameController.receipt);
        })
        const lobby = new LobbyUI();
    }

    createGame() {
        // if (this.gameController) {
        //     this.validatorController = new ValidatorController(this.gameController.game, this.gameController.receipt);
        // }
    }
}

const main = new Main();
export default main;
