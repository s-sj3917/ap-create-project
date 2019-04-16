
import { InputManager } from "./input.js";
import { MiningService } from "./miningService.js";
import { PlaceService } from "./placeService.js";
import { Hotbar } from "./hotbar.js";
import { Rectangle, Point, Size } from "./size.js";

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
            // we want to make sure that if the mouse is down, we place the block (if one needs to be)
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
    @return {Promise}
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

        let hotbar = this._hotbar.rect;
        let click = new Rectangle(canvasPos, new Size(1, 1));

        // eww if else trees
        if (hotbar.collidesWith(click)) {
            this._hotbar.handle(canvasPos);
        } else {
            this._placeService.handle(mousePos);
        }

        this._mouseHandling = false;
    }
}