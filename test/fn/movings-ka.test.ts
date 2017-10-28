import PieceObj from '../../src/game-handler/piece';
import PromotionConfirmObj from '../../src/game-handler/promotion-confirm';
import movings from '../../src/fn/movings';
import initForTest from '../init-pos-for-test';
import init from '../../src/fn/init';

describe('movings-ka', async () => {
  test('盤上の動き判定ができる(角)', async () => {
    const positions = initForTest(0);
    const kaku = <PieceObj>positions.pos[7][6];
    kaku.canMoveTo = movings({ pieceObj: kaku, positions: positions });
    expect(kaku.canMoveTo.length).toEqual(7);
  });

  test('盤上の動き判定ができる(馬)', async () => {
    const pos = init();
    // 76歩
    const m1 = pos.move(pos.pos[5][2], <PieceObj>pos.pos[6][2]);
    // 34歩
    const pos2 = m1[0].pos;
    const m2 = m1[0].move(pos2[3][6], <PieceObj>pos2[2][6]);
    // 22角
    const pos3 = m2[0].pos;
    const m3 = m2[0].move(pos3[1][7], <PieceObj>pos3[7][1]);
    // 成
    const pos4 = m3[0].pos;
    const promotionConfirm = <PromotionConfirmObj>pos4[1][7];
    const m4 = m3[0].move(pos4[1][7], promotionConfirm.promoted);
    // changeTurn
    const pos5 = m4[0].pos;
    const changeTurn = m4[0].move(pos5[3][1], <PieceObj>pos5[2][1]);
    // test
    const uma = <PieceObj>changeTurn[0].pos[1][7];
    uma.canMoveTo = movings({ pieceObj: uma, positions: changeTurn[0] });
    expect(uma.canMoveTo.length).toEqual(13);
  });

  test('持ち駒を置ける場所を判定できる', async () => {
    const positions = initForTest(0);
    const kaku = positions.cap0.captures.get('角')[0];
    kaku.canMoveTo = movings({ pieceObj: kaku, positions: positions });
    expect(kaku.canMoveTo.length).toEqual(56);
  });
});
