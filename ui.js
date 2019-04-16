import { Rectangle, Point, Size } from "./size.js";

export class UIElement {
    /**
    @param {Rectangle} bounds
     */
    constructor(bounds) {
        this.bounds = bounds;
    }

    clicked;
    keypressed;
}

export class UI {
    /**
    @param {UIElement[]} uiElements
    @param {HTMLCanvasElement} canvas
     */
    constructor(uiElements, canvas) {
        this._uiElements = uiElements.reverse();
    }

    /**
    @param {MouseEvent} event
     */
    handleClick(event) {
        let clickSize = new Size(1, 1);
        let click = new Rectangle(pointOnCanvas(event), clickSize);

        for(var uiElement of this._uiElements) {
            if (click.collidesWith(uiElement.bounds)) {
                let clickRelativeToElement = new Rectangle
                (
                    new Point
                    (
                        click.x - uiElement.bounds.x,
                        click.y - uiElement.bounds.y,
                    ),
                    clickSize
                );

                uiElement.clicked(clickRelativeToElement);

                return;
            }
        }
    }

    /**
    @param {KeyboardEvent} event
     */
    handleKeyPress(event) {
        for(var uiElement of this._uiElements) {
            uiElement.keypressed(event);
        }
    }

    /**
    @param {MouseEvent} event
    @return {Point}
     */
    pointOnCanvas(event) {
        // get x/y
        // https://stackoverflow.com/a/18053642

        let canvasRect = this._canvas.getBoundingClientRect();
        let x = event.clientX - canvasRect.left;
        let y = event.clientY - canvasRect.top;

        return new Point(x, y);
    }
}