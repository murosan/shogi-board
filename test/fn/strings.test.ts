import {
  rowString,
  colString,
  locationString,
  turnOverPieceName,
  pieceId
} from '../../src/fn/strings';

test('行(段)、列(筋)の文字列が取得できる', () => {
  expect(colString(6)).toBe('３');
  expect(rowString(3)).toBe('四');
  expect(locationString(5, 2)).toBe('７六');
  expect(locationString(-1, -1)).toBe('持ち駒');
});

test('駒名を成ったとき、持ち駒化したとき変えることができる', () => {
  expect(turnOverPieceName('歩', 'promote')).toBe('と');
  expect(turnOverPieceName('歩', 'demote')).toBe('歩');
  expect(turnOverPieceName('と', 'demote')).toBe('歩');
});

test('駒のIdを取得できる', () => {
  expect(pieceId('歩', 0, false)).toBe('fu-0');
  expect(pieceId('歩', 0, true)).toBe('fu-1');
  expect(pieceId('歩', 1, false)).toBe('fu-1');
  expect(pieceId('歩', 1, true)).toBe('fu-0');
  expect(pieceId('香', 0, false)).toBe('ky-0');
  expect(pieceId('香', 0, true)).toBe('ky-1');
  expect(pieceId('香', 1, false)).toBe('ky-1');
  expect(pieceId('香', 1, true)).toBe('ky-0');
  expect(pieceId('桂', 0, false)).toBe('ke-0');
  expect(pieceId('桂', 0, true)).toBe('ke-1');
  expect(pieceId('桂', 1, false)).toBe('ke-1');
  expect(pieceId('桂', 1, true)).toBe('ke-0');
  expect(pieceId('銀', 0, false)).toBe('gi-0');
  expect(pieceId('銀', 0, true)).toBe('gi-1');
  expect(pieceId('銀', 1, false)).toBe('gi-1');
  expect(pieceId('銀', 1, true)).toBe('gi-0');
  expect(pieceId('金', 0, false)).toBe('ki-0');
  expect(pieceId('金', 0, true)).toBe('ki-1');
  expect(pieceId('金', 1, false)).toBe('ki-1');
  expect(pieceId('金', 1, true)).toBe('ki-0');
  expect(pieceId('飛', 0, false)).toBe('hi-0');
  expect(pieceId('飛', 0, true)).toBe('hi-1');
  expect(pieceId('飛', 1, false)).toBe('hi-1');
  expect(pieceId('飛', 1, true)).toBe('hi-0');
  expect(pieceId('角', 0, false)).toBe('ka-0');
  expect(pieceId('角', 0, true)).toBe('ka-1');
  expect(pieceId('角', 1, false)).toBe('ka-1');
  expect(pieceId('角', 1, true)).toBe('ka-0');
  expect(pieceId('玉', 0, false)).toBe('gy-0');
  expect(pieceId('玉', 0, true)).toBe('gy-1');
  expect(pieceId('玉', 1, false)).toBe('gy-1');
  expect(pieceId('玉', 1, true)).toBe('gy-0');
  expect(pieceId('と', 0, false)).toBe('to-0');
  expect(pieceId('と', 0, true)).toBe('to-1');
  expect(pieceId('と', 1, false)).toBe('to-1');
  expect(pieceId('と', 1, true)).toBe('to-0');
  expect(pieceId('成香', 0, false)).toBe('ny-0');
  expect(pieceId('成香', 0, true)).toBe('ny-1');
  expect(pieceId('成香', 1, false)).toBe('ny-1');
  expect(pieceId('成香', 1, true)).toBe('ny-0');
  expect(pieceId('成桂', 0, false)).toBe('nk-0');
  expect(pieceId('成桂', 0, true)).toBe('nk-1');
  expect(pieceId('成桂', 1, false)).toBe('nk-1');
  expect(pieceId('成桂', 1, true)).toBe('nk-0');
  expect(pieceId('成銀', 0, false)).toBe('ng-0');
  expect(pieceId('成銀', 0, true)).toBe('ng-1');
  expect(pieceId('成銀', 1, false)).toBe('ng-1');
  expect(pieceId('成銀', 1, true)).toBe('ng-0');
  expect(pieceId('龍', 0, false)).toBe('ry-0');
  expect(pieceId('龍', 0, true)).toBe('ry-1');
  expect(pieceId('龍', 1, false)).toBe('ry-1');
  expect(pieceId('龍', 1, true)).toBe('ry-0');
  expect(pieceId('馬', 0, false)).toBe('um-0');
  expect(pieceId('馬', 0, true)).toBe('um-1');
  expect(pieceId('馬', 1, false)).toBe('um-1');
  expect(pieceId('馬', 1, true)).toBe('um-0');
});
