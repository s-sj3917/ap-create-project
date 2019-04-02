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

class Main {
    async run() {
        let tileSize = new Size(64, 64);
        let canvasSize = new Size(9, 9);
        let w = new World(1000, 1000, tileSize, canvasSize);
        let pos = new PlayerPosition(0, 0);
        var input = new InputManager();

        document.onkeypress = function(kbEvent) {
            console.log("input handle");
            console.log(kbEvent);
            input.handle(pos, kbEvent);
        };

        let bm = await BlockManager.load();

        let generator = new Generator(w, bm);
        generator.generate();

        var render;
        render = function() {
            w.render(context, pos.x, pos.y);
            console.log("frame");
            window.requestAnimationFrame(render);
        };

        window.requestAnimationFrame(render);
    }
}

new Main().run().then(() => {
    console.log("done");
})