import JoinLobbyButton from "./JoinLobbyButton";
import SignWalletButton from "./SignWalletButton";

export default class Lobby {
    playerQueue: number = 0;

    // UI Elements
    queueForGameButton: JoinLobbyButton | undefined;
    signWalletButton: SignWalletButton | undefined;

    constructor() {
        this.initQueueButton();
        this.initSignButton();
    }

    initQueueButton() {
        this.queueForGameButton = new JoinLobbyButton((button) => {
            if (++this.playerQueue >= 2) {
                button.toggleVisibility(false);
                console.info(this.signWalletButton)
                this.signWalletButton?.toggleVisibility(true);
            }
        });
    }

    initSignButton() {
        this.signWalletButton = new SignWalletButton((button) => {
            
        });
        this.signWalletButton.toggleVisibility(false);
    }
}
