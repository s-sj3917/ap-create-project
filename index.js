import { Generator } from "./generator.js";
import { World } from "./world.js";
import { Size } from "./size.js";
import { BlockManager } from "./blockManager.js";
import { PlayerPosition } from "./playerPosition.js";
import { InputManager } from "./input.js";

Math.clamp = function(value, lower, upper) {
    return Math.min(upper, Math.max(lower, value));
};

export class Main {
    async run(worldWidth, worldHeight) {
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

        this._inputManager = this.setupInputManager(this._playerPosition, this._world);
        this._blockManager = await this.setupBlockManager();

        this._generator = new Generator(this._world, this._blockManager);
        this._generator.generate();

        this.render();
    }

    setupInputManager(playerPosition, world) {
        let inputManager = new InputManager(playerPosition, world);

        document.onkeypress = function(kbEvent) {
            inputManager.handle(kbEvent);
        }

        return inputManager;
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
            world.render(context, position.x, position.y);
            window.requestAnimationFrame(renderFunc);
        }

        renderFunc();
    }
}

new Main().run().then((renderPromise) => {
    console.log("done initializing");
});