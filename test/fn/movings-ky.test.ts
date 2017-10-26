import PieceObj from '../../src/game-handler/piece';
import movings from '../../src/fn/movings';
import initForTest from '../init-pos-for-test';

describe('movings-ky', async () => {
  test('盤上の動き判定ができる', async () => {
    const positions = initForTest(0);
    const target1 = positions.pos[8][0];
    const source1 = positions.cap1.captures.get('香')[0];
    const putKy = positions.move(target1, source1)[0];
    const target2 = putKy.pos[7][6];
    const source2 = <PieceObj>putKy.pos[7][8];
    const changeTurn = putKy.move(target2, source2)[0];
    const kyou = <PieceObj>changeTurn.pos[8][0];
    kyou.canMoveTo = movings({ pieceObj: kyou, positions: positions });
    expect(kyou.canMoveTo.length).toEqual(3);
  });

  test('持ち駒を置ける場所を判定できる', async () => {
    const positions = initForTest(0);
    const kyou = positions.cap0.captures.get('香')[0];
    kyou.canMoveTo = movings({ pieceObj: kyou, positions: positions });
    expect(kyou.canMoveTo.length).toEqual(47);
  });
});
