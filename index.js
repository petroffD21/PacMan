// Map
let canvas = document.querySelector('canvas')
let context = canvas.getContext('2d')

let image = new Image()
image.src = 'spritesheet.png'

image.onload = () => {
    context.clearRect(-450, 0, canvas.width, canvas.height)
    context.drawImage(
        image,
        -450,
        0, // whole spritesheet x and y offset positions
        image.width,
        image.height, // width and height of the source image
        -450,
        0, // offset
        canvas.width,
        canvas.height
    ) //map
    

}



//todo keyboard input i pacman da si smenq sprite sheet kartinkata spored inputa/posokata

//Keyboard Input and character
let character = document.getElementById('pacmanRight')
character.src = 'pacman.png'
character.width = 30
character.height = 30
let characterX = -450;
let characterY = 0;


window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            //character.source = pacmannagore.png primerno
            characterX += 0
            characterY += 2
            character.style.transform = 'translate(' + characterX + 'px, ' + characterY + 'px)'
            break;
        case 'd':
            characterX += 5
            characterY += 0
            break;
        case 'a':
            characterX -= 5
            characterY += 0
            break;
        case 's':
            characterX += 0
            characterY -= 2
    }
    console.log(e);
    console.log(characterX, characterY);

})




