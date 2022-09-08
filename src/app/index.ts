import * as PIXI from "pixi.js";
import game from "./GameState";
import { loadImages } from "./loader/imageLoader";
import { Board } from "./objects/board";
import Sprite from './objects/Sprite';
import app from './Pixi';

loadImages(app.loader, () => {
  console.info(game)
  const board = new Board();
  app.ticker.add(() => {
  });
});
