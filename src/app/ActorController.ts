import { SignedActorController } from "@cajarty/gamechain";

export default class ActorController extends SignedActorController {
    canStartGame() {
        return this.getWalletsInLobby().length >= 2;
    }

    getWalletsForGame() {
        if (!this.canStartGame()) {
            return [];
        }

        const validWallets = this.getWalletsInLobby();
        return [validWallets[0], validWallets[1]];
    }
}