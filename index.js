let canvas = document.querySelector('canvas')
let context = canvas.getContext('2d')

let image = new Image()
image.src = 'sprite-sheet.png'

let pacmanX = 30;
let pacmanY = 20;
let spriteWidth = 16;
let spriteHeight = 16;
let frameX = 0;
let frameY = 0;
let gameFrame = 0;
const staggerFrames = 5;
let pacman;
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

    pacman = context.drawImage(
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

};

let pacmanXPos = 1;
let pacmanYPos = 1;

function gameLoop() {
    // 1 - wall
    // 0 - dots
    // 2 - ghosts
    // 3 - big dot
    // 4 - flashing pink doors
    let tile = 8; // 31 row, 28 columns https://media.discordapp.net/attachments/534717305574391838/1077998402018738308/64Vzd5L6UoAAAAASUVORK5CYII.png
    let map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1], // tuka e na reda na upwards pacmana
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1], // bottom pink ghost
        [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 4, 4, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // top orange i ppc nachaloto i kraq trqbva da sa 0 ama go slagam 1 za vseki sluchai
        [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1],
        [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1],
        [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] // 31 rows
    ]
    // x = 16/2 y = 0.5? za dot
    for (let row = 0; row < map.length; row++) {
        for (let column = 0; column < map[row].length; column++) {
            const tile = map[row][column];

            switch (tile) {
                case 1:
                    break;
                case 0:
                    break;
            }
        }
    }



    if (gameFrame % staggerFrames == 0) { // reduces pacman animation speed
        window.addEventListener('keydown', (e) => {
            // While collision != detected
            switch (e.key) {
                case 'd': // map[Y][X]
                    //    20       30
                    if (map[pacmanYPos][pacmanXPos + 1] != 1) {
                        frameY = 0;
                        console.log(pacmanYPos, pacmanXPos);
                        pacmanXPos++;
                        pacmanX += 8;
                        if (frameX < 2) frameX++
                        else frameX = 0
                    } else break;
                    break;
                case 'w':
                    if (map[pacmanYPos - 1][pacmanXPos] != 1) {
                        frameY = 2;
                        console.log(pacmanYPos);
                        pacmanYPos--;
                        pacmanY -= 8;
                        if (frameX < 2) frameX++
                        else frameX = 0;
                    } else break;
                    break;
                case 'a':
                    if (map[pacmanYPos][pacmanXPos - 1] != 1) {
                        frameY = 1;
                        pacmanXPos--;
                        pacmanX -= 8;
                        if (frameX < 2) frameX++
                        else frameX = 0;
                    } else break;
                    break;
                case 's':
                    //onsole.log(pacmanYPos);
                    if (map[pacmanYPos + 1][pacmanXPos] != 1) {
                        console.log(pacmanYPos);
                        frameY = 3;
                        pacmanYPos++;
                        pacmanY += 8;
                        if (frameX < 2) frameX++
                        else frameX = 0
                    } else break;
                    break;
                default:
                    frameY = 0;
                    if (frameX < 2) frameX++
                    else frameX = 0
                    break;
            }
        })
    }
    // console.log(pacmanX,pacmanY);
    gameFrame++;
    requestAnimationFrame(animate);

}

console.log(frameX);
image.onload = () => {
    animate();
    setInterval(gameLoop, 1000 / 60)
}

// Click listener to get mouse coordinates
canvas.addEventListener('click', e => {
    console.log('X: ', e.clientX, 'Y: ', e.clientY);
})
