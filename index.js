let canvas = document.querySelector('canvas')
let context = canvas.getContext('2d')

let image = new Image()
image.src = 'sprite-sheet.png'

let pacmanX = 30;
let pacmanY = 30;
let spriteWidth = 16;
let spriteHeight = 16;
let frameX = 0;
let frameY = 0;
let gameFrame = 0;
const staggerFrames = 5;

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.drawImage(
        image,
        0,
        0,
        225,
        image.height,
        0,
        0,
        canvas.width,
        canvas.height
    ) // Loading the map

    context.drawImage(
        image,
        229 + (frameX * spriteHeight),
        0 + (frameY * spriteHeight),
        spriteWidth,
        spriteHeight,
        pacmanX,
        pacmanY,
        canvas.width * 0.06,
        canvas.height * 0.06
    ) // Drawing pacman

    if (gameFrame % staggerFrames == 0) { // reduces pacman animation speed

        window.addEventListener('keydown', (e) => {
            // While collision != detected
            switch (e.key) {
                case 'd':
                    frameY = 0;
                    if (frameX < 2) frameX++
                    else frameX = 0
                    break;
                case 'w':
                    frameY = 2;
                    if (frameX < 2) frameX++
                    else frameX = 0;
                    break;
                case 'a':
                    frameY = 1;
                    if (frameX < 2) frameX++
                    else frameX = 0;
                    break;
                case 's':
                    frameY = 3;
                    if (frameX < 2) frameX++
                    else frameX = 0
                    break;
                default:
                    frameY = 0;
                    if (frameX < 2) frameX++
                    else frameX = 0
                    break;
            }
        })

    }

    gameFrame++;
    requestAnimationFrame(animate);
};

console.log(frameX);
image.onload = () => {
    animate();
}



// Click listener to get mouse coordinates
canvas.addEventListener('click', e => {
    console.log('X: ', e.clientX, 'Y: ', e.clientY);
})
