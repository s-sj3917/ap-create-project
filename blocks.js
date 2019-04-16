import { Size } from "./size.js";

export class Block {
    /**
    @return {Promise}
     */
    static load() {
        throw "Don't use the static load on block";
    }

    get isMined() {
        throw "Insert code here";
    }

    /**
    @param {CanvasRenderingContext2D} ctx
    @param {number} x
    @param {number} y
    @param {number} width
    @param {number} height
     */
    render(ctx, x, y, width, height) {
        throw "Insert code here";
    }

    /**
    @return {Promise}
     */
    async mine() {
        throw "Insert code here";
    }
}

export class Unrenderable extends Block {
    render(ctx, x, y, width, height) {
    }
}

export class ColorBlock extends Block {
    /**
    @param {string} colorNormal
    @param {string} colorMined
    @param {number} sleepMs
    @param {boolean} mined
     */
    constructor(colorNormal, colorMined, sleepMs, mined = false) {
        super();

        this._colorNormal = colorNormal;
        this._colorMined = colorMined;
        this._sleepMs = sleepMs;
        this._mined = mined;

        this._color = this._colorNormal;
    }

    /**
    @return {boolean}
     */
    get isMined() {
        return this._mined;
    }

    /**
    @param {CanvasRenderingContext2D} ctx
    @param {number} x
    @param {number} y
    @param {number} width
    @param {number} height
    @param {string} color
     */
    static render(ctx, x, y, width, height, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
    }

    /**
    @param {CanvasRenderingContext2D} ctx
    @param {number} x
    @param {number} y
    @param {number} width
    @param {number} height
     */
    render(ctx, x, y, width, height) {
        ColorBlock.render(ctx, x, y, width, height, this._color);
    }

    /**
    @return {Promise}
     */
    async mine() {
        if (this._mined) {
            return;
        }

        this._mined = true;
        this._color = this._colorMined;
        await Promise.sleep(this._sleepMs);
    }
}

// the idea is that you can do new Sky()
// but the static load is called to load the images of the blocks
// in the future, if i use images.

export class Sky extends ColorBlock {
    constructor() {
        super("#00FFFF", "#00FFFF", 0);
        // sky should be quick to move in
        this._mined = true;
    }

    /**
    @return {boolean}
     */
    get isSky() {
        return true;
    }

    /**
    @return {Promise}
     */
    static async load() {
    }
}

export class Grass extends ColorBlock {
    constructor() {
        super("#00FF00", "#009900", 100);
    }

    /**
    @return {Promise}
     */
    static async load() {
    }
}

export class Dirt extends ColorBlock {
    constructor() {
        super("#9B7653", "#5B3613", 100);
    }

    /**
    @return {Promise}
     */
    static async load() {
    }
}

export class Stone extends ColorBlock {
    constructor() {
        super("#999999", "#595959", 250);
    }

    /**
    @return {Promise}
     */
    static async load() {
    }
}

export class Plank extends ColorBlock {
    constructor() {
        super("#FFA500", "#8B4513", 150);
    }

    /**
    @return {Promise}
     */
    static async load() {
    }
}