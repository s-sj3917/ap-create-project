import { World } from "./world.js";
import { Grass } from "./blocks.js";

export class PlaceService {
    /**
    @param {World} world
     */
    constructor(world) {
        this._world = world;
    }

    handle(place) {
        this._world.setBlock(place.x, place.y, new Grass());
    }
}