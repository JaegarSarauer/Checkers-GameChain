//import * as PIXI from 'pixi.js';
import Piece from './objects/Piece';
import app from './Pixi';
import { GameController, GameInterface, IPFSNode, ReceiptItem, Wallet } from '@cajarty/gamechain';
import GameUI from '../UI/GameUI';
import { Board } from './objects/board';
import MoveReceiptItem from '../receipt/MoveReceiptItem';
import main from '../../main';
import AssignTeamsReceiptItem from '../receipt/AssignTeamsReceiptItem';
import DeclareWinnerReceiptItem from '../receipt/DeclareWinnerReceiptItem';

export type Team = 'Red' | 'Blue';

export default class GameState implements GameInterface {
    currentTurn: Team = 'Red';
    currentSelection: Piece | null;

    redTeamWallet: Wallet;
    blueTeamWallet: Wallet;

    gameUI: GameUI;
    board: Board | undefined;

    constructor(redTeamWallet: Wallet, blueTeamWallet: Wallet) {
        this.redTeamWallet = redTeamWallet;
        this.blueTeamWallet = blueTeamWallet;

        this.currentSelection = null;
        this.gameUI = new GameUI();
        this.gameUI.setCurrentTurn(this.currentTurn);

        app.ticker.add(() => {
            if (this.currentSelection) {
                this.currentSelection.sprite.x = app.renderer.plugins.interaction.mouse.global.x;
                this.currentSelection.sprite.y = app.renderer.plugins.interaction.mouse.global.y;
            }
        });
    }

    update(item: ReceiptItem, result: unknown): void {
        // fix access
        if (main.gameController) this.gameUI.setReceiptLogs(main.gameController.receipt);
    }

    initialize() {
        this.board = new Board();
        // TODO this should probably be all wallets?
        main.gameController?.update(
            this.redTeamWallet,
            new AssignTeamsReceiptItem(
                this.redTeamWallet?.getAddress(),
                this.blueTeamWallet?.getAddress()
            )
        );
    }

    finalize() {
        const winner = this.checkWinCondition();
        if (winner) {
            const wallet = winner == 'Red' ? this.redTeamWallet : this.blueTeamWallet;
            main.gameController?.update(wallet, new DeclareWinnerReceiptItem(winner));
            IPFSNode.uploadReceipt(main.gameController!.receipt);
        }
    }

    checkWinCondition(): Team | null {
        let blueWin = true;
        let redWin = true;
        this.board?.pawns.forEach((pawn: Piece) => {
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
            const wallet =
                this.currentSelection.team == 'Red' ? this.redTeamWallet : this.blueTeamWallet;
            main.gameController?.update(
                wallet,
                new MoveReceiptItem(
                    this.currentSelection.id,
                    this.currentSelection.sprite.x,
                    this.currentSelection.sprite.y
                )
            );
            this.currentSelection = null;
            this.finalize();
            this.changeTurn();
        }
    }
}
