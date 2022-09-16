import { ReceiptItem } from '@cajarty/gamechain';
import main from '../../main';
import { Team } from '../game/GameState';

export default class DeclareWinnerReceiptItem implements ReceiptItem {
    type: string = 'DECLARE_WINNER';
    winningTeam: Team;

    constructor(winningTeam: Team) {
        this.winningTeam = winningTeam;
    }

    execute(): void {
        window.alert(`Team ${this.winningTeam} wins!`);
    }

    getBuilder() {
        return (winningTeam: Team) => {
            return new DeclareWinnerReceiptItem(winningTeam);
        };
    }
}
