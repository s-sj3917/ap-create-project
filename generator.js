import { World } from "./world.js";
import { Sky } from "./blocks.js";
import { BlockManager } from "./blockManager.js";

export class Generator {

    /**
    @param {World} world
    @param {BlockManager} blockManager
     */
    constructor(world, blockManager) {
        this._world = world;
        this._blockManager = blockManager;
    }

    generate() {
        for(let x = 0; x < this._world.width; x++) {
            for(let y = 0; y < this._world.height; y++) {
                // really bad lol
                let block;

                if (y < 3) {
                    block = this._blockManager.sky;
                } else if (y == 3) {
                    block = this._blockManager.grass;
                } else {
                    block = this._blockManager.stone;
                }

                this._world.setBlock(x, y, block);
            }
        }
    }
}