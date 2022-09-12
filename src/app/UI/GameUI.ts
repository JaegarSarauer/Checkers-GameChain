import { Receipt } from "@cajarty/gamechain";
import game, { Team } from "../game/GameState";

export default class GameUI {
    currentTurnText: any;
    receiptLogText: any;
    constructor() {
        this.currentTurnText = document.createElement('p');
        this.currentTurnText.innerText = '';
        document.body.appendChild(this.currentTurnText);


        this.receiptLogText = document.createElement('p');
        this.receiptLogText.innerText = '';
        document.body.appendChild(this.receiptLogText);
    }

    setReceiptLogs(receipt: Receipt) {
        this.receiptLogText.innerText = JSON.stringify(receipt);
    }

    setCurrentTurn(team: Team) {
        this.currentTurnText.innerText = `Current turn: ${team}`;
    }
}