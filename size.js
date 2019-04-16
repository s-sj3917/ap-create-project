export class Size {
    /**
    @param {number} width
    @param {number} height
     */
    constructor(width, height) {
        this._width = width;
        this._height = height;
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
    @return {number}
     */
    inArea(x, y) {
        return x >= 0 && y >= 0
            && x < this.width && y < this.height;
    }
}

export class Rectangle {
    /**
    @param {Point} point
    @param {Size} size
     */
    constructor(point, size) {
        this.point = point;
        this.size = size;
    }
}

// TODO: replace player position with this?
export class Point {
    /**
    @param {number} x
    @param {number} y
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}