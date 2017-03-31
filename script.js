
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

let call_count = 0;
function draw() {
  var ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.fillStyle = 'RGB(30,30,35)';
  ctx.fillRect(0, 0, max_w, max_h);
  ctx.fillStyle = 'rgb(255,248,245)';

  let cyclus = 200.0;
  let y=max_h/2;
  let gain = 100;
  let shift = Math.PI/180 * 1;

  ctx.fillRect(max_w/2,50,10,50);
  ctx.fillRect(max_w/2,max_h-100,10,50);

  for(let i=300;i<max_w-300;i++){
    if(i%10==0){
      let degree = Math.PI/cyclus * i;
      if(Math.floor(rand(10))==1){
        if(Math.floor(rand(2))==1){
          ctx.fillRect(i, Math.sin(degree+shift*call_count)*gain+y,rand(500)-250,2);
        }else{
          ctx.fillRect(i, Math.sin(degree+shift*call_count)*gain+y,2,rand(500)-250);
        }
      }else{
        ctx.fillRect(i, Math.sin(degree+shift*call_count)*gain+y, 2, 2);
      }

    }
  }
  /*for(let i=0;i<max_w;i++){
    if(i%2==0){
      let degree = Math.PI/cyclus * i;
      ctx.fillRect(i, Math.sin(degree+shift*call_count)*gain+y, 2, 1);
    }
    call_count++;
  }*/
  /*for(let x=0;x*50<max_w;x++){
    for(let y=0; y*50<max_h;y++){
      if(Math.floor(rand(100))%100==0){
        ctx.fillRect(x*50, y*50, 1, rand(10));
      }else{
        ctx.fillRect(x*50, y*50, 1, 5);
      }
    }
  }*/
  call_count++;
}

setInterval(draw,100);
