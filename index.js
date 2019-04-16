import { Generator } from "./generator.js";
import { World } from "./world.js";
import { Point, Size } from "./size.js";
import { BlockManager } from "./blockManager.js";
import { InputManager } from "./input.js";
import { MiningService } from "./miningService.js";
import { PlaceService } from "./placeService.js";
import { Hotbar } from "./hotbar.js";
import { InputGlue } from "./inputGlue.js";
import { Grass, Dirt, Stone, Plank } from "./blocks.js";

Math.clamp = function(value, lower, upper) {
    return Math.min(upper, Math.max(lower, value));
};

Promise.sleep = function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export class Main {
    /**
    @type {number} worldWidth
    @type {number} worldHeight
    @return {Promise}
     */
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
        this._canvasSize = new Size(29, 15);

        this._canvas.width = this._canvasSize.width * this._tileSize.width;
        this._canvas.height = this._canvasSize.height * this._tileSize.height;

        this._playerPosition = new Point(this._worldWidth / 2, 0);
        this._world = new World(this._worldWidth, this._worldHeight, this._tileSize, this._canvasSize, this._canvas);
        this._hotbar = new Hotbar
        (
            5,
            [
                Grass,
                Dirt,
                Stone,
                Plank
            ],
            this._canvas, this._context, this._tileSize, this._canvasSize);

        this._inputManager = new InputManager(this._playerPosition, this._world, this._canvas, this._tileSize, this._canvasSize);
        this._miningService = new MiningService(this._playerPosition, this._world);
        this._placeService = new PlaceService(this._world, this._hotbar);

        new InputGlue(this._inputManager, this._miningService, this._placeService, this._hotbar)
            .glue();

        this._blockManager = await this.setupBlockManager();

        this._generator = new Generator(this._world, this._blockManager);
        this._generator.generate();

        // we want to place the player on the block without sky
        for (let y = 0; y < this._world.height; y++) {
            // a bit abusive but \/shrug
            if (!this._world.getBlock(this._playerPosition.x, y).isSky) {
                 break;
            }

            this._playerPosition.y = y;
        }
    }

    /**
    @return {Promise}
     */
    async setupBlockManager() {
        return await BlockManager.load();
    }

    render() {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._world.render(this._context, this._playerPosition.x, this._playerPosition.y);
        this._hotbar.render();
    }

    runRenderLoop() {
        var instance = this;
        var renderFunc = () => {
            instance.render();
            window.requestAnimationFrame(renderFunc);
        };
        window.requestAnimationFrame(renderFunc);
    }
}

// DO NOT MAKE 10,000 BY 10,000
// IF YOU DO, CONSULT https://3000-<url>.ws-us0.gitpod.io/index.js
let main = new Main();
main.run(100, 200).then((renderPromise) => {
    main.runRenderLoop();
});