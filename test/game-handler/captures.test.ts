import Captures from '../../src/game-handler/captures';
import PieceObj from '../../src/game-handler/piece';

test('持ち駒を作成、更新ができる', () => {
  expect(new Captures(0).update()).toBeInstanceOf(Captures);
});

test('持ち駒があるか判定できる', () => {
  expect(new Captures(0).nonEmpty()).toBeFalsy();
  expect(new Captures(0).isEmpty()).toBeTruthy();
});

test('持ち駒を増やすことができる', () => {
  const inc = new Captures(0).inc(new PieceObj('歩', 0, -1, -1));
  expect(inc.captures.get('歩').length).toBe(1);
});

test('持ち駒を減らすことができる', () => {
  const inc = new Captures(0).inc(new PieceObj('歩', 0, -1, -1));
  const dec = inc.dec(inc.captures.get('歩')[0]);
  expect(dec.captures.get('歩').length).toBe(0);
});

test('持ち駒を減らすことができる(複数あっても)', () => {
  const inc = new Captures(0)
    .inc(new PieceObj('歩', 0, -1, -1))
    .inc(new PieceObj('歩', 0, -1, -1));
  const dec = inc.dec(inc.captures.get('歩')[0]);
  expect(dec.captures.get('歩').length).toBe(1);
});
