import { PlayerPosition } from "./playerPosition.js";

export class InputManager {
    listen(playerPosition, draw) {
        document.addEventListener("keydown", event => {
        if (event.isComposing || event.keyCode === 68) {
            playerPosition.x++;
            draw();
            return;
        }

            // do something
        });
    }
}