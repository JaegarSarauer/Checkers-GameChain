import { Controller, ReceiptItem } from '@cajarty/gamechain';
import main from '../../main';
import GameState from '../game/GameState';

export default class MoveReceiptItem extends ReceiptItem {
    pieceId: number;
    newX: number;
    newY: number;

    constructor(pieceId: number, newX: number, newY: number) {
        super('MOVE');
        this.pieceId = pieceId;
        this.newX = newX;
        this.newY = newY;
    }

    execute(controller: Controller): void {
        // TODO fix access
        const game = controller.game.game as GameState;
        const piece = game.board?.getPieceById(this.pieceId);
        console.info('maino', game, piece)
        // TODO check can move here
        if (piece) {
            piece.sprite.x = this.newX;
            piece.sprite.y = this.newY;
        }
    }

    toSignatureData() {
        return {
            pieceId: this.pieceId,
            newX: this.newX,
            newY: this.newY,
            type: this.type,
        };
    }

    fromSignatureData(params: {[param: string]: any}) {
        const {pieceId, newX, newY} = params;
        return new MoveReceiptItem(pieceId, newX, newY);
    }
}
