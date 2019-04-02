import { PlayerPosition } from "./playerPosition.js";
import { World } from "./world.js";

export class InputManager {
    /**
    @param {PlayerPosition} playerPosition,
    @param {World} world
     */
    constructor(playerPosition, world) {
        this._playerPosition = playerPosition;
        this._world = world;
    }

    /**
    @param {KeyboardEvent} event
     */
    handle(event) {
        switch(event.key) {
            case 'w':
            case 'W': {
                this._playerPosition.y--;
            } break;

            case 's':
            case 'S': {
                this._playerPosition.y++;
            } break;

            case 'a':
            case 'A': {
                this._playerPosition.x--;
            } break;

            case 'd':
            case 'D': {
                this._playerPosition.x++;
            } break;
        }

        // clamp the position so they player can't go off screen
        this._playerPosition.x = Math.clamp(this._playerPosition.x, 0, this._world.width);
        this._playerPosition.y = Math.clamp(this._playerPosition.y, 0, this._world.height);
    }
}