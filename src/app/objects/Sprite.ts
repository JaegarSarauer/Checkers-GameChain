import * as PIXI from 'pixi.js'
import app from '../Pixi';

export default class Sprite extends PIXI.Sprite {
    constructor(texture: PIXI.Texture<PIXI.Resource> | undefined) {
        super(texture);
    }

    static create(textureName: string) {
        return new Sprite(app.loader.resources[textureName].texture);
    }
}