import { Receipt } from "@cajarty/gamechain";
import main from "../../main";
import game, { Team } from "../game/GameState";
import LoadReceiptButton from "./components/LoadReceiptButton";

export default class GameUI {
    currentTurnText: any;

    constructor() {
        this.currentTurnText = document.createElement('p');
        this.currentTurnText.innerText = '';
        document.body.appendChild(this.currentTurnText);
    }

    setCurrentTurn(team: Team) {
        this.currentTurnText.innerText = `Current turn: ${team}`;
    }
}