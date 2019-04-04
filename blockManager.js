// yea i know it's bad :p

import { Sky, Grass, Dirt, Stone } from "./blocks.js";

export class BlockManager {
    static async load() {
        // ewwwww
        let loadBlocks = [
            Sky.load(),
            Grass.load(),
            Dirt.load(),
            Stone.load()
        ];

        for(let i of loadBlocks) {
            await i;
        }
    }
}