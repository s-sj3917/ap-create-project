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
        // bounds checking
        if (this._world.width <= place.x ||
            this._world.height <= place.y ||
            place.x < 0 ||
            place.y < 0) {
            return;
        }

        this._world.setBlock(place.x, place.y, new Grass());
    }
}