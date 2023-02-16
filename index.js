let canvas = document.querySelector('canvas')
let context = canvas.getContext('2d')

let image = new Image()
image.src = 'spritesheet.png'
image.crossOrigin = true;

image.onload = () => {
    canvas.width = 680;
    canvas.height = 248;
    
    context.drawImage(
        image,
        -450, 
        0, // whole spritesheet x and y offset positions
        image.width,
        image.height, // width and height of the source image
        0,
        0, // desired offset to isolate the map
        canvas.width,
        canvas.height
    )
}
