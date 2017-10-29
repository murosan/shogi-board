import { Kif, OneStep, KifComponent } from '../../src/game-handler/kif';
import Branch from '../../src/game-handler/branch';
import Positions from '../../src/game-handler/positions';
import PieceObj from '../../src/game-handler/piece';
import init from '../../src/fn/init';

describe('Kif', async () => {
  const positions: Positions = init();
  const oneStep: OneStep = { positions: positions, str: '開始局面' };
  const kif = new Kif([oneStep]);

  test('初期局面の棋譜を生成できる', async () => {
    expect(kif).toBeInstanceOf(Kif);
    expect(kif.history[0]).toEqual(oneStep);
  });

  test('現在局面を取得できる', async () => {
    expect(kif.getCurrent()).toEqual(oneStep);
  });

  test('棋譜を追加できる / 表示箇所を変更できる', async () => {
    const target = positions.pos[5][2];
    const source = <PieceObj>positions.pos[6][2];
    const moved = positions.move(target, source);
    const nextOneStep: OneStep = {
      str: moved[1],
      positions: moved[0],
    };
    const added = kif.add(nextOneStep, kif.getCurrent());
    expect(added.history.length).toBe(2);
    expect(added.displayIndex).toBe(1);
    expect(added.history).toEqual([oneStep, nextOneStep]);
    expect(added.changeIndex(oneStep).displayIndex).toBe(0);
  });
});
