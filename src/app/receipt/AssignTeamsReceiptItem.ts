import { ReceiptItem, Wallet, SignedSignature } from "@cajarty/gamechain";
import main from "../../main";
import { Team } from "../game/GameState";

export default class AssignTeamsReceiptItem implements ReceiptItem {
    signature: SignedSignature | undefined;
    teamRedAddress: string;
    teamBlueAddress: string;
    constructor(teamRedAddress: string, teamBlueAddress: string) {
        this.teamRedAddress = teamRedAddress;
        this.teamBlueAddress = teamBlueAddress;
    }

    execute(): void {
        //const piece = main.game?.
    }
}