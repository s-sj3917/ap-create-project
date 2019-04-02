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

export class Sky {
    static async load() {
        return new ColorBlock("#00FFFF");
    }
}

export class Grass {
    static async load() {
        return new ColorBlock("#00FF00");
    }
}

export class Dirt {
    static async load() {
        return new ColorBlock("#9B7653");
    }
}

export class Stone extends ColorBlock {
    static async load() {
        return new ColorBlock("#999999");
    }
}