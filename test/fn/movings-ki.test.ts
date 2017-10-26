import PieceObj from '../../src/game-handler/piece';
import movings from '../../src/fn/movings';
import initForTest from '../init-pos-for-test';

describe('movings-ki', async () => {
  test('盤上の動き判定ができる', async () => {
    const positions = initForTest(0);
    const kin = <PieceObj>positions.pos[7][2];
    kin.canMoveTo = movings({ pieceObj: kin, positions: positions });
    expect(kin.canMoveTo.length).toEqual(3);
  });

  test('持ち駒を置ける場所を判定できる', async () => {
    const positions = initForTest(0);
    const kin = positions.cap0.captures.get('金')[0];
    kin.canMoveTo = movings({ pieceObj: kin, positions: positions });
    expect(kin.canMoveTo.length).toEqual(56);
  });
});
