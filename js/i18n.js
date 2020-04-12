'use strict';
var gTrans = {
    pTitle: {
        en: 'Meme Gen',
        he: 'מימ גן'
    },
    navGallery:{
        en: 'Gallery',
        he: 'גלריה',
    },
    navMemes:{
        en: 'Memes',
        he: 'ממים',
    },
    navAbout:{
        en: 'About',
        he: 'אודות',
    },
    save: {
        en: 'Save',
        he: 'שמור',
    },
    download: {
        en: 'Download',
        he: 'הורדה',
    },
    search: {
        en: 'Search',
        he: 'חפש',
    },
    searchBar: {
        en: 'search a keyword',
        he: 'חפש מילות מפתח'
    },
    name:{
        en: 'Gal Rondel',
        he: 'גל רונדל'
    },
    prof:{
        en: 'Full-stack developer at your service.',
        he: '.מתכנת אתרים לשירותכם'
    },
    up:{
        en: ' Go Up',
        he: 'קפוץ למעלה'
    }
}
var gCurrLang = 'en';
function getTrans(transKey) {
    var langTransMap = gTrans[transKey]
    if (!langTransMap) return 'UNKNOWN';
    
    var trans = langTransMap[gCurrLang]
    if (!trans) trans = langTransMap['en']
    return trans;
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    console.log('els', els);
    els.forEach(el =>{
        const key = el.dataset.trans;
        const trans = getTrans(key)

        if (el.placeholder)  el.placeholder = trans
        else el.innerText = trans
    }) 
}

function setLang(lang) {
    gCurrLang = lang;
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function kmToMiles(km) {
    return km / 1.609;
}

function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
    doTrans();
}