export function rowString(r: number): string {
  const row: Array<string> = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];
  return row[r];
}

export function colString(c: number): string {
  const col: Array<string> = ['９', '８', '７', '６', '５', '４', '３', '２', '１'];
  return col[c];
}

export function locationString(r: number, c: number): string {
  if (0 <= r && r <= 8 && 0 <= c && c <= 8) {
    return colString(c) + rowString(r);
  } else {
    return '持ち駒';
  }
}

export function turnOverPieceName(name: string, opt: 'promote' | 'demote'): string {
  function isOnBoardAndPromoted(index: number): Boolean {
    return index < 8 && opt === 'promote';
  }

  function isCaptured(index: number): Boolean {
    return 8 <= index && opt === 'demote';
  }

  const names = [
    '歩',
    '香',
    '桂',
    '銀',
    '金',
    '角',
    '飛',
    '玉',
    'と',
    '成香',
    '成桂',
    '成銀',
    '',
    '馬',
    '龍',
    ''
  ];
  const index = names.indexOf(name);
  if (isOnBoardAndPromoted(index)) {
    return names[index + 8];
  } else if (isCaptured(index)) {
    return names[index - 8];
  } else {
    return names[index];
  }
}

export function pieceId(name: string, w: number, isReversed: boolean): string {
  const whose = isReversed ? 1 - w : w;
  if (name === '玉') {
    return 'gy-' + whose;
  }
  if (name === '飛') {
    return 'hi-' + whose;
  }
  if (name === '角') {
    return 'ka-' + whose;
  }
  if (name === '金') {
    return 'ki-' + whose;
  }
  if (name === '銀') {
    return 'gi-' + whose;
  }
  if (name === '桂') {
    return 'ke-' + whose;
  }
  if (name === '香') {
    return 'ky-' + whose;
  }
  if (name === '歩') {
    return 'fu-' + whose;
  }
  if (name === '龍') {
    return 'ry-' + whose;
  }
  if (name === '馬') {
    return 'um-' + whose;
  }
  if (name === '成銀') {
    return 'ng-' + whose;
  }
  if (name === '成桂') {
    return 'nk-' + whose;
  }
  if (name === '成香') {
    return 'ny-' + whose;
  }
  /* name === 'と' */
  return 'to-' + whose;
}

export function generateKif(
  targetRow: number,
  targetCol: number,
  name: string,
  row: number,
  col: number,
  status: '' | '成' | '不成' | '打'
): string {
  const k = locationString(targetRow, targetCol) + name + status;
  if (status === '打') {
    return k;
  } else {
    return k + '(' + (9 - col) + (row + 1) + ')';
  }
}
