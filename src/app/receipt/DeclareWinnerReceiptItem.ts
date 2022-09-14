import { ReceiptItem, Wallet, SignedSignature } from "@cajarty/gamechain";
import main from "../../main";
import { Team } from "../game/GameState";

export default class DeclareWinnerReceiptItem implements ReceiptItem {
    signature: SignedSignature | undefined;
    winningTeam: Team;
    constructor(winningTeam: Team) {
        this.winningTeam = winningTeam;
    }

    execute(): void {
        window.alert(`Team ${this.winningTeam} wins!`);
    }
}