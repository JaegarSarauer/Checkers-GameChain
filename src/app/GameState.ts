import * as PIXI from "pixi.js";
import Piece from "./objects/Piece";
import app from "./Pixi";

export type Team = "Red" | "Blue";

class GameState {
  currentTurn: Team = "Red";
  currentSelection: Piece | null;
  constructor() {
    this.currentSelection = null;

    app.ticker.add(() => {
        if (this.currentSelection) {
            this.currentSelection.sprite.x = app.renderer.plugins.interaction.mouse.global.x;
            this.currentSelection.sprite.y = app.renderer.plugins.interaction.mouse.global.y;
        }
    });
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
