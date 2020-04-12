'use strict';
var gFilterd = false;
var gMemeImags = [];
const KEY = 'memes';
var gSavedMemes;

var gKeyMap = {
    'woman': 1,
    'green': 1,
    'old meme': 12,
    'baby': 4,
    'cute': 6,
    'funny': 10,
    'evil': 4,
    'mad': 0,
    'dog': 1,
}

var gMeme = {
    imgUrl: '',
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [{
        txt: 'Make a Meme',
        font: 'impact',
        size: 50,
        align: 'center',
        strokeColor: 'black',
        fill: 'white',
        positionX: 300,
        positionY: 50
    }, {
        txt: 'With our MEMEGEN!',
        font: 'impact',
        size: 50,
        align: 'center',
        strokeColor: 'black',
        fill: 'white',
        positionX: 300,
        positionY: 350
    }]
}
function saveMeme(img){
    var memes = loadFromStorage(KEY);
    var memeObj = {
        img,
        meme: gMeme
    }
    if (!memes || !memes.length) {
        memes = [];
        memes.push(memeObj);  
    }else {
        memes.push(memeObj);
    }
    gSavedMemes = memes; 
    saveToStorage(KEY, gSavedMemes);
}

function getSavedMemesImg(){
    var memes = loadFromStorage(KEY);
    gSavedMemes = memes;
    return gSavedMemes;
}

function getMeme() {
    return gMeme;
}
function getImgs() {
    return gMemeImags;
}
function getKeyWords() {
    return gKeyMap;
}
var gId =0;
function _createImg(title, keywords) {
    return {
        id: gId++,
        src: `img/${title}.jpg`,
        keywords
    };
}
function getFilterd(value) {
    var imgs = getImgs()
    if (gFilterd) {
        createImgs();
        gFilterd = false;
    } else {
        var images = [];
        imgs.filter(img => {
            var keywords = img.keywords
            var isInclude = keywords.find(keyword => keyword.startsWith(value.toLowerCase()))
            if (isInclude) images.push(img);
        })
        gMemeImags = images;
        gFilterd = true;
    }
}

function createImgs() {
    var imgs = [];
    imgs.push(_createImg('1', ['woman', 'green', 'look at all', 'old meme']));
    imgs.push(_createImg('2', ['trump', 'politics', 'funny', 'mad', 'multi color']));
    imgs.push(_createImg('3', ['dogs', 'cute', 'love']));
    imgs.push(_createImg('4', ['baby', 'dog', 'sleeping', 'cute']));
    imgs.push(_createImg('5', ['baby', 'win', 'sucsses', 'old meme', 'cute']));
    imgs.push(_createImg('6', ['cat', 'sleeping', 'computer', 'cute']));
    imgs.push(_createImg('7', ['evil', 'sarcasm', 'funny', 'old meme']));
    imgs.push(_createImg('8', ['tell me more', 'man', 'purple']));
    imgs.push(_createImg('9', ['evil', 'baby', 'evil plot']));
    imgs.push(_createImg('10', ['aliens', 'man', 'funny']));
    imgs.push(_createImg('11', ['africa', 'happy', 'childrens']));
    imgs.push(_createImg('12', ['pointing', 'man', 'funny']));
    imgs.push(_createImg('13', ['trump', 'mad', 'funny face']));
    imgs.push(_createImg('14', ['dog', 'cute', 'funny']));
    imgs.push(_createImg('15', ['baby', 'cute', 'smile', 'pijama']));
    imgs.push(_createImg('16', ['obama', 'smile', 'man', 'politcian']));
    imgs.push(_createImg('17', ['man', 'basketball', 'couple']));
    imgs.push(_createImg('18', ['man', 'celeb', 'win', 'party']));
    imgs.push(_createImg('19', ['man', 'shock', 'funny', 'old meme']));
    imgs.push(_createImg('20', ['man', 'matrix', 'glasses', 'old meme']));
    gMemeImags = imgs;
}
function getMemeByImg(imgId) {
    const img = getImgById(imgId);
    gMeme.selectedImgId = img.id;
    gMeme.imgUrl = img.src;
    return gMeme;
}

function getImgById(imgId) {
    var img = gMemeImags.find(img => img.id == imgId);
    return img;
}
function getSelectedImg() {
    return gMeme.selectedImgId;
}

function resetMeme() {
    gMeme = {
        selectedImgId: 0,
        selectedLineIdx: 0,
        lines: [{
            txt: 'Make a Meme',
            font: 'impact',
            size: 50,
            align: 'center',
            strokeColor: 'black',
            fill: 'white',
            positionX: 250,
            positionY: 50
        }, {
            txt: 'With our MEMEGEN!',
            font: 'impact',
            size: 50,
            align: 'center',
            strokeColor: 'black',
            fill: 'white',
            positionX: 250,
            positionY: 350
        }]
    }
    gLocalImg = undefined;
    gFocusOnText = false;
    gFirstTime = true;
    gLoadedImg = false;
}
function editMeme(key, value) {
    if (gMeme.lines.length === 0) return
    const lineIdx = gMeme.selectedLineIdx;
    gMeme.lines[lineIdx][key] = value;
}
function delLine() {
    const lineIdx = gMeme.selectedLineIdx;
    gMeme.lines.splice(lineIdx, 1);
}
function getFocusLine() {
    if (gMeme.selectedLineIdx >= gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0;
    } else if (gMeme.lines.length === 0) return;
    else gMeme.selectedLineIdx++;
}
function insertMeme(savedMeme){
    Object.assign(gMeme, savedMeme)
    console.log(gMeme);
    
}