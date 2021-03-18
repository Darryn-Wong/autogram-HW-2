var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;

var index = 0;
var size;
var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
initIndex();
function initIndex() {
    var thumbnail = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    let curi = 0;
    thumbnail.forEach (i => {
        i.setAttribute('data-index', curi++);
    });
    size = curi;
}
document.querySelector('#left-btn').addEventListener('click', ()=>{
    if(index === 0) {
        index = size - 1;
    } else {
        index--;
    }
    var target = document.querySelector(`[data-index="${index}"]`);
    setDetails(imageFromThumb(target), titleFromThumb(target));
});
document.querySelector('#right-btn').addEventListener('click', ()=>{
    if(index >= size - 1) {
        index = 0;
    } else {
        index++;
    }
    var target = document.querySelector(`[data-index="${index}"]`);
    setDetails(imageFromThumb(target), titleFromThumb(target));
});
function setDetails(imageUrl, titleText) {
    'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);
    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}
function setDetailsFromThumb(thumbnail) {
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}
function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
        index = thumb.dataset.index;
        showDetails();
    });
}
function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}
function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();
}
function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup', function (event) {
    event.preventDefault();
    console.log(event.keyCode);
    if (event.keyCode === ESC_KEY) {
        hideDetails();
    }
    });
}
initializeEvents();
function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}
function showDetails() {
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function () {
    frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
   }