import { ReceiptItem, SignedSignature } from "@cajarty/gamechain";
import main from "../../main";

export default class MoveReceiptItem implements ReceiptItem {
    signature: SignedSignature | undefined;
    pieceId: number;
    newX: number;
    newY: number;
    constructor(pieceId: number, newX: number, newY: number) {
        this.pieceId = pieceId;
        this.newX = newX;
        this.newY = newY;
    }

    execute(): void {
        const piece = main.game?.board?.getPieceById(this.pieceId);
        if (piece) {
            piece.sprite.x = this.newX;
            piece.sprite.y = this.newY;
        }
    }
}