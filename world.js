import { Size } from "./size.js";
import { Unrenderable } from "./blocks.js";

export class World {
    /**
    @param {number} width
    @param {number} height
    @param {Size} tileConfig
    @param {Size} screenConfig
     */
    constructor(width, height, tileConfig, screenConfig) {
        this._width = width;
        this._height = height;
        this._size = new Size(this.width, this.height);

        this._tileConfig = tileConfig;
        this._screenConfig = screenConfig;

        this._blocks = [];

        for(let x = 0; x < width; x++) {
            this._blocks.push([]);
        }
    }

    /**
    @return {number}
     */
    get width() {
        return this._width;
    }

    /**
    @return {number}
     */
    get height() {
        return this._height;
    }

    /**
    @param {number} x
    @param {number} y
    @param {Block} block
     */
    setBlock(x, y, block) {
        this._blocks[x][y] = block;
    }

    /**
    @param {number} x
    @param {number} y
    @returns {Block}
     */
    getBlock(x, y) {
        let block = this._blocks[x][y];

        if (block === undefined) {
            return new Unrenderable();
        }

        return block;
    }

    /**
    @param {CanvasRenderingContext2D} ctx
    @param {number} playerX
    @param {number} playerY
     */
    render(ctx, playerX, playerY) {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, 800, 600);

        // move the x/y from the center to the edge
        // dividing by 2 because otherwise we would be moving the WHOLE screen offscreen

        let screenHalfX = Math.floor(this._screenConfig.width / 2);
        let screenHalfY = Math.floor(this._screenConfig.height / 2);

        let renderX = (playerX - (screenHalfX));
        let renderY = (playerY - (screenHalfY));

        // now just render the box where the player is at

        for(let screenPosX = 0; screenPosX < this._screenConfig.width; screenPosX++) {
            for(let screenPosY = 0; screenPosY < this._screenConfig.height; screenPosY++) {

                // modify the curx/y with the render x/y
                let blockX = screenPosX + renderX;
                let blockY = screenPosY + renderY;

                // only draw if the block is inside of the bounds
                if (this._size.inArea(blockX, blockY)) {
                    let canvasX = screenPosX * this._tileConfig.width;
                    let canvasY = screenPosY * this._tileConfig.height;

                    this.getBlock(blockX, blockY)
                        .render(ctx, canvasX, canvasY, this._tileConfig.width, this._tileConfig.height);
                }
            }
        }

        // TODO: remove
        // render a yellow square where the player is
        ctx.fillStyle = "#FFFF00";
        ctx.fillRect(screenHalfX * this._tileConfig.width, screenHalfY * this._tileConfig.height, this._tileConfig.width, this._tileConfig.height);
    }
}