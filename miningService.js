import { PlayerPosition } from "./playerPosition.js";
import { World } from "./world.js";

export class MiningService {
    /**
    @param {PlayerPosition} playerPosition
    @param {World} world
     */
    constructor(playerPosition, world) {
        this._playerPosition = playerPosition;
        this._world = world;
    }

    async mine() {
        let miningBlock = this._world.getBlock(this._playerPosition.x, this._playerPosition.y);
        await miningBlock.mine();
    }
}