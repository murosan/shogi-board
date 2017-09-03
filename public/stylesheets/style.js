const $ = require('jquery');

function adjust() {
  if (!browserCheck()) {
    $(document).ready(adjustHeight);
    $(window).resize(adjustHeight);
  }
}

function browserCheck() {
  const userAgent = window.navigator.userAgent.toLowerCase();
  if (userAgent.includes('chrome')
    || userAgent.includes('safari')) {
    // css supported
    return true;
  } else {
    // need to adjust height
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