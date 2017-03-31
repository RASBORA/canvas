
console.log("start");
var canvas = document.getElementById("canvas");


function resize(){
  console.log("window resize");
  canvas.width =  window.innerWidth;
  canvas.height = window.innerHeight;
  max_w = canvas.width;
  max_h = canvas.height;
}

resize();
window.onresize=resize;

function rand(max){
   return Math.random() * max;
}

function rand_bet(min,max){
   return Math.random() * (max-min) + min;
}

class Circle{
  constructor(color='') {
    this.start = Math.PI/180*rand(180)
    this.radius = rand(150)
    this.shift = Math.PI/rand_bet(80,500)
    this.sign = Math.floor(rand(2))

    this.color = color

    console.log("開始角度:",this.start);

    this.x_list = []
  }

  calc(ctx,x,y){
    //let shift = Math.PI/180.0;
    ctx.beginPath();
    ctx.strokeStyle  = 'rgb(114,110,104)';
    ctx.arc(x,y, this.radius, 0, Math.PI*2, this.sign);
    ctx.stroke();

    let degree = this.shift * call_count;
    if(!this.sign)degree = -degree
    let mx = Math.cos(degree+this.start)*this.radius+x;
    let my = Math.sin(degree+this.start)*this.radius+y;

    //ctx.strokeStyle = 'rgb(255,248,245)';
    ctx.strokeStyle = 'rgb(132,105,102)';
    ctx.beginPath();

    ctx.moveTo(x,y);
    ctx.lineTo(mx,my);
    ctx.closePath();

    ctx.stroke();

    this.x_list.push(mx);
    if(this.x_list>max_h*2)this.x_list.shift();

    this.draw_line(ctx,my)

    return {x:mx,y:my};
  }


  draw_line(ctx,my){
    ctx.fillStyle = this.color;

    this.x_list.reverse();
    for(let y=0;y<max_h;y++){
      ctx.fillRect(this.x_list[y], my+y, 1, 1);
    }
    this.x_list.reverse();
    if(this.x_list.length>max_h+100)this.x_list.shift();
    /*
    this.x_list.reverse();
    for(let y=0;y<max_h;y++){
      ctx.fillRect(this.x_list[y]-400, y, 1, 1);
    }
    this.x_list.reverse();
    if(this.x_list.length>max_h+100)this.x_list.shift();
    */
  }


}

let circle_num = 3;

let circle = [];
for(let i=0;i<circle_num;i++){
  circle.push(new Circle('rgb(114,110,104)'));
}
circle[circle_num-1].color='rgb(255,255,255)';

let call_count = 0;
function draw() {
  var ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.fillStyle = 'RGB(30,30,35)';
  ctx.fillRect(0, 0, max_w, max_h);
  ctx.closePath();

  let cyclus = 200.0;
  //let y=max_h/2;
  let gain = 100;

  let x = max_w/2;
  let y = 200;

  let shift = Math.PI/180.0;

  let result = {x:x,y:y};

  for(let i=0;i<circle_num;i++){
    result = circle[i].calc(ctx,result.x,result.y)
  }

  call_count++;
}

setInterval(draw,10);
