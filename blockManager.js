import { Sky, Grass, Dirt, Stone } from "./blocks.js";

/**
Utility for loading all the blocks
 */
export class BlockManager {

    /**
    @return {Promise}
     */
    static load() {
        return Promise.all([
            Sky.load(),
            Grass.load(),
            Dirt.load(),
            Stone.load()
        ]);
    }
}