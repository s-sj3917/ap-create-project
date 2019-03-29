// yea i know it's bad :p

import { Sky, Grass, Stone } from "./blocks.js";

export class BlockManager {
    constructor(sky, grass, stone) {
        this._sky = sky;
        this._grass = grass;
        this._stone = stone;
    }

    get sky() {
        return this._sky;
    }

    get grass() {
        return this._grass;
    }

    get stone() {
        return this._stone;
    }

    static async load() {
        let skyPromise = Sky.load();
        let grassPromise = Grass.load();
        let stonePromise = Stone.load();

        let bm = new BlockManager
        (
            await skyPromise,
            await grassPromise,
            await stonePromise
        );

        return bm;
    }
}