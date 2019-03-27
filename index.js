let canvas = document.getElementById("game");

/**
 @type {CanvasRenderingContext2D}
 */
let context = canvas.getContext("2d");

let image = new Image();

image.onload = function() {
    console.log("aaaa");
    context.drawImage(image, 10, 10);
}

image.src = "https://store-images.s-microsoft.com/image/apps.608.13510798885735219.cf55aeca-e690-41e0-a88b-41b0e517a3be.c94e1bfa-1b68-4cf5-9954-f967168480b4?mode=scale&q=90&h=1080&w=1920";
