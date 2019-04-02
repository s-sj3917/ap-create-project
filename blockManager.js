// yea i know it's bad :p

import { Sky, Grass, Dirt, Stone } from "./blocks.js";

export class BlockManager {
    constructor(sky, grass, dirt, stone) {
        this._sky = sky;
        this._grass = grass;
        this._dirt = dirt;
        this._stone = stone;
    }

    get sky() {
        return this._sky;
    }

    get grass() {
        return this._grass;
    }

    get dirt() {
        return this._dirt;
    }

    get stone() {
        return this._stone;
    }

    static async load() {
        // ewwwww
        let skyPromise = Sky.load();
        let grassPromise = Grass.load();
        let dirtPromise = Dirt.load();
        let stonePromise = Stone.load();

        let bm = new BlockManager
        (
            await skyPromise,
            await grassPromise,
            await dirtPromise,
            await stonePromise
        );

        return bm;
    }
}