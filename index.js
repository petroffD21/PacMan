let canvas = document.querySelector('canvas')
let context = canvas.getContext('2d')

let image = new Image()
image.src = 'sprite-sheet.png'

let pacmanX = 10;
let pacmanY = 5;
let spriteWidth = 16;
let spriteHeight = 16;
let frameX = 0;
let frameY = 0;
let gameFrame = 0;
const staggerFrames = 5;


function gameLoop() {
    // 1 - wall
    // 0 - dots
    // 2 - ghosts
    // 3 - big dot
    // 4 - flashing pink doors
    // 31 row, 28 columns https://media.discordapp.net/attachments/534717305574391838/1077998402018738308/64Vzd5L6UoAAAAASUVORK5CYII.png tile = 8px
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

    let animate = () => {
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.drawImage(
            image,
            0,
            0,
            225,
            image.height,
            0,
            0,
            image.width / 2,
            image.height
        ) // Loading the map

        context.drawImage(
            image,
            229 + (frameX * spriteHeight),
            0 + (frameY * spriteHeight),
            spriteWidth,
            spriteHeight,
            pacmanX * 8,
            pacmanY * 8,
            canvas.width * 0.05,
            canvas.height * 0.05
        ) // Drawing pacman
    }

    if (gameFrame % staggerFrames == 0) { // reduces pacman animation speed
        window.addEventListener('keydown', (e) => {
            // While collision != detected
            switch (e.key) {
                case 'd':
                    if (map[pacmanY][pacmanX + 1] != 1) {
                        if ((pacmanY >= 1) && (pacmanY <= 29)) {
                            frameY = 0;
                            console.log(pacmanY, pacmanX);
                            pacmanX++;
                            if (frameX < 2) frameX++
                            else frameX = 0
                        }
                    } else break;
                    break;
                case 'w':
                    if (map[pacmanY - 1][pacmanX] != 1) {
                        if ((pacmanY >= 1) && (pacmanY <= 31)) {
                            frameY = 2;
                            pacmanY--;
                            if (frameX < 2) frameX++
                            else frameX = 0;
                        }
                    } else break;
                    break;
                case 'a':
                    if (map[pacmanY][pacmanX - 1] != 1) {
                        if ((pacmanY >= 1) && (pacmanY <= 29)) {
                            frameY = 1;
                            pacmanX--;
                            if (frameX < 2) frameX++
                            else frameX = 0;
                        }
                    } else break;
                    break;
                case 's':
                    if (map[pacmanY + 1][pacmanX] != 1) {
                        if ((pacmanY >= 1) && (pacmanY <= 31)) {
                            frameY = 3;
                            pacmanY++;
                            console.log(pacmanX, pacmanY);
                            if (frameX < 2) frameX++
                            else frameX = 0
                        }
                    } else break;
                    break;
            }
        })
    }
    gameFrame++;
    requestAnimationFrame(animate);
}

image.onload = () => {
    setInterval(gameLoop)
}

