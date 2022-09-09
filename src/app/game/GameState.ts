//import * as PIXI from 'pixi.js';
import Piece from './objects/Piece';
import app from './Pixi';
import { GameInterface } from '@cajarty/gamechain';

export type Team = 'Red' | 'Blue';

class GameState extends GameInterface {
    currentTurn: Team = 'Red';
    currentSelection: Piece | null;
    constructor() {
        super();
        this.currentSelection = null;

        app.ticker.add(() => {
            if (this.currentSelection) {
                this.currentSelection.sprite.x = app.renderer.plugins.interaction.mouse.global.x;
                this.currentSelection.sprite.y = app.renderer.plugins.interaction.mouse.global.y;
            }
        });
    }

    initialize() {

    }

    update() {

    }

    finalize() {
      
    }

    selectPiece(piece: Piece) {
        if (this.currentTurn == piece.team && this.currentSelection == null) {
            this.currentSelection = piece;
        }
    }

    dropPiece() {
        if (this.currentSelection) {
            // make move
            this.currentSelection = null;
        }
    }
}

const game = new GameState();
export default game;
