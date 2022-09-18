import { ReceiptItem, ReadWallet, Wallet } from "@cajarty/gamechain";
import main from "../../main";
import GameState, { Team } from "../game/GameState";

export default class AssignTeamsReceiptItem implements ReceiptItem {
    type: string = 'ASSIGN_TEAMS';
    teamRed: Wallet;
    teamBlue: Wallet;

    constructor(teamRed: Wallet, teamBlue: Wallet) {
        this.teamRed = teamRed;
        this.teamBlue = teamBlue;
    }

    execute(): void {
        // TODO fix access
        const game = main?.playerController?.gameController?.game.game as GameState;
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

    // getBuilder(): (params: {[param: string]: any}) => ReceiptItem {
    //     return ({teamRedAddress, teamBlueAddress}) => {
    //         return new AssignTeamsReceiptItem(teamRedAddress, teamBlueAddress)
    //     }
    // }
}
