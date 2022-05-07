const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1200
canvas.height= 800

class Player{
    constructor(){
        this.position = {
            x:550,
            y:670
        }
        this.velocity = {
            x:0,
            y:0
        }
        
        const image = new Image()
        image.src = './assets/player.png'
       
        this.image = image
        this.width = 75
        this.height = 75
        

        } 
    draw() {
           //c.fillStyle = 'red'
        //c.fillRect(this.position.x, this.position.y,this.width,this.height)
     c.drawImage(
        this.image, 
        this.position.x, 
        this.position.y, 
        this.width, 
        this.height)
    }
    update(){
        if(this.image){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
    
    }}

}

class laser{
  constructor({position, velocity}){
        this.position = position
        this.velocity = velocity
        this.draw  
  }
    
draw(){
        c.fillStyle = 'limegreen',
        c.fillRect(this.position.x, this.position.y,8, 15)
        c.fill()
       c.closePath()}
update(){
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
}
}

class alien{
    constructor({position}){ 
        this.velocity = {
            x:0,
            y:0
        };
       
    const aliens = new Image()
        aliens.src = './assets/enemy2.png'
        this.image = aliens
        this.image.onload = () =>{
        const scale = 2
        this.width = this.image.width/scale
        this.height = this.image.height/scale
        this.position ={
            x:position.x,
            y:position.y
        }};
        
}
draw(){
    c.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.width,
        this.height
    )
}
update({velocity}){
    if(this.image){
        this.draw()
        this.position.x += velocity.x
        this.position.y += velocity.y
    }
}
}

class Grid {
    constructor() {
    this.position = {
        x: 0,
        y: 0
    }

    this.velocity ={
        x: 3,
        y: 3
    }

    this.aliens = [];
    const  columns = Math.floor(Math.random() * 12+4)
    const rows = Math.floor(Math.random() * 6+2)
    this.width=columns * 75;
    for (let x = 0; x<columns; x++) {
        for (let y = 0; rows; y++){
        this.aliens.push(
            new alien({ 
            position: {
        x:x * 75,
        y:y * 50 }
            })
        )
        }
    //console.log(this.aliens)
}}
update(){
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    this.velocity.y = 0

    if (this.position.x + this.width>= canvas.width|| this.position.x<=0 ){
        this.velocity.x = -this.velocity.x
    this.velocity.y = 50
}
    }
}
;

const player = new Player()
const lasers = []
const grids =[new Grid()]
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    }
}

let frames = 0 
player.update()
laser.update()
//alien.update()
function animate(){
    requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0, canvas.width, canvas.height)
    //Alien.update()
    player.update()
    laser.forEach((laser, index) => {
        if (lasers.position.y + lasers.height <= 0){
            lasers.splice(index, 1)
        }
        else{
            lasers.update()
        }
        lasers.update()
    })
    if(keys.a.pressed && player.position>=0){
        player.velocity.x = -5
    } else if(keys.d.pressed && player.position>=0){
        player.velocity.x = 5}
    else{
        player.velocity.x = 0
    }
    if(keys.w.pressed && laser.position>=0){
        player.velocity.y = -5
    } 
    else{
        laser.velocity.y = 0
    }
grids.forEach((grid) =>{
    grid.update()
    grid.aliens.forEach(alien=> {
        alien.update({velocity: grid.velocity})
    })
} )
if (frames % 500 === 0){
    grids.push(new Grid)
}
frames++
}

animate()

addEventListener('keydown',({key}) => {
    switch (key){
        case 'a':
            //console.log('LEFT')
        if(keys.a.pressed=true){0
        player.velocity.x = -5}
        else{player.velocity.x = 0}
            
        break

        case 'd':
         //   console.log('right')
         if(keys.d.pressed=true){0
            player.velocity.x = 5}
            else{player.velocity.x = 0}
            
        break

        case 'w':
           console.log('shoot')
        lasers.push(new laser({
            position:{
                x:player.position.x,
                y:player.position.y
            },
            velocity:{
                x:0,
                y:-5
            }
        }))

    }
        
    
    
})

//keeping the keyup listener just incase something breaks and this will fix it
//addEventListener('keyup',({key}) => {
  //  switch (key){
    //    case 'a':
      //      keys.a.pressed=false
        //    player.velocity.x = 0
          //  console.log('stopleft')
        //break

        //case 'd': 
          //  player.velocity.x = 0
            //keys.d.pressed=false
         //   console.log('stopright')
      //  break

        //case 'f':
           // console.log('shoot')
        //break;
   // }lasers.push(new laser({
   // position:{
     //   x: player.position.x + 34,
     //   y: player.position.y
   // }, 
  //  velocity:{
    //    x:0,
    //    y:-10
    
//})