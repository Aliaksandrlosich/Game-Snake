let highscore=0;
const zoomIn=document.getElementById('zoom');
const zoomOut=document.getElementById('zoomout');
const reset=document.getElementById("reset");
const canvas=document.getElementById("canvas");
const mobile=document.getElementById("mobile");
const ctx=canvas.getContext("2d");
const w=20, h=20;
let zoom=100;
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

   
