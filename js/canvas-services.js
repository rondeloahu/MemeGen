'use strict';
var gCanvas;
var gCtx;


function drawText(line) {
    var text = line.txt;
    var size = line.size;
    var fill = line.fill;
    var stroke = line.strokeColor;
    var font = line.font;
    var x = line.positionX;
    var y = line.positionY;
    gCtx.textAlign = line.align;
    gCtx.font = size + `px ${font}`;
    gCtx.strokeStyle = stroke;
    gCtx.fillStyle = fill;
    gCtx.lineWidth = 2;
    gCtx.fillText(text, x, y);
    gCtx.setLineDash([0, 0])
    gCtx.strokeText(text, x, y);
}

function moveText() {
    var text = gMeme.lines[gMeme.selectedLineIdx].txt;
    var x = gMeme.lines[gMeme.selectedLineIdx].positionX;
    var y = gMeme.lines[gMeme.selectedLineIdx].positionY;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}
function getALine() {
    var meme = getMeme();
    if (meme.lines.length === 0) return
    var line = meme.lines[meme.selectedLineIdx]
    return line;
}
function drawFocus() {
    var line = getALine();
    var posX = line.positionX;
    var posY = line.positionY;
    gCtx.beginPath()
    var sizing = gCtx.measureText(line.txt).width;
    gCtx.rect(posX - sizing /2 - line.size/2 , posY - line.size, sizing + line.size, line.size + 10)
    gCtx.setLineDash([4, 4])
    gCtx.strokeStyle = 'black'
    gCtx.stroke()
}

function addLine(txt = 'Make a new Text') {
    var line = {
        txt,
        font: 'impact',
        size: 50,
        align: 'center',
        strokeColor: 'black',
        fill: 'white',
        positionX: 350,
        positionY: 250
    }
    gMeme.lines.push(line);
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function changeX(num) {
    gMeme.lines[gMeme.selectedLineIdx].positionX = num;
}
function changeY(num) {
    gMeme.lines[gMeme.selectedLineIdx].positionY = num;
}
function drawImg() {
    var img = new Image()
    img.src = `./${gMeme.imgUrl}`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
        renderText();
        gLocalImg = img;
    }
}
function drawSavedImg() {
    gCtx.drawImage(gLocalImg, 0, 0, gCanvas.width, gCanvas.height)
}

function incFontSize(){
    const line = getALine();
    line.size++;
}
function decFontSize(){
    const line = getALine();
    if(line.size > 5) line.size--;
}

