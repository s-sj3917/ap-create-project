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

    // eww generation code :nauseated:
    generate() {

        // we're gonna go across and randomize our movement's a bit
        //      -----
        // -----     -
        //            ---->
        // and generate ground below that

        let genLine = [];
        let currentY = 7;

        for(let x = 0; x < this._world.width; x++) {
            currentY += this.rng(-1, 1);
            currentY = this.clamp(currentY, 3, 9);

            // enough to qualify for a spikey boi
            if (currentY > 2 && genLine[x - 2] == currentY) {
                // make sure there are no spikey bois
                //               -
                // --- --- or --- ---
                //    -

                // todo: eww

                if (genLine[x - 1] == currentY - 1) {
                    // we have the 2nd spikey boi (look up)
                    // we're gonna set a sky to where the spike is and grass to flatten it

                    this._world.setBlock(x - 1, genLine[x - 1], this._blockManager.sky);
                } else {
                    // otherwise it's the first spikey boi (look up)

                    this._world.setBlock(x - 1, genLine[x - 1], this._blockManager.dirt);
                }

                // then fix the spike in the genLine
                genLine[x - 1] = currentY;
                this._world.setBlock(x - 1, currentY, this._blockManager.grass);
            }

            genLine.push(currentY);

            for(let y = 0; y < this._world.height; y++)
            {
                let block;

                // eww, if else trees
                if (y < currentY) {
                    block = this._blockManager.sky;
                } else if (y == currentY) {
                    block = this._blockManager.grass;
                } else {
                    let selectedChance = this.rng(0, 100);

                    // the farther down in Y we are, the less chance for grass
                    let chance = (y / this._world.height) * 100;
                    if (selectedChance > chance) {
                        block = this._blockManager.dirt;
                    } else {
                        block = this._blockManager.stone;
                    }
                }

                this._world.setBlock(x, y, block);
            }
        }
    }

    // low to high inclusive
    rng(low, high) {
        high++;
        return Math.floor(Math.random() * (high - low)) + low;
    }

    clamp(current, low, high) {
        return Math.min(high, Math.max(low, current));
    }
}