import game, { Team } from "./GameState";

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