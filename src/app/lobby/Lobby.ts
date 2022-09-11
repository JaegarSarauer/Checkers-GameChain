import JoinLobbyButton from "./JoinLobbyButton";
import SignWalletButton from "./SignWalletButton";

export default class Lobby {
    playerQueue: number = 0;

    // UI Elements
    queueForGameButton: JoinLobbyButton | undefined;
    signWalletTeamRed: SignWalletButton | undefined;
    signWalletTeamBlue: SignWalletButton | undefined;
    queueSizeText: any;

    constructor() {
        this.initQueueButton();
        this.initSignButtons();
    }

    changeQueue(queueChange: number) {
        this.playerQueue += queueChange;
        
    }

    initQueueButton() {
        this.queueForGameButton = new JoinLobbyButton((button) => {
            if (++this.playerQueue >= 2) {
                button.toggleVisibility(false);
                this.signWalletTeamRed?.toggleVisibility(true);
                this.signWalletTeamBlue?.toggleVisibility(true);
            }
        });
    }

    initSignButtons() {
        this.signWalletTeamRed = new SignWalletButton('Red', (button) => {
            
        });
        this.signWalletTeamRed.toggleVisibility(false);
        this.signWalletTeamBlue = new SignWalletButton('Blue', (button) => {
            
        });
        this.signWalletTeamBlue.toggleVisibility(false);
    }
}
