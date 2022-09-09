import * as PIXI from "pixi.js";

const BaseImagePath = "./";
const Images = [
  { name: "bluepawn", url: BaseImagePath + "blue_piece.png" },
  { name: "redpawn", url: BaseImagePath + "red_piece.png" },
  { name: "blueking", url: BaseImagePath + "blue_king_piece.png" },
  { name: "redking", url: BaseImagePath + "red_king_piece.png" },
  { name: "redtile", url: BaseImagePath + "red_tile.png" },
  { name: "blacktile", url: BaseImagePath + "black_tile.png" },
];

export const loadImages = (loader: PIXI.Loader, callback: () => void) => {
  Images.forEach((image: any) => {
    loader.add(image.name, image.url);
  });
  loader.load().onComplete.once(callback);
};

//export type Textures = typeof Images extends ({name: infer U})[] ? U : never;
// const textureNames = Images.forEach((texture: any) => texture.name);
// export type Textures = typeof textureNames as const;
