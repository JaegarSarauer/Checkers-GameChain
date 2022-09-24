import { ActorController, LobbyController } from '@cajarty/gamechain';

export default class PlayerController extends ActorController {
    constructor(lobbyController: LobbyController) {
        super(lobbyController);
    }
}
