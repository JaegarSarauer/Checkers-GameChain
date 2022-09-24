import { GameController, iWeb3, Receipt, SignedSignature, ValidatorController, WriteWallet } from "@cajarty/gamechain";
import main from "../../main";
import GameState from "../game/GameState";
import MetamaskWriteWallet from "../game/objects/MetamaskWriteWallet";
import JoinLobbyButton from "./components/JoinLobbyButton";
import LoadReceiptButton from "./components/LoadReceiptButton";
import ValidateButton from "./components/ValidateButton";

export default class LobbyUI {
    playerQueue: number = 0;

    // UI Elements
    queueAsSignedActorButton: JoinLobbyButton | undefined;
    queueAsOwnerButton: JoinLobbyButton | undefined;
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
        this.queueAsSignedActorButton = new JoinLobbyButton('Queue as Signed Actor', (button) => {
            // todo connect with metamask
            const wallet = new WriteWallet(iWeb3.createWallet())
            //const wallet = new MetamaskWriteWallet()
            console.info('new wallet', wallet.getAddress())
            main.playerController?.queueAsSignedActor(wallet);
        });
        this.queueAsOwnerButton = new JoinLobbyButton('Queue as Owner', (button) => {
            // todo connect with metamask
            const wallet = new WriteWallet(iWeb3.createWallet())
            //const wallet = new MetamaskWriteWallet()
            console.info('new wallet', wallet.getAddress())
            main.playerController?.queueAsOwner(wallet);
        });
    }

    initSignButtons() {
        main.playerController?.onGameReadyCallbacks.push((gameController: GameController) => {
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
