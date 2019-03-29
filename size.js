export class Size {
    /**
    @param {number} width
    @param {number} height
     */
    constructor(width, height) {
        this._width = width;
        this._height = height;
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    /**
    @param {number} x
    @param {number} y
     */
    inArea(x, y) {
        return x >= 0 && y >= 0
            && x < this.width && y < this.height;
    }
}