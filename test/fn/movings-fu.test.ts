import PieceObj from '../../src/game-handler/piece';
import movings from '../../src/fn/movings';
import init from '../../src/fn/init';
import initForTest from '../init-pos-for-test';

describe('movings-fu', async () => {
  test('盤上で歩の動き判定ができる', () => {
    const positions = init();
    const fu = <PieceObj>positions.pos[6][7];
    fu.canMoveTo = movings({ pieceObj: fu, positions: positions });
    const fuMovings = fu.canMoveTo;
    expect(fuMovings.length).toEqual(1);
    expect(fuMovings[0]).toEqual(positions.pos[5][7]);
  });

  test('持ち駒の歩の置き場所判定ができる', () => {
    const positions = initForTest(1);
    const fu = <PieceObj>positions.cap1.captures.get('歩')[0];
    fu.canMoveTo = movings({ pieceObj: fu, positions: positions });
    const fuMovings = fu.canMoveTo;
    expect(fuMovings.length).toEqual(22);
  });
});
