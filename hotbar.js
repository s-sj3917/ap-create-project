import { Size, Rectangle, Point } from "./size.js";

export class Hotbar {
    /**
    @param {number} hotbarSize
    @param {ConstructorInfo[]} blocks
    @param {HTMLCanvasElement} canvas
    @param {CanvasRenderingContext2D} context
    @param {Size} tileConfig
    @param {Size} screenConfig
    @param {number} borderSize
     */
    constructor(hotbarSize, blocks, canvas, context, tileConfig, screenConfig, borderSize = 8) {
        this._hotbarSize = hotbarSize;
        this._blocks = blocks;
        this._canvas = canvas;
        this._context = context;
        this._tileConfig = tileConfig;
        this._screenConfig = screenConfig;
        this._borderSize = borderSize;

        this._selected = 0;

        this._instantiatedBlocks = [];
        for(let i = 0; i < this._blocks.length; i++) {
            this._instantiatedBlocks[i] = new this._blocks[i]();
        }

        this._rect = this.generateRectangle();
    }

    /**
    @returns {ConstructorInfo}
     */
    get selected() {
        // if it's an unknown block we'll justy return what we know works
        if (this._blocks[this._selected] === undefined) {
            return this._blocks[0];
        }

        return this._blocks[this._selected];
    }

    /**
    Returns a rectangle which is the bounding box of the hotbar.
    @return {Rectangle}
     */
    get rect() {
        return this._rect;
    }

    /**
    @return {Rectangle}
     */
    generateRectangle() {
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

        let x = rect.point.x + this._borderSize;
        let y = rect.point.y + this._borderSize;

        // make a tiny 8x8 border around the blocks we're gonna render
        this._context.fillStyle = "#222222";

        this._context.fillRect(rect.point.x, rect.point.y, rect.size.width, rect.size.height);

        // render every block we have
        for(let i = 0; i < this._instantiatedBlocks.length && i < this._hotbarSize; i++) {
            // don't render the selected block = we're going to render it specially
            if (i == this._selected) {
                continue;
            }

            this.renderBlock(i, x, y);
        }

        // the currently selected block
        this._context.fillStyle = "#FFF";
        this._context.fillRect(x + (this._tileConfig.width * this._selected) - 2, y - 2, this._tileConfig.width + 4, this._tileConfig.height + 4);

        this.renderBlock(this._selected, x, y);
    }

    /**
    @description Render an individual block into the hotbar
    @param {number} id The slot in the hotbar
    @param {number} x The x on the screen, grid-aligned by the tile config and id
    @param {number} y The y on the screen
     */
    renderBlock(id, x, y) {
        let block = this._instantiatedBlocks[id];

        if (block === undefined) {
            return;
        }

        block.render(this._context, x + (this._tileConfig.width * id), y, this._tileConfig.width, this._tileConfig.height);
    }

    /**
    @description Handles an on click, by the InputGlue usually
    @param {Point} mousePos
     */
    handle(mousePos) {
        let rect = this.rect;

        let x = mousePos.x - rect.point.x;
        x -= x % this._tileConfig.width;
        x /= this._tileConfig.width;

        this._selected = x;
    }
}