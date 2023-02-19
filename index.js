let canvas = document.querySelector('canvas')
let context = canvas.getContext('2d')

let image = new Image()
image.src = 'sprite-sheet.png'

image.onload = () => {
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
    ) //map

    context.drawImage(
        image,
        230,
        0,
        15.5,
        15.5,
        50,
        50,
        canvas.width * 0.06,
        canvas.height * 0.06
    ) // pacman




    //         // Collision check
    //         if (this.x - this.radius < 0 || this.x + this.radius > canvas.width || this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
    //             this.x = 320;
    //             this.y = 240;
    //             this.direction = 'right';
    //             this.mouthOpen = true;
    //             lives--;
    //             updateLives();
    //             if (lives === 0) {
    //               gameOver();
    //             }
    //           }
    //     }


}




// Click listener to get mouse coordinates
canvas.addEventListener('click', e => {
    console.log('X: ', e.clientX, 'Y: ', e.clientY);
})





