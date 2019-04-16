
import { InputManager } from "./input.js";
import { MiningService } from "./miningService.js";
import { PlaceService } from "./placeService.js";
import { Hotbar } from "./hotbar.js";

// a queue was tried out, but the delayed execution
// after a key press was not desirable
// TODO: separate responsibility
// TODO: this is really ugly lmao, needs to be cleaned BADLY
export class InputGlue {
    /**
    @param {InputManager} inputManager
    @param {MiningService} miningService
    @param {PlaceService} placeService
    @param {Hotbar} hotbar
     */
    constructor(inputManager, miningService, placeService, hotbar) {
        this._inputManager = inputManager;
        this._miningService = miningService;
        this._keyboardHandling = false;
        this._mouseHandling = false;
        this._placeService = placeService;
        this._hotbar = hotbar;
    }

    glue() {
        var instance = this;
        let placeCallback = async function(mEvent) {
            if (instance.mouseDown) {
                instance.handleMouse(mEvent);
            }
        };

        document.onkeypress = async function(kbEvent) {
            // we do the place callback on a key press because if we rendered the screen down a bit,
            // we want to make sure that if the mouse is down, we place the block (if one needs to be0)
            instance.handle(kbEvent);
            await placeCallback(instance._lastMEvent);
        };

        document.onmouseup = () => instance.mouseDown = false;

        document.onmousedown = async function(mEvent) {
            instance.mouseDown = true;
            await placeCallback(mEvent);
        };

        document.onmousemove = placeCallback;
    }

    /**
    @param {KeyboardEvent} kbEvent
     */
    async handle(kbEvent) {
        if (this._keyboardHandling) {
            return;
        }

        this._keyboardHandling = true;

        this._inputManager.handleKey(kbEvent);
        await this._miningService.mine();

        this._keyboardHandling = false;
    }

    /**
    @param {MouseEvent} mEvent
     */
    handleMouse(mEvent) {
        if (this._mouseHandling) {
            return;
        }

        this._mouseHandling = true;
        this._lastMEvent = mEvent;

        // TODO: abstract the "if in hotbar do hotbar code" out code so i can make game ui elements easier
        let mousePos = this._inputManager.handleMouse(mEvent);
        let canvasPos = this._inputManager.canvasPos(mEvent);

        let rect = this._hotbar.rect;
        let hotbar = {
            x: rect.point.x,
            y: rect.point.y,
            width: rect.size.width,
            height: rect.size.height
        };

        // eww if else trees
        if (this.aabb({
            x: canvasPos.x,
            y: canvasPos.y,
            width: 1,
            height: 1,
        }, hotbar)) {
            this._hotbar.handle(canvasPos);
        } else {
            this._placeService.handle(mousePos);
        }

        this._mouseHandling = false;
    }

    // this is only so i can know if the mouse is in the hotbar
    // TODO
    aabb(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y;
    }
}