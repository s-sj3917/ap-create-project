import { Grass } from "./blocks.js";
import { World } from "./world.js";
import { Size } from "./size.js";

let canvas = document.getElementById("game");

/**
 @type {CanvasRenderingContext2D}
 */
let context = canvas.getContext("2d");

class Main {
    async run() {
        let tileSize = new Size(64, 64);
        let canvasSize = new Size(10, 10);
        let w = new World(100, 100, tileSize, canvasSize);

        let g = await Grass.load();
        w.setBlock(0, 0, g);
        w.setBlock(0, 1, g);
        w.setBlock(0, 2, g);
        w.setBlock(0, 2, g);
        w.setBlock(1, 2, g);
        w.setBlock(2, 2, g);

        w.render(context, 0, 0);
    }
}

new Main().run().then(() => {
    console.log("done");
})