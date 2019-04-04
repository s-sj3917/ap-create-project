import { World } from "./world.js";
import { Sky, Grass, Dirt, Stone } from "./blocks.js";
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
            currentY = Math.clamp(currentY, 3, 9);

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

                    this._world.setBlock(x - 1, genLine[x - 1], new Sky());
                } else {
                    // otherwise it's the first spikey boi (look up)

                    this._world.setBlock(x - 1, genLine[x - 1], new Dirt());
                }

                // then fix the spike in the genLine
                genLine[x - 1] = currentY;
                this._world.setBlock(x - 1, currentY, new Grass());
            }

            genLine.push(currentY);

            for(let y = 0; y < this._world.height; y++)
            {
                let block;

                // eww, if else trees
                if (y < currentY) {
                    block = new Sky();
                } else if (y == currentY) {
                    block = new Grass();
                } else {
                    let selectedChance = this.rng(0, 100);

                    // the farther down in Y we are, the less chance for grass
                    let chance = (y / this._world.height) * 100;
                    if (selectedChance > chance) {
                        block = new Dirt();
                    } else {
                        block = new Stone();
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
}