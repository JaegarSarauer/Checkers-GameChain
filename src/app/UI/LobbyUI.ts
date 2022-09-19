import { GameController, iWeb3, Receipt, SignedSignature, ValidatorController, WriteWallet } from "@cajarty/gamechain";
import main from "../../main";
import GameState from "../game/GameState";
import JoinLobbyButton from "./components/JoinLobbyButton";
import LoadReceiptButton from "./components/LoadReceiptButton";
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
    receiptLogText: any;
    loadReceiptButton: any;

    constructor() {
        this.initQueueButton();
        this.initSignButtons();
        this.initReplayButton();
        this.initReceipt();
    }

    setReceiptLogs(receipt: SignedSignature) {
        this.receiptLogText.value = JSON.stringify(receipt);
    }

    initReceipt() {
        this.receiptLogText = document.createElement('input');
        this.receiptLogText.style.width = '98%';
        this.receiptLogText.style.wordBreak = 'break-word';
        document.body.appendChild(this.receiptLogText);

        this.loadReceiptButton = new LoadReceiptButton((button: LoadReceiptButton) => {
            const receipt = new Receipt();
            receipt.signature = JSON.parse(this.receiptLogText.value) as SignedSignature;

            main.validatorController = new ValidatorController(new GameState(), receipt);
        })
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
            // TODO this is cleanup from gameController.
            main.validatorController!.receipt.validActors = [];
            main.validatorController?.replay();
        });
    }
}
