//import * as PIXI from 'pixi.js';
import Piece from './objects/Piece';
import app from './Pixi';
import { GameController, ReceiptItem, Wallet } from '@cajarty/gamechain';
import GameUI from './GameUI';
import { Board } from './objects/board';
import MoveReceiptItem from '../receipt/MoveReceiptItem';

export type Team = 'Red' | 'Blue';

export default class GameState {
    currentTurn: Team = 'Red';
    currentSelection: Piece | null;

    redTeamWallet: Wallet | undefined;
    blueTeamWallet: Wallet | undefined;

    gameUI: GameUI;
    board: Board;

    gameController: GameController;

    constructor() {
        this.currentSelection = null;
        this.gameUI = new GameUI();
        this.gameUI.setCurrentTurn(this.currentTurn);

        this.board = new Board();

        this.gameController = new GameController(this);

        app.ticker.add(() => {
            if (this.currentSelection) {
                this.currentSelection.sprite.x = app.renderer.plugins.interaction.mouse.global.x;
                this.currentSelection.sprite.y = app.renderer.plugins.interaction.mouse.global.y;
            }
        });
    }

    initialize() {}

    update(item: ReceiptItem) {
        item.execute();
    }

    finalize() {}

    checkWinCondition(): Team | null {
        let blueWin = true;
        let redWin = true;
        this.board.pawns.forEach((pawn: Piece) => {
            if (pawn.sprite.y > 100) {
                if (pawn.team == 'Red') {
                    redWin = false;
                } else {
                    blueWin = false;
                }
            }
        });
        return blueWin ? 'Blue' : redWin ? 'Red' : null;
    }

    changeTurn() {
        this.currentTurn = this.currentTurn == 'Red' ? 'Blue' : 'Red';
        this.gameUI.setCurrentTurn(this.currentTurn);
    }

    selectPiece(piece: Piece) {
        if (this.currentTurn == piece.team && this.currentSelection == null) {
            this.currentSelection = piece;
        }
    }

    dropPiece() {
        if (this.currentSelection) {
            this.gameController.update(
                new MoveReceiptItem(
                    this.currentSelection.id,
                    this.currentSelection.sprite.x,
                    this.currentSelection.sprite.y
                )
            , false);
            this.currentSelection = null;
            const winner = this.checkWinCondition();
            if (winner) {
            }
            this.changeTurn();
        }
    }
}
