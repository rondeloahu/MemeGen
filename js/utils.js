'use strict'

// Local Storage

function saveToStorage(key, value) {
    var item = JSON.stringify(value)
    localStorage.setItem(key, item)
}

function loadFromStorage(key) {
    var item = localStorage.getItem(key)
    var value = JSON.parse(item)
    if (value) return value
    else return []
}

//id
function makeId(length = 5) {
    var txt = '';
    var possible = '0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

//toggle hidden
function toggleHidden(elm){
    elm.classList.toggle('hidden');
}

//toggle active
function removeActive(classname){
    document.querySelector(`.${classname}`).classList.remove('active');
}

function toggleHiddenElments(a,b,c,d){
    if(!a.classList.contains('hidden'))toggleHidden(a);
    if(!b.classList.contains('hidden'))toggleHidden(b);
    if(!c.classList.contains('hidden'))toggleHidden(c);
    if(!d.classList.contains('hidden'))toggleHidden(d);
}