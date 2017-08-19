/**
 * return Object for React CSS
 * @param {Int} len 同種駒の枚数
 * @param {Int} count 何枚目か
 * @param {Int} zIndex CSS
 * @param {String} name 駒名
 * @param {Int} whose どちらの駒か 0 or 1
 */
export function setStyles(len: number, count: number, zIndex: number, name: string, whose: number) {
  const styleProperty = styleProps(whose);
  const attrs: any = new Object();
  attrs[styleProperty[0]] = 0;
  attrs['zIndex'] = zIndex;

  if (name === '飛' || name === '角') {
    attrs[styleProperty[1]] = posHi(len, count) + '%';
  } else if (name === '金' || name === '銀') {
    attrs[styleProperty[1]] = posKi(len, count) + '%';
  } else if (name === '桂' || name === '香') {
    attrs[styleProperty[1]] = posKe(len, count) + '%';
  } else {
    attrs[styleProperty[1]] = posFu(len, count) + '%';
    attrs['width'] = 28 + '%';
  }

  return attrs;
}

function styleProps(whose: number) {
  if (whose === 0)
    return ['bottom', 'left'];
  else
    return ['top', 'right'];
}


// 飛、角
function posHi(len: number, count: number) {
  if (len === 1) return 10;
  else return count * 20 - 20;
}

// 金、銀
function posKi(len: number, count: number) {
  if (len === 1) return 10;
  else if (len === 2) return count * 25 - 25;
  else if (len === 3) return count * 12 - 10;
  else return count * 9 - 9;
}

// 桂、香
function posKe(len: number, count: number) {
  if (len === 1) return 10;
  else if (len === 2) return count * 25 - 28;
  else if (len === 3) return count * 12 - 15;
  else return count * 10 - 15;
}

// 歩
function posFu(len: number, count: number) {
  if (len === 1) return 37;
  else if (len === 2) return count * 30 - 10;
  else if (len === 3) return count * 25 - 14;
  else if (len === 4) return count * 20 - 14;
  else if (len === 5) return count * 15 - 8;
  else if (len === 6) return count * 13 - 8;
  else if (len === 7) return count * 11 - 8;
  else if (len <= 14) return count * 100 / (len + 3) - 7;
  else return count * 100 / (len + 4) - 7;
}
