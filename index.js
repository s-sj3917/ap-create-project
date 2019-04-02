import { Generator } from "./generator.js";
import { World } from "./world.js";
import { Size } from "./size.js";
import { BlockManager } from "./blockManager.js";
import { PlayerPosition } from "./playerPosition.js";
import { InputManager } from "./input.js";

let canvas = document.getElementById("game");

/**
 @type {CanvasRenderingContext2D}
 */
let context = canvas.getContext("2d");

Math.clamp = function(value, lower, upper) {
    return Math.min(upper, Math.max(lower, value));
};

// TODO: clean
class Main {
    async run() {
        let tileSize = new Size(64, 64);
        let canvasSize = new Size(13, 9);
        let w = new World(1000, 1000, tileSize, canvasSize);
        let pos = new PlayerPosition(0, 0);
        var input = new InputManager(pos, w);

        document.onkeypress = function(kbEvent) {
            input.handle(kbEvent);
        };

        let bm = await BlockManager.load();

        let generator = new Generator(w, bm);
        generator.generate();

        var render;
        render = function() {
            // there's weird sky fragments at the upper right
            context.clearRect(0, 0, 1000, 1000);

            w.render(context, pos.x, pos.y);
            window.requestAnimationFrame(render);
        };

        render();
    }
}

new Main().run().then(() => {
    console.log("done");
})