export class Block {
    static load() {
        throw "Don't use the static load on block";
    }

    /**
    @param {CanvasRenderingContext2D} ctx
     */
    render(ctx, x, y, width, height) {
    }
}

export class Unrenderable extends Block {
    render(ctx, x, y, width, height) {
    }
}

export class ColorBlock extends Block {
    constructor(color) {
        super();
        this._color = color;
    }

    /**
    @param {CanvasRenderingContext2D} ctx
     */
    render(ctx, x, y, width, height) {
        ctx.fillStyle = this._color;
        ctx.fillRect(x, y, width, height);
    }
}

export class Grass extends ColorBlock {
    constructor() {
        super("#00FF00");
    }

    /**
    @returns {Promise<Grass>}
     */
    static async load() {
        let grass = new Grass();
        return grass;
    }
}