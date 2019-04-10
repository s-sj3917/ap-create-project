import { Block } from "./blocks.js";
import { Size, Rectangle, Point } from "./size.js";

export class Hotbar {
    /**
    @param {number} hotbarSize
    @param {Block[]} blocks
    @param {HTMLCanvasElement} canvas
    @param {CanvasRenderingContext2D} context
    @param {Size} tileConfig
    @param {Size} screenConfig
     */
    constructor(hotbarSize, blocks, canvas, context, tileConfig, screenConfig, borderSize = 8) {
        this._hotbarSize = hotbarSize;
        this._blocks = blocks;
        this._canvas = canvas;
        this._context = context;
        this._tileConfig = tileConfig;
        this._screenConfig = screenConfig;
        this._borderSize = borderSize;

        this._selected = this._blocks[0];
    }

    /**
    @returns {Block}
     */
    get selected() {
        return this._selected;
    }

    // TODO: more performance if i cache this?
    get rect() {
        // TODO: don't copy and paste this
        let x = Math.floor(this._screenConfig.width / 2);
        x -= Math.floor(this._hotbarSize / 2);

        let y = this._screenConfig.height - 2;

        x *= this._tileConfig.width;
        y *= this._tileConfig.height;

        let borderSizex2 = this._borderSize * 2;

        return new Rectangle
        (
            new Point(x - this._borderSize, y - this._borderSize),

            // TODO: don't hardcode the '5' for 5 blocks
            new Size((this._tileConfig.width * 5) + borderSizex2, this._tileConfig.height + borderSizex2)
        );
    }

    render() {
        // sub by 2,
        // then we're going to render 5 blocks
        let rect = this.rect;

        // make a tiny 8x8 border around the blocks we're gonna render
        this._context.fillStyle = "#222222";

        this._context.fillRect(rect.point.x, rect.point.y, rect.size.width, rect.size.height);

        let x = rect.point.x + this._borderSize;
        let y = rect.point.y + this._borderSize;

        // render every block we have
        for(let i = 0; i < this._blocks.length && i < this._hotbarSize; i++) {
            let block = this._blocks[i];
            block.render(this._context, x + (this._tileConfig.width * i), y, this._tileConfig.width, this._tileConfig.height);
        }
    }

    handle(mousePos) {
        let rect = this.rect;

        let x = mousePos.x - rect.point.x;
        x -= x % this._tileConfig.width;
        x /= this._tileConfig.width;

        this._selected = this._blocks[x];
    }
}