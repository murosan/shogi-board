import PieceObj from '../../src/game-handler/piece';
import movings from '../../src/fn/movings';
import initForTest from '../init-pos-for-test';

describe('movings-ka', async () => {
  test('盤上の動き判定ができる', async () => {
    const positions = initForTest(0);
    const kaku = <PieceObj>positions.pos[7][6];
    kaku.canMoveTo = movings({ pieceObj: kaku, positions: positions });
    expect(kaku.canMoveTo.length).toEqual(7);
  });

  test('持ち駒を置ける場所を判定できる', async () => {
    const positions = initForTest(0);
    const kaku = positions.cap0.captures.get('角')[0];
    kaku.canMoveTo = movings({ pieceObj: kaku, positions: positions });
    expect(kaku.canMoveTo.length).toEqual(56);
  });
});
