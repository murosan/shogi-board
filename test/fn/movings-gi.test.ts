import PieceObj from '../../src/game-handler/piece';
import movings from '../../src/fn/movings';
import initForTest from '../init-pos-for-test';

describe('movings-gi', async () => {
  test('盤上の動き判定ができる', async () => {
    const positions = initForTest(0);
    const gin = <PieceObj>positions.pos[6][3];
    gin.canMoveTo = movings({ pieceObj: gin, positions: positions });
    expect(gin.canMoveTo.length).toEqual(2);
  });

  test('持ち駒を置ける場所を判定できる', async () => {
    const positions = initForTest(0);
    const gin = positions.cap0.captures.get('銀')[0];
    gin.canMoveTo = movings({ pieceObj: gin, positions: positions });
    expect(gin.canMoveTo.length).toEqual(56);
  });
});
