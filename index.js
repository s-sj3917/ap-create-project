import { Generator } from "./generator.js";
import { World } from "./world.js";
import { Size } from "./size.js";
import { BlockManager } from "./blockManager.js";
import { PlayerPosition } from "./playerPosition.js";

let canvas = document.getElementById("game");

/**
 @type {CanvasRenderingContext2D}
 */
let context = canvas.getContext("2d");

class Main {
    async run() {
        let tileSize = new Size(64, 64);
        let canvasSize = new Size(9, 9);
        let w = new World(100, 100, tileSize, canvasSize);
        let pos = new PlayerPosition();

        let bm = await BlockManager.load();

        let generator = new Generator(w, bm);
        generator.generate();

        w.render(context, 8, 8);
    }
}

new Main().run().then(() => {
    console.log("done");
})