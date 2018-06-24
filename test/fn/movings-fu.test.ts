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

  test('持ち駒の歩の置き場所判定ができる2', async () => {
    const positions = initForTest(1);
    const target = positions.pos[7][0];
    const source = positions.cap1.captures.get('歩')[0];
    const moved = positions.move(target, source)[0];
    const fu = <PieceObj>moved.pos[7][0];
    fu.canMoveTo = movings({ pieceObj: fu, positions: positions });
    const fuMovings = fu.canMoveTo;
    expect(fuMovings.length).toEqual(1);
    expect(fuMovings[0].name).toEqual('・');
  });

  test('持ち駒の歩の置き場所判定ができる', async () => {
    const positions = initForTest(1);
    const fu = <PieceObj>positions.cap1.captures.get('歩')[0];
    fu.canMoveTo = movings({ pieceObj: fu, positions: positions });
    const fuMovings = fu.canMoveTo;
    expect(fuMovings.length).toEqual(22);
  });
});
