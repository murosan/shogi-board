import PieceObj from '../../src/game-handler/piece';

test('駒のインスタンスを作成し更新できる', () => {
  const piece = new PieceObj('歩', 0, 6, 7).update();
  expect(piece).toBeInstanceOf(PieceObj);
});

test('canPromoteが正しい値を返す', () => {
  const piece = new PieceObj('歩', 0, 3, 7);
  expect(piece.canPromote(2)).toBeTruthy();
  expect(piece.canPromote(4)).toBeFalsy();
});

test('canMoveNextが正しい値を返す', () => {
  const turn = 0;
  const row = 4;
  expect(new PieceObj('歩', 0, 6, 7).canMoveNext(turn, row)).toBeTruthy();
});

test('駒のインスタンスを持ち駒化できる', () => {
  const captured = new PieceObj('と', 0, 2, 7).captured();
  expect(captured.whose).toBe(1);
  expect(captured.row).toBe(-1);
  expect(captured.name).toBe('歩');
});

test('駒を動かせる', () => {
  const moved = new PieceObj('歩', 0, 6, 7).move(5, 7);
  expect(moved.row).toBe(5);
  expect(moved.col).toBe(7);
});

test('駒を成れる', () => {
  const promoted = new PieceObj('歩', 0, 3, 7).promote(2, 7);
  expect(promoted.name).toBe('と');
  expect(promoted.row).toBe(2);
  expect(promoted.col).toBe(7);
});