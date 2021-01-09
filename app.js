const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var cwidth = canvas.width,cheight = canvas.height;
var colors = ['#ef476f','#ffd166','#06d6a0','#118ab2','#1b4332'];
var balls = [];
var gravity = 1.5;
var friction = 0.9;



window.addEventListener("resize",reset);
function reset(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cwidth = canvas.width;
  cheight = canvas.height;
  init();
}

window.addEventListener('click',()=>{
  init();
})

class Ball{
  constructor(x,y,dx,dy,radius,color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

  }
  draw(){
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
  update(){
    if((this.y + this.radius + this.dy > cheight))
    {
      this.dy = -this.dy*friction;
    }
    else{
      this.dy += gravity;
    }
    if((this.x+this.radius+this.dx > cwidth) || (this.x-this.radius) <= 0 )
    {
      this.dx = -this.dx*friction;
    }
    this.x += this.dx;
    this.y += this.dy;
  }

}

var ballArr = [];
function init(){
  ballArr = [];
  for(let i = 0;i<80;i++)
  {
    var radius = Math.random()*20+10;
    var x = (Math.random()*(cwidth-2*radius))+2*radius;
    var y = Math.random()*cheight*0.3;
    var color = colors[Math.floor(Math.random()*colors.length)];
    var dx = Math.random() > 0.5;
    var dy = Math.random()*2+0.5;
    dx = dx?1:-1;
    ballArr.push(new Ball(x,y,dx,dy,radius,color));
  }
}
init();

animate();
function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,cwidth,cheight);
  for(let i = 0;i<ballArr.length;i++)
  {
    ballArr[i].update();
    ballArr[i].draw();
  }


}
