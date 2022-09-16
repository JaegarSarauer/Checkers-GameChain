import { GameController, iWeb3, WriteWallet } from "@cajarty/gamechain";
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

    initQueueButton() {
        this.queueForGameButton = new JoinLobbyButton((button) => {
            // todo connect with metamask
            const wallet = new WriteWallet(iWeb3.createWallet())
            main.playerController?.queueAsSignedActor(wallet);
        });
    }

    initSignButtons() {
        this.signWalletTeamRed = new SignWalletButton('Red', (button) => {
            
        });
        this.signWalletTeamRed.toggleVisibility(false);
        this.signWalletTeamBlue = new SignWalletButton('Blue', (button) => {
            
        });
        this.signWalletTeamBlue.toggleVisibility(false);
        main.playerController?.onGameReadyCallbacks.push((gameController: GameController) => {
            this.queueForGameButton?.toggleVisibility(false);
            this.signWalletTeamRed?.toggleVisibility(true);
            this.signWalletTeamBlue?.toggleVisibility(true);
        })
    }

    initReplayButton() {
        this.replayButton = new ValidateButton((button) => {
            main.validatorController?.replay();
        });
    }
}
