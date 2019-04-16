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

// TODO: get for x, y, width, height
export class Rectangle {
    /**
    @param {Point} point
    @param {Size} size
     */
    constructor(point, size) {
        this.point = point;
        this.size = size;
    }

    /**
    @description Checks for collision with another rectangle
    @param {Rectangle} other
    @return {boolean}
     */
    collidesWith(other) {
        return this.point.x < other.point.x + other.size.width &&
            this.point.x + this.size.width > other.point.x &&
            this.point.y < other.point.y + other.size.height &&
            this.point.y + this.size.height > other.point.y;
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