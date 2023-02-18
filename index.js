// Map
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
        0, // offset
        canvas.width,
        canvas.height
    ) //map
    
    context.drawImage(
        image,
        230,
        100, //TODO SLED MALKO DA GO CLIPNA SPORED HEIGHTA
        450,
        450,
        50,
        0,
        canvas.width,
        canvas.height
        
    ) // pacman sprite
    // let pacman = {
    //     x: 200,
    //     y: 200,
    //     speed: 5,
    //     direction: 'right',
    //     mouthOpen: true,
    //     radius: 20,
    
    //     draw: function() {
    //         context.drawImage(
    //             image,
    //             0,
    //             0,
    //             100,
    //             this.x,
    //             this.y,
    //             canvas.width * 0.3,
    //             canvas.height * 0.3
    //         )
    //     },
    
    //     move: function() {
    //         switch(this.direction) {
    //             case 'up':
    //                 this.y -= this.speed;
    //                 break;
    //             case 'down':
    //                 this.y += this.speed;
    //                 break;
    //             case 'left':
    //                 this.x -= this.speed;
    //                 break;
    //             case 'right':
    //                 this.x += this.speed;
    //                 break;
    //         }
    
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
        
    
    // }
    // pacman.draw()
    // pacman.move()
}




// Click listener to get mouse coordinates
canvas.addEventListener('click', e => {
    console.log('X: ', e.clientX, 'Y: ', e.clientY);
})





