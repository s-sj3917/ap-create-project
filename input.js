import { Point } from "./size.js";
import { World } from "./world.js";
import { Sky } from "./blocks.js";

export class InputManager {
    /**
    @param {Point} playerPosition,
    @param {World} world
    @param {HTMLCanvasElement} canvas
    @param {Size} tileSize
    @param {Size} screenSize
     */
    constructor(playerPosition, world, canvas, tileSize, screenSize) {
        this._playerPosition = playerPosition;
        this._world = world;
        this._canvas = canvas;
        this._tileSize = tileSize;
        this._screenSize = screenSize;
    }

    /**
    @param {KeyboardEvent} event
     */
    handleKey(event) {
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
        this._playerPosition.x = Math.clamp(this._playerPosition.x, 0, this._world.width - 1);
        this._playerPosition.y = Math.clamp(this._playerPosition.y, 0, this._world.height - 1);
    }

    /**
    @param {MouseEvent} event
     */
    handleMouse(event) {
        let mouseOnCanvas = this.canvasPos(event);
        let x = mouseOnCanvas.x;
        let y = mouseOnCanvas.y;

        // get where the grid position would be
        x -= x % this._tileSize.width;
        y -= y % this._tileSize.height;

        y /= this._tileSize.height;
        x /= this._tileSize.width;

        // TODO: don't copy and paste this
        // now we modify the x and y by the screen width since we have
        // to account for the offset in rendering
        let screenHalfX = Math.floor(this._screenSize.width / 2);
        let screenHalfY = Math.floor(this._screenSize.height / 2);

        x -= screenHalfX;
        y -= screenHalfY;

        // add the player position to the calculated x/y
        // since all we have right now screen x/y
        x += this._playerPosition.x;
        y += this._playerPosition.y;

        return new Point(x, y);
    }

    /**
    @param {MouseEvent} event
     */
    canvasPos(event) {
        // get x/y
        // https://stackoverflow.com/a/18053642

        let canvasRect = this._canvas.getBoundingClientRect();
        let x = event.clientX - canvasRect.left;
        let y = event.clientY - canvasRect.top;

        return new Point(x, y);
    }
}