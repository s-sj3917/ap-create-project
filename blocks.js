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

export class Sky extends ColorBlock {
    constructor() {
        super("#00FFFF");
    }

    /**
    @returns {Promise<Sky>}
     */
    static async load() {
        let block = new Sky();
        return block;
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
        let block = new Grass();
        return block;
    }
}

export class Stone extends ColorBlock {
    constructor() {
        super("#999999");
    }

    /**
    @returns {Promise<Stone>}
     */
    static async load() {
        let block = new Stone();
        return block;
    }
}