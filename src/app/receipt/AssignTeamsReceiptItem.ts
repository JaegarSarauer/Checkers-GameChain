import { ReceiptItem, ReadWallet, Wallet, Controller } from "@cajarty/gamechain";
import main from "../../main";
import GameState, { Team } from "../game/GameState";

export default class AssignTeamsReceiptItem extends ReceiptItem {
    teamRed: Wallet;
    teamBlue: Wallet;

    constructor(teamRed: Wallet, teamBlue: Wallet) {
        super('ASSIGN_TEAMS');
        this.teamRed = teamRed;
        this.teamBlue = teamBlue;
    }

    execute(controller: Controller): void {
        const game = controller.game.game as GameState;
        game.redTeamWallet = this.teamRed;
        game.blueTeamWallet = this.teamBlue;
    }

    toSignatureData() {
        return {
            teamRedAddress: this.teamRed,
            teamBlueAddress: this.teamBlue,
            type: this.type,
        };
    }

    fromSignatureData(params: {[param: string]: any}) {
        const {teamRed, teamBlue} = params;
        return new AssignTeamsReceiptItem(new ReadWallet(teamRed), new ReadWallet(teamBlue));
    }
}
