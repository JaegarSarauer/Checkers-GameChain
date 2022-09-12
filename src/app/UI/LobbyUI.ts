import main from "../../main";
import JoinLobbyButton from "./components/JoinLobbyButton";
import SignWalletButton from "./components/SignWalletButton";
import ValidateButton from "./components/ValidateButton";

export default class LobbyUI {
    playerQueue: number = 0;

    // UI Elements
    queueForGameButton: JoinLobbyButton | undefined;
    signWalletTeamRed: SignWalletButton | undefined;
    signWalletTeamBlue: SignWalletButton | undefined;
    replayButton: ValidateButton | undefined;
    queueSizeText: any;

    constructor() {
        this.initQueueButton();
        this.initSignButtons();
        this.initReplayButton();
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

    initReplayButton() {
        this.replayButton = new ValidateButton((button) => {
            main.validator.replay();
        });
    }
}
