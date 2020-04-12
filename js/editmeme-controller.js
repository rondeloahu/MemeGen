'use strict';
var gCanvas = document.querySelector('canvas');
var gFocusOnText = false;
var gFirstTime = true;
var gLoadedImg = false;
var gLocalImg;
var gFocused = false;

function resizeCanvas() {
    var imgId = getSelectedImg()
    var elImg = document.querySelector(`.img-${imgId}`)
    var ratio = elImg.width / elImg.height
    gCanvas.width = 600;
    gCanvas.height = (gCanvas.width / ratio)
    gFirstTime = false;
}

function toggleFocus(bool) {
    gFocusOnText = bool;
}

function onRenderCanvas() {
    gCtx = gCanvas.getContext('2d');
    if (gLocalImg) {
        drawSavedImg();
        renderText();
        if (!gFocused) drawFocus();
        else gFocused = true;
    } else drawImg();

    if (gFirstTime) resizeCanvas();
}

function renderText() {
    var meme = getMeme()
    var lines = meme.lines
    if (lines.length === 0) return
    lines.forEach(line => drawText(line))
}

function onAddLine() {
    var txtLine = document.querySelector('#textOnMeme').value;
    (txtLine) ? addLine(txtLine) : addLine();
    document.querySelector('#textOnMeme').value = null;
    drawFocus();
    onRenderCanvas();
}

function onChangePos(ev) {
    ev.preventDefault();
    gFocused = false;
    if (gFocusOnText) {
        changeX(ev.offsetX);
        changeY(ev.offsetY);
        onRenderCanvas();
    }
}
function onDelLine() {
    delLine();
    getFocusLine();
    onRenderCanvas();
}

function onTextInc() {
    incFontSize();
    onRenderCanvas();
}
function onTextDec() {
    decFontSize();
    onRenderCanvas();
}
function onFillColorChange(fill) {
    editMeme('fill', fill);
    onRenderCanvas();
}
function onStrokeColorChange(stroke) {
    editMeme('strokeColor', stroke);
    onRenderCanvas();
}
function onTextAlign(align) {
    editMeme('align', align);
    onRenderCanvas();
}
function onChangeText(txt) {
    editMeme('txt', txt);
    onRenderCanvas();
}
function onChangeFont(font) {
    editMeme('font', font);
    onRenderCanvas();
}

function onChangeFocus() {
    gFocused = false;
    getFocusLine();
    drawFocus();
    onRenderCanvas();
    document.querySelector('#textOnMeme').value= null; 
    document.querySelector('#textOnMeme').placeholder = gMeme.lines[gMeme.selectedLineIdx].txt;
}

function downloadCanvas(elLink) {
    gFocused = true;
    onRenderCanvas();
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'MyMeme.jpg'
}
function onSaveCanvas(){
    gFocused = true;
    onRenderCanvas();
    const data = gCanvas.toDataURL()
    saveMeme(data);
}
