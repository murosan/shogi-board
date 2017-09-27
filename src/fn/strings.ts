export function rowString(r: number): string {
  const row: Array<string> = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];
  return row[r];
}

export function colString(c: number): string {
  const col: Array<string> = ['９', '８', '７', '６', '５', '４', '３', '２', '１'];
  return col[c];
}

export function locationString(r: number, c: number): string {
  if (isOnBoard(r, c)) {
    return colString(c) + rowString(r);
  } else {
    return '持ち駒';
  }
}

function isOnBoard(row: number, col: number): boolean {
  return 0 <= row && row <= 8 && 0 <= col && col <= 8;
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
  } else if (name === '飛') {
    return 'hi-' + whose;
  } else if (name === '角') {
    return 'ka-' + whose;
  } else if (name === '金') {
    return 'ki-' + whose;
  } else if (name === '銀') {
    return 'gi-' + whose;
  } else if (name === '桂') {
    return 'ke-' + whose;
  } else if (name === '香') {
    return 'ky-' + whose;
  } else if (name === '歩') {
    return 'fu-' + whose;
  } else if (name === '龍') {
    return 'ry-' + whose;
  } else if (name === '馬') {
    return 'um-' + whose;
  } else if (name === '成銀') {
    return 'ng-' + whose;
  } else if (name === '成桂') {
    return 'nk-' + whose;
  } else if (name === '成香') {
    return 'ny-' + whose;
  } else {
    /* name === 'と' */
    return 'to-' + whose;
  }
}

interface generateKifProps {
  targetRow: number;
  targetCol: number;
  name: string;
  row: number;
  col: number;
  status: '' | '成' | '不成' | '打';
}

export function generateKif(props: generateKifProps): string {
  const k = locationString(props.targetRow, props.targetCol) + name + status;
  if (status === '打') {
    return k;
  } else {
    return k + '(' + (9 - props.col) + (props.row + 1) + ')';
  }
}
