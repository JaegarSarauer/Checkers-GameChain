import { ReceiptItem } from '@cajarty/gamechain';
import main from '../../main';
import { Team } from '../game/GameState';

export default class DeclareWinnerReceiptItem extends ReceiptItem {
    winningTeam: Team;

    constructor(winningTeam: Team) {
        super('DECLARE_WINNER');
        this.winningTeam = winningTeam;
    }

    execute(): void {
        window.alert(`Team ${this.winningTeam} wins!`);
    }

    toSignatureData() {
        return {
            winningTeam: this.winningTeam,
            type: this.type,
        };
    }

    fromSignatureData(params: {[param: string]: any}) {
        const {winningTeam} = params;
        return new DeclareWinnerReceiptItem(winningTeam);
    }

    // getBuilder(): (params: {[param: string]: any}) => ReceiptItem {
    //     return ({winningTeam}) => {
    //         return new DeclareWinnerReceiptItem(winningTeam);
    //     };
    // }
}
