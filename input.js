import { PlayerPosition } from "./playerPosition.js";

export class InputManager {
    /**
    @param {KeyboardEvent} event
     */
    handle(playerPosition, event) {
        switch(event.key) {
            case 'w':
            case 'W': {
                playerPosition.y--;
            } break;

            case 's':
            case 'S': {
                playerPosition.y++;
            } break;

            case 'a':
            case 'A': {
                playerPosition.x--;
            } break;

            case 'd':
            case 'D': {
                playerPosition.x++;
            } break;
        }
    }
}