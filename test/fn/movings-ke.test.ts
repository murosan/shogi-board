import PieceObj from '../../src/game-handler/piece';
import movings from '../../src/fn/movings';
import initForTest from '../init-pos-for-test';

describe('movings-ke', async () => {
  test('盤上の動き判定ができる', async () => {
    const positions = initForTest(0);
    const kei = <PieceObj>positions.pos[6][6];
    kei.canMoveTo = movings({ pieceObj: kei, positions: positions });
    expect(kei.canMoveTo.length).toEqual(2);
  });

  test('持ち駒を置ける場所を判定できる', async () => {
    const positions = initForTest(0);
    const kei = positions.cap0.captures.get('桂')[0];
    kei.canMoveTo = movings({ pieceObj: kei, positions: positions });
    expect(kei.canMoveTo.length).toEqual(39);
  });
});
