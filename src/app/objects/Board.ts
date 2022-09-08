import app from "../Pixi";
import * as PIXI from "pixi.js";
import Sprite from "./Sprite";
import Piece from "./Piece";
import { Team } from "app/GameState";

export class Board {
  tilesWidth = 8;
  tilesHeight = 8;
  tileSizePixelSize = 64;
  bluePawns: Sprite[] = [];
  redPawns: Sprite[] = [];

  constructor() {
    app.renderer.view.width = this.tilesWidth * this.tileSizePixelSize;
    app.renderer.view.height = this.tilesHeight * this.tileSizePixelSize;

    this._createTiles();
    this._createPawns();
  }

  _createTiles() {
    for (let w = 0; w < this.tilesWidth; ++w) {
      for (let h = 0; h < this.tilesHeight; ++h) {
        const tileIdIndex = (w * this.tilesHeight) + (w % 2 == 0 ? h + 1: h);
        const tile = Sprite.create(tileIdIndex % 2 == 0 ? "blacktile" : "redtile");
        tile.x = w * this.tileSizePixelSize;
        tile.y = h * this.tileSizePixelSize;
        app.stage.addChild(tile);
      }
    }
  }

  _createPawns() {
    this._createPawnTeam('Red');
    this._createPawnTeam('Blue');
  }

  _createPawnTeam(team: Team) {
    const pawnStartCount = 12;
    const boardWidthPixel = this.tilesWidth * this.tileSizePixelSize;
    const boardHeightPixel = this.tilesWidth * this.tileSizePixelSize;
    const isTopTeam = team == 'Red';
    const offset = isTopTeam ? 1 : 0;
    for (let i = 0; i < pawnStartCount; ++i) {
      const pawn = new Piece(team);
      const distance = ((i * 2) + offset) * this.tileSizePixelSize;
      const row = Math.floor(distance / boardWidthPixel) + (!isTopTeam ? 5 : 0);
      pawn.sprite.x += distance % boardHeightPixel + (row % 2 == offset ? (isTopTeam ? -1 : 1) * this.tileSizePixelSize : 0);
      pawn.sprite.y += row * this.tileSizePixelSize;
      app.stage.addChild(pawn.sprite);
    }
  }
}
