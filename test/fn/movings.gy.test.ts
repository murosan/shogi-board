import PieceObj from '../../src/game-handler/piece';
import movings from '../../src/fn/movings';
import initForTest from '../init-pos-for-test';

describe('movings-gy', async () => {
  test('動き判定ができる', async () => {
    const positions = initForTest(0);
    const gyoku = <PieceObj>positions.pos[7][1];
    gyoku.canMoveTo = movings({ pieceObj: gyoku, positions: positions });
    expect(gyoku.canMoveTo.length).toEqual(6);
  });
});
