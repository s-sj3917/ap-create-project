import { World } from "./world.js";
import { Hotbar } from "./hotbar.js";
import { Point } from "./size.js";

export class PlaceService {
    /**
    @param {World} world
    @param {Hotbar} hotbar
     */
    constructor(world, hotbar) {
        this._world = world;
        this._hotbar = hotbar;
    }


    /**
    @param {Point} place
     */
    handle(place) {
        // bounds checking
        if (this._world.width <= place.x ||
            this._world.height <= place.y ||
            place.x < 0 ||
            place.y < 0) {
            return;
        }

        this._world.setBlock(place.x, place.y, new this._hotbar.selected());
    }
}