'use strict';
const gGallery = document.querySelector('.gallery');
const gSearch = document.querySelector('.search')
const gEditor = document.querySelector('.canvas-container');
const gAbout =  document.querySelector('.about');
const gMemeGallery = document.querySelector('.memes');

function onInit() {
    createImgs();
    doTrans();
    onRenderKeywords();
    onRenderSearch();
    onRenderGallery();
}

function onRenderGallery() {
    const imgs = getImgs();
    var strHtmls = '';
    imgs.forEach(img => {
        strHtmls += `<img src="./${img.src}" class="img-${img.id}" onclick="onEditMeme(${img.id})">`
    })
    document.querySelector('.gallery').innerHTML = strHtmls;
}
function onRenderSearch(){
    var keywords = getKeyWords();
    var strHtmls='';
    for (var keyword in keywords) {
        strHtmls +=`<option value="${keyword}">`
    }
    document.querySelector('#keywords').innerHTML = strHtmls;
}

function onRenderKeywords() {
    var keywords = getKeyWords();
    var strHtmls = ''
    for (var keyword in keywords) {
        var fontSize = 20 + keywords[keyword]
        strHtmls += `<span class="search-btn" onclick="onFilterByKey('${keyword}')" style="font-size:${fontSize}px">${keyword}</span>`
    }
    document.querySelector('.keywords').innerHTML = strHtmls
}
function goToGallery(){
    toggleHidden(gGallery);
    toggleHiddenElments(gEditor,gAbout,gMemeGallery,gSearch);
    resetMeme();
    removeActive('about-head');
    removeActive('meme-head');
    document.querySelector('.gallery-head').classList.add('active');
    document.querySelector('#textOnMeme').value = null;
}
function openAbout(){
    toggleHidden(gAbout);
    removeActive('gallery-head');
    removeActive('meme-head');
    document.querySelector('.about-head').classList.add('active')
    toggleHiddenElments(gEditor,gSearch,gGallery,gMemeGallery);
}
function onEditMeme(imgId) {
    toggleHidden(gEditor);
    toggleHiddenElments(gAbout,gSearch,gGallery,gMemeGallery);
    document.querySelector('.active').classList.remove('active');
    var meme = getMemeByImg(imgId);
    document.querySelector('#textOnMeme').placeholder = `${meme.lines[0].txt}`;
    onRenderCanvas();
}
function onFilterByKey(value){
    getFilterd(value);
    onRenderGallery();
}

function toggleMenu() {
    document.body.classList.toggle('menu-open')
}
