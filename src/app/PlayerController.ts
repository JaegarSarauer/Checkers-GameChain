import { ActorController, LobbyController } from '@cajarty/gamechain';

export default class PlayerController extends ActorController {
    constructor(lobbyController: LobbyController) {
        super(lobbyController);
    }

    canStartGame() {
        //return this.getWalletsInLobby().length >= 2;
    }

    getWalletsForGame() {
        // if (!this.canStartGame()) {
        //     return [];
        // }
        // const validWallets = this.getWalletsInLobby();
        // return [validWallets[0], validWallets[1]];
    }
}
