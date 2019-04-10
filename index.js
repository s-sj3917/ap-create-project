import { Generator } from "./generator.js";
import { World } from "./world.js";
import { Size } from "./size.js";
import { BlockManager } from "./blockManager.js";
import { PlayerPosition } from "./playerPosition.js";
import { InputManager } from "./input.js";
import { MiningService } from "./miningService.js";
import { PlaceService } from "./placeService.js";
import { Hotbar } from "./hotbar.js";
import { Grass, Dirt, Stone } from "./blocks.js";

Math.clamp = function(value, lower, upper) {
    return Math.min(upper, Math.max(lower, value));
};

Promise.sleep = function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// a queue was tried out, but the delayed execution
// after a key press was not desirable
// TODO: separate responsibility
export class InputGlue {
    constructor(inputManager, miningService, placeService) {
        this._inputManager = inputManager;
        this._miningService = miningService;
        this._keyboardHandling = false;
        this._mouseHandling = false;
        this._placeService = placeService;
    }

    glue() {
        var instance = this;
        let placeCallback = async function(mEvent) {
            if (instance.mouseDown) {
                instance.handleMouse(mEvent);
            }
        };

        document.onkeypress = async function(kbEvent) {
            instance.handle(kbEvent);
        };

        document.onmouseup = () => instance.mouseDown = false;

        document.onmousedown = async function(mEvent) {
            instance.mouseDown = true;
            await placeCallback(mEvent);
        };

        document.onmousemove = placeCallback;
    }

    async handle(kbEvent) {
        if (this._keyboardHandling) {
            return;
        }

        this._keyboardHandling = true;

        this._inputManager.handleKey(kbEvent);
        await this._miningService.mine();

        this._keyboardHandling = false;
    }

    handleMouse(mEvent) {
        if (this._mouseHandling) {
            return;
        }

        this._mouseHandling = true;

        let result = this._inputManager.handleMouse(mEvent);
        this._placeService.handle(result);

        this._mouseHandling = false;
    }
}

export class Main {
    async run(worldWidth, worldHeight) {
        this._worldWidth = worldWidth;
        this._worldHeight = worldHeight;

        // canvas stuff
        /**
        @type {HTMLCanvasElement}
         */
        this._canvas = document.getElementById("game");

        /**
        @type {CanvasRenderingContext2D}
        */
        this._context = this._canvas.getContext("2d");

        // config
        this._tileSize = new Size(64, 64);
        this._canvasSize = new Size(29 * 64, 15 * 64);

        this._canvas.width = this._canvasSize.width * this._tileSize.width;
        this._canvas.height = this._canvasSize.height * this._tileSize.height;

        this._playerPosition = new PlayerPosition(this._worldWidth / 2, 0);
        this._world = new World(this._worldWidth, this._worldHeight, this._tileSize, this._canvasSize);
        this._hotbar = new Hotbar
        (
            5,
            [
                new Grass(),
                new Dirt(),
                new Stone()
            ],
            this._canvas, this._context, this._tileSize, this._canvasSize);

        this._inputManager = new InputManager(this._playerPosition, this._world, this._canvas, this._tileSize, this._canvasSize);
        this._miningService = new MiningService(this._playerPosition, this._world);
        this._placeService = new PlaceService(this._world);

        new InputGlue(this._inputManager, this._miningService, this._placeService)
            .glue();

        this._blockManager = await this.setupBlockManager();

        this._generator = new Generator(this._world, this._blockManager);
        this._generator.generate();

        this.render();
    }

    async setupBlockManager() {
        return await BlockManager.load();
    }

    render() {
        var context = this._context;
        var canvas = this._canvas;
        var world = this._world;
        var position = this._playerPosition;
        var hotbar = this._hotbar;

        var renderFunc;
        renderFunc = function() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            world.render(context, position.x, position.y);
            hotbar.render();
            window.requestAnimationFrame(renderFunc);
        }

        renderFunc();
    }
}

// DO NOT MAKE 10,000 BY 10,000
let main = new Main();
main.run(10, 10).then((renderPromise) => {
    console.log("done initializing");
});