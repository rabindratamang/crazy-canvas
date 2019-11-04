document.title = "canvas tutorial"

var body = document.body
body.style.margin = "0"

var canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var colorArray = ['#B2EDC5', '#387780', '#F4442E', '#C1FFF2', '#9DC0BC']
var c = canvas.getContext('2d')

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = colorArray[Math.floor(Math.random() * 5)+1]

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color
        c.fill();
    }

    this.update = function () {
        if (this.x + radius > innerWidth || this.x - radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + radius > innerHeight || this.y - radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

var circle = [];

var counter = 0, reset = false
function animate() {
    if (counter >= 100) reset = true
    if (counter <= 0) reset = false
    if (reset) {
        circle.pop()
        if (counter > 0) counter--
    } else {
        var x = Math.random() * innerWidth;
        var y = Math.random() * innerHeight;
        circle[counter + 1] = new Circle(x, y, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, 10);
        counter++
    }
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    circle.forEach(element => element.update());
}

animate();