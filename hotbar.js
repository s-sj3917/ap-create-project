export class Hotbar {
    /**
    @param {number} hotbarSize
    @param {Block[]} blocks
    @param {HTMLCanvasElement} canvas
    @param {CanvasRenderingContext2D} context
    @param {Size} tileConfig
    @param {Size} screenConfig
     */
    constructor(hotbarSize, blocks, canvas, context, tileConfig, screenConfig) {
        this._hotbarSize = hotbarSize;
        this._blocks = blocks;
        this._canvas = canvas;
        this._context = context;
        this._tileConfig = tileConfig;
        this._screenConfig = screenConfig;
    }

    render() {
        // TODO: don't copy and paste this
        let x = Math.floor(this._screenConfig.width / 2);
        x -= Math.floor(this._hotbarSize / 2);

        let y = this._screenConfig.height - 2;

        x *= this._tileConfig.width;
        y *= this._tileConfig.height;

        // sub by 2,
        // then we're going to render 5 blocks

        // make a tiny 8x8 border around the blocks we're gonna render
        this._context.fillStyle = "#222222";

        let borderSize = 8;
        let borderSizex2 = borderSize * 2;

        this._context.fillRect(x - borderSize, y - borderSize, (this._tileConfig.width * 5) + borderSizex2, this._tileConfig.height + borderSizex2);

        // render every block we have
        for(let i = 0; i < this._blocks.length && i < this._hotbarSize; i++) {
            let block = this._blocks[i];
            block.render(this._context, x + (this._tileConfig.width * i), y, this._tileConfig.width, this._tileConfig.height);
        }
    }
}