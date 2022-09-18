//import * as PIXI from 'pixi.js';
import Piece from './objects/Piece';
import app from './Pixi';
import {
    Controller,
    GameController,
    GameInterface,
    IPFSNode,
    ReadWallet,
    ReceiptItem,
    Wallet,
    WriteWallet,
} from '@cajarty/gamechain';
import GameUI from '../UI/GameUI';
import { Board } from './objects/board';
import MoveReceiptItem from '../receipt/MoveReceiptItem';
import AssignTeamsReceiptItem from '../receipt/AssignTeamsReceiptItem';
import DeclareWinnerReceiptItem from '../receipt/DeclareWinnerReceiptItem';

export type Team = 'Red' | 'Blue';

export default class GameState implements GameInterface {
    currentTurn: Team = 'Red';
    currentSelection: Piece | null;

    redTeamWallet: Wallet | undefined;
    blueTeamWallet: Wallet | undefined;

    gameUI: GameUI;
    board: Board | undefined;

    controller: Controller | undefined;

    constructor() {
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

    initialize(controller: Controller) {
        this.controller = controller;
        this.board = new Board();
    }

    update(item: ReceiptItem, result: unknown): void {
        if (item.type == 'ASSIGN_WALLET') {
            if (!this.redTeamWallet) {
                this.redTeamWallet = item.actor;
            } else if (!this.blueTeamWallet) {
                this.blueTeamWallet = item.actor;
                // if (this.redTeamWallet && this.blueTeamWallet) {
                //     this.controller.update(
                //         this.redTeamWallet,
                //         new AssignTeamsReceiptItem(this.redTeamWallet, this.blueTeamWallet)
                //     );
                // }
            } else {
                // TODO handle errors.
            }
        }

        this.gameUI.setReceiptLogs(this.controller!.receipt);
    }

    finalize() {
        const winner = this.checkWinCondition();
        const wallet = winner == 'Red' ? this.redTeamWallet : this.blueTeamWallet;
        if (winner && wallet) {
            this.controller!.update(wallet, new DeclareWinnerReceiptItem(winner));
            IPFSNode.uploadReceipt(this.controller!.receipt);
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
        const wallet =
            this.currentSelection?.team == 'Red' ? this.redTeamWallet : this.blueTeamWallet;
        if (this.currentSelection && wallet) {
            this.controller!.update(
                wallet,
                new MoveReceiptItem(
                    this.currentSelection.id,
                    this.currentSelection.sprite.x,
                    this.currentSelection.sprite.y
                )
            );
            this.currentSelection = null;
            this.finalize(); // TODO should call only on finalize
            this.changeTurn();
        }
    }
}
