import PieceObj from '../../src/game-handler/piece';
import movings from '../../src/fn/movings';
import initForTest from '../init-pos-for-test';

describe('movings-hi', async () => {
  test('盤上の動き判定ができる(飛車)', async () => {
    //手番を後手に設定
    const positions = initForTest(1);
    const target1 = positions.pos[3][4];
    const source1 = positions.cap1.captures.get('飛')[0];
    const putHisha = positions.move(target1, source1)[0];
    const target2 = putHisha.pos[3][0];
    const source2 = <PieceObj>putHisha.pos[4][0];
    const changeTurn = putHisha.move(target2, source2)[0];
    const hisha = <PieceObj>changeTurn.pos[3][4];
    hisha.canMoveTo = movings({ pieceObj: hisha, positions: changeTurn });
    expect(hisha.canMoveTo.length).toEqual(9);
  });

  test('盤上の動き判定ができる(龍)', async () => {
    const positions = initForTest(1);
    const ryu = <PieceObj>positions.pos[7][8];
    ryu.canMoveTo = movings({ pieceObj: ryu, positions: positions });
    expect(ryu.canMoveTo.length).toEqual(12);
  });

  test('持ち駒を置ける場所を判定できる', async () => {
    //手番を後手に設定
    const positions = initForTest(1);
    const hisha = positions.cap1.captures.get('飛')[0];
    hisha.canMoveTo = movings({ pieceObj: hisha, positions: positions });
    expect(hisha.canMoveTo.length).toEqual(56);
  });
});
