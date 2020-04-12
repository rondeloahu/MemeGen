'use strict';
function onLoadMeme(){
    toggleHiddenElments(gGallery,gAbout,gSearch,gEditor);
    gMemeGallery.classList.remove('hidden')
    removeActive('gallery-head');
    removeActive('about-head');
    document.querySelector('.gallery-head').classList.remove('active')
    document.querySelector('.meme-head').classList.add('active')
    var savedMemes = getSavedMemesImg();
    var strHtmls = '';
    savedMemes.forEach((meme,idx) => {
        strHtmls += `<img src="${meme.img}" onclick="onEditSavedMeme('${meme.meme.selectedImgId}','${idx}')">`
    })
    document.querySelector('.memes').innerHTML = strHtmls;
}

function onEditSavedMeme(imgId,index){
    toggleHidden(gEditor);
    toggleHiddenElments(gAbout,gSearch,gGallery,gMemeGallery);
    document.querySelector('.meme-head').classList.remove('active');
    getMemeByImg(imgId);
    var savedMemes = getSavedMemesImg();
    var meme = savedMemes[index].meme;
    insertMeme(meme);
    document.querySelector('#textOnMeme').placeholder = `${meme.lines[0].txt}`;
    onRenderCanvas();
}