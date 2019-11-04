
document.title = "canvas tutorial"

var body = document.body
body.style.margin = "0"

var canvas = document.querySelector('canvas')

var c = canvas.getContext('2d')
var maxRadius = 45;
var minRadius = 10;

var colorArray = ['#90A959','#001427','#DE541E','#C1FFF2','#9DC0BC']
var mouse = {
    x:undefined,
    y:undefined
}

window.addEventListener('mousemove',function(e){
    mouse.x = e.clientX,
    mouse.y = e.clientY
})

window.addEventListener('resize',function(){
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    init();
})
function Circle(x,y,dx,dy,radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
        c.fillStyle= this.color;
        c.fill();
    }

    this.update = function(){
        if(this.x + radius >innerWidth ||this.x - radius < 0){
            this.dx=-this.dx;
        }
    
        if(this.y + radius >innerHeight ||this.y - radius < 0){
            this.dy=-this.dy;
        }
        this.x += this.dx; 
        this.y += this.dy; 

        if(mouse.x - this.x < 100 && mouse.x - this.x > -100 && mouse.y - this.y < 100 &&  mouse.y - this.y > -100){
            if(this.radius < maxRadius){
                this.radius +=1;
            }
        }else{
            if(this.radius > this.minRadius){
                this.radius -=1
            }
        }

        this.draw();
    }
}

var circle = [];

function init(){
    circle = [];
    for(var i=0;i<800;i++){
        var radius = Math.floor(Math.random()*10) + 1;
        var x = Math.random()*(innerWidth-radius*2)+radius;
        var y = Math.random()*(innerHeight-radius*2)+radius;
        var dx = (Math.random() - 0.5);
        var dy = (Math.random() - 0.5);
        circle[i] = new Circle(x,y,dx,dy,radius);
    }
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth, innerHeight);
    circle.forEach(element => {
       element.update(); 
    });
}
init();
animate();
