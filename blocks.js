import { Size } from "./size.js";

export class Block {
    static load() {
        throw "Don't use the static load on block";
    }

    get isMined() {
        throw "Insert code here";
    }

    /**
    @param {CanvasRenderingContext2D} ctx
     */
    render(ctx, x, y, width, height) {
        throw "Insert code here";
    }

    async mine() {
        throw "Insert code here";
    }
}

export class Unrenderable extends Block {
    render(ctx, x, y, width, height) {
    }
}

export class ColorBlock extends Block {
    constructor(colorNormal, colorMined, sleepMs, mined = false) {
        super();
        this._colorNormal = colorNormal;
        this._colorMined = colorMined;
        this._sleepMs = sleepMs;
        this._mined = mined;

        this._color = this._colorNormal;
    }

    get isMined() {
        return this._mined;
    }

    /**
    @param {CanvasRenderingContext2D} ctx
     */
    static render(ctx, x, y, width, height, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
    }

    render(ctx, x, y, width, height) {
        ColorBlock.render(ctx, x, y, width, height, this._color);
    }

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

    static async load() {
    }
}

export class Grass extends ColorBlock {
    constructor() {
        super("#00FF00", "#009900", 100);
    }

    static async load() {
    }
}

export class Dirt extends ColorBlock {
    constructor() {
        super("#9B7653", "#5B3613", 100);
    }

    static async load() {
    }
}

export class Stone extends ColorBlock {
    constructor() {
        super("#999999", "#595959", 250);
    }

    static async load() {
    }
}