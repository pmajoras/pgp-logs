'use strict';
var $ = require('jquery');

function deepCopy(oldObject) {
  return $.extend(true, {}, oldObject);
}

function scrollTo(element, animationTime) {
  $('html, body').animate({
    scrollTop: $(element).offset().top
  }, animationTime || 1000);
}

module.exports = {
  deepCopy: deepCopy,
  scrollTo: scrollTo
};
