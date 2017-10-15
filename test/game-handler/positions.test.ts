import PieceObj from '../../src/game-handler/piece';
import Captures from '../../src/game-handler/captures';
import PromotionConfirmObj from '../../src/game-handler/promotion-confirm';
import Positions from '../../src/game-handler/positions';
import EmpObj from '../../src/game-handler/emp';
import { CellComponent } from '../../src/game';
import init from '../../src/fn/init';

describe('Positions', async () => {
  test('作成できる', async () => {
    expect(init()).toBeInstanceOf(Positions);
  });

  test('match関数が正常に動く', async () => {
    expect(init().match(init())).toBeTruthy();
  });

  test('move関数が正しく動き、Positionsと棋譜が返る', async () => {
    const pos = init();
    const target = pos.pos[5][2];
    const source = <PieceObj>pos.pos[6][2];
    const moved = pos.move(target, source);
    expect(moved[0]).toBeInstanceOf(Positions);
    expect(moved[1]).toMatch('７六歩');
  });

  test('move関数で持ち駒を打つことができる', async () => {
    // 76歩
    const pos = init();
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
    expect(m4[0].cap0.captures.get('角')).toHaveLength(1);
    // 同銀
    const pos5 = m4[0].pos;
    const m5 = m4[0].move(pos5[1][7], <PieceObj>pos5[0][6]);
    expect(m5[0].cap1.captures.get('角')).toHaveLength(1);
    // 77角打
    const pos6 = m5[0];
    const target = pos6.pos[6][2];
    expect(target).toBeInstanceOf(EmpObj);
    const kaku = pos6.cap0.captures.get('角')[0];
    expect(kaku).toBeInstanceOf(PieceObj);
    const m6 = pos6.move(target, kaku);
    expect(m6[0].pos[6][2]).toBeInstanceOf(PieceObj);
    expect(m6[0].cap0.captures.get('角')).toHaveLength(0);
  });
});
