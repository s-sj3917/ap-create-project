import { Generator } from "./generator.js";
import { World } from "./world.js";
import { Size } from "./size.js";
import { BlockManager } from "./blockManager.js";
import { PlayerPosition } from "./playerPosition.js";
import { InputManager } from "./input.js";
import { MiningService } from "./miningService.js";

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
    constructor(inputManager, miningService) {
        this._inputManager = inputManager;
        this._miningService = miningService;
        this._queue = [];
        this._queueHandled = false;
    }

    glue() {
        var instance = this;

        document.onkeypress = async function(kbEvent) {
            if (!instance._queueHandled) {
                instance._queue.push(kbEvent);
                await instance.handleQueue();
            }
        };
    }

    async handleQueue() {
        this._queueHandled = true;

        while (this._queue.length > 0) {
            let kbEvent = this._queue[0];
            this._queue.shift();
            await this.handle(kbEvent);
        }

        this._queueHandled = false;
    }

    async handle(kbEvent) {
            console.log("keypress");
            this._inputManager.handle(kbEvent);
            await this._miningService.mine();
            console.log("awake");
    }
}

export class Main {
    async run(worldWidth, worldHeight) {
        this._worldWidth = worldWidth;
        this._worldHeight = worldHeight;

        // canvas stuff
        this._canvas = document.getElementById("game");

        /**
        @type {CanvasRenderingContext2D}
        */
        this._context = this._canvas.getContext("2d");

        // config
        this._tileSize = new Size(64, 64);
        this._canvasSize = new Size(13, 9);

        this._playerPosition = new PlayerPosition(this._worldWidth / 2, 0);
        this._world = new World(this._worldWidth, this._worldHeight, this._tileSize, this._canvasSize);

        this._inputManager = new InputManager(this._playerPosition, this._world);
        this._miningService = new MiningService(this._playerPosition, this._world);

        new InputGlue(this._inputManager, this._miningService)
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

        var renderFunc;
        renderFunc = function() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            world.render(context, position.x, position.y);
            window.requestAnimationFrame(renderFunc);
        }

        renderFunc();
    }
}

let main = new Main();
main.run(100, 100).then((renderPromise) => {
    console.log("done initializing");
});