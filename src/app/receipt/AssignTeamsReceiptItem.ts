import { ReceiptItem } from "@cajarty/gamechain";
import main from "../../main";
import { Team } from "../game/GameState";

export default class AssignTeamsReceiptItem implements ReceiptItem {
    type: string = 'ASSIGN_TEAMS';
    teamRedAddress: string;
    teamBlueAddress: string;

    constructor(teamRedAddress: string, teamBlueAddress: string) {
        this.teamRedAddress = teamRedAddress;
        this.teamBlueAddress = teamBlueAddress;
    }

    execute(): void {
        //const piece = main.game?.
    }

    getBuilder() {
        return (teamRedAddress: string, teamBlueAddress: string) => {
            return new AssignTeamsReceiptItem(teamRedAddress, teamBlueAddress)
        }
    }
}