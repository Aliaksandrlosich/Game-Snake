let highscore = 0;
const zoomIn = document.getElementById('zoom');
const zoomOut = document.getElementById('zoomout');
const reset = document.getElementById("reset");
const canvas = document.getElementById("canvas");
const mobile = document.getElementById("mobile");
const hard = document.getElementById("hard");
const easy = document.getElementById("easy");
const normal = document.getElementById("normal");
const ctx = canvas.getContext("2d");
const w = 20, h = 20;
let zoom = 100;
let speed=15;
document.body.style.zoom=zoom+"%";//zoom settings


function init(){
    let dirChange=0;//to fix bug with changing directions
    let direct=0;
    addEventListener("keydown", direction);
   
   function direction(e){ //KeyControll
    if(dirChange){
    switch (e.keyCode){
        case 38:
        case 87: if (direct!=2 && direct!=1) {direct=1; dirChange=0;} 
        break; //w

        case 40:
        case 83: if (direct!=1 && direct!=2) {direct=2; dirChange=0;} 
        break; //s

        case 37:
        case 65: if (direct!=4 && direct!=3) {direct=3;dirChange=0;} 
        break; //a

        case 39:
        case 68: if (direct!=3 && direct!=4) {direct=4;dirChange=0;} 
        break; //d

        case 13: init(); 
        break; //restart

        case 69: zoomingout(); 
        break; //zoom+

        case 81: zooming(); 
        break;  //zoom-
        }}
    }//changes the direction

    function zooming(){
        zoom+=10;
        if (zoom>200){
            zoom=50;
        }
        document.body.style.zoom=zoom+"%";
    }

    zoomIn.onclick=zooming;

    function zoomingout(){
        zoom-=10;
        if (zoom<50){
            zoom=200;
        }
        document.body.style.zoom=zoom+"%";
    }

    zoomOut.onclick=zoomingout;

    reset.onclick=init;

    function rand(n){
    let z=Math.round((Math.random()*(n-1))/h)*h;
    if (z==canvas.height) z-=h;
    return z;

}
//creates a random position from 0 to cvs.height
function newApple(){
    xa=rand(canvas.width); ya=rand(canvas.height);
    for (var i=0;i<=l-1;i+=1){
        if (snake[i][0]==xa && snake[i][1]==ya) newApple();
        }
}

function easygame(){
        speed = 15;
        return speed;
    }
easy.onclick=easygame;

function normalgame(){
         speed = 9;
        return speed;
    }
normal.onclick=normalgame;

function hardgame(){
        speed = 4;
        return speed;
    }
hard.onclick=hardgame;
let score=0;
let l=1;//length of snake
let xa=rand(canvas.width);//position of apple
let ya=rand(canvas.height);
let times=0;
let x=canvas.width/2-w;
let y=canvas.height/2-h;//center position
let snake=[[]];
snake[0][0]=x;
snake[0][1]=y;//coordinates of snakes body
function draw(){
    ctx.fillStyle="gray";
    var bg=ctx.fillRect(0,0,canvas.width,canvas.height);//background
        if (times%speed==0){
            if (xa==x && ya==y){
                newApple();
                l+=1;
                snake.push([]);
                score+=1;
        }//collecting an apple
            for (var i=l-1;i>=1;i-=1){
                snake[i][0]=snake[i-1][0];
                snake[i][1]=snake[i-1][1];
            }//changes positions of all snake's blocks cavas except the first one 
            switch (direct){
                case 1: y-=h; break;
                case 2: y+=h; break;
                case 3: x-=w; break;
                case 4: x+=w; break;
            }
        dirChange=1;
            if (x>=canvas.width){x=canvas.width-x;}
            else if (x<0){x=canvas.width+x;}
            if (y>=canvas.height) {y=canvas.height-y;}
        else if (y<0){y=canvas.height+y;}//if block's position is off the screen
        snake[0][0]=x;
        snake[0][1]=y;//changes position of the first block
    
        for (var i=l-1;i>=1;i-=1){
                if (snake[0][0]==snake[i][0]&& snake[0][1]==snake[i][1]){
                    if (highscore<score) highscore=score;
                    alert("Gameover. Your score="+score+". Highscore="+highscore+".");
                    return;
                }
            }//checks if snake bumps in itself
        }
        ctx.fillStyle="red";
        switch (speed){
                case 4: ctx.strokeStyle="red"; break;
                case 9: ctx.strokeStyle="blue"; break;
                case 15: ctx.strokeStyle="green"; break;
            }
        ctx.fillRect(xa,ya,w,h);//draws an apple
        ctx.strokeRect(xa,ya,w,h);
        ctx.fillStyle="green";
        for (var i=l-1;i>=0;i-=1){
            ctx.fillRect(snake[i][0],snake[i][1],w,h);ctx.strokeRect(snake[i][0],snake[i][1],w,h);
        }//draws the snake
        ctx.strokeStyle="black";
        ctx.font = '20px Arial';
        ctx.strokeText("Score="+score,5,20);//prints the score
        times+=1;
        requestAnimationFrame(draw);
    }
    draw();
}

window.onload=init;

