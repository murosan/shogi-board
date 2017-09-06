const $ = require('jquery');

function adjust() {
  if (!browserCheck()) {
    $(document).ready(adjustHeight);
    $(window).resize(adjustHeight);
  }
}

function browserCheck() {
  const userAgent = window.navigator.userAgent.toLowerCase();
  // true: css supported, false: need to fix height
  if (userAgent.includes('msie') || userAgent.includes('trident')) {
    // ie
    return false;
  } else if (userAgent.includes('edge')) {
    // edge
    return false;
  } else if (userAgent.includes('chrome')) {
    // chrome
    return true;
  } else if (userAgent.includes('safari')) {
    // safari
    return true;
  } else if (userAgent.includes('firefox')) {
    // firefox
    return false;
  } else if (userAgent.includes('opera')) {
    // opera
    return false;
  } else {
    return false;
  }
}

function adjustHeight() {
  $('.corner').each((i, e) => $(e).css('height', $(e).width()));
  $('.cell').each((i, e) => $(e).css('height', $(e).width() * 1.09));
  adjustCapPiece();
}

function adjustCapPiece() {
  if (!browserCheck()) {
    $('.cap-piece').each((i, e) => $(e).css('height', $(e).width() * 1.09));
  }
}

module.exports = {
  adjust: adjust,
  adjustCapPiece: adjustCapPiece
};