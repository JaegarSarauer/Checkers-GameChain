import game, { Team } from "../GameState";
import * as PIXI from "pixi.js";
import app from "../Pixi";
import Sprite from "./Sprite";
import main from "../../../main";

export default class Piece {
  id: number;
  sprite: Sprite;
  team: Team;

  constructor(id: number, team: Team) {
    this.id = id;
    this.team = team;
    this.sprite = Sprite.create(team == "Red" ? "redpawn" : "bluepawn");

    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    this.sprite.x += this.sprite.texture.width / 2;
    this.sprite.y += this.sprite.texture.height / 2;
    this.sprite.interactive = true;
    this.sprite.cursor = "pointer";

    this.sprite.on("pointerdown", () => {
      main.game?.selectPiece(this);
    });

    this.sprite.on("pointerup", () => {
      main.game?.dropPiece();
    });
  }
}
