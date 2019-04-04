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

export class InputGlue {
    constructor(inputManager, miningService) {
        this._inputManager = inputManager;
        this._miningService = miningService;
    }

    glue() {
        var inputManager = this._inputManager;
        var miningService = this._miningService;

        document.onkeypress = function(kbEvent) {
            inputManager.handle(kbEvent);
            miningService.mine();
        };
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