import { Kif, OneStep, KifComponent } from '../../src/game-handler/kif';
import Branch from '../../src/game-handler/branch';
import Positions from '../../src/game-handler/positions';
import PieceObj from '../../src/game-handler/piece';
import init from '../../src/fn/init';

describe('branch', async () => {
  const pos1: Positions = init();
  const oneStep: OneStep = { positions: pos1, str: '開始局面' };
  const kif = new Kif([oneStep]);
  const target1 = pos1.pos[5][2];
  const source1 = <PieceObj>pos1.pos[6][2];
  const moved1 = pos1.move(target1, source1);
  const os1: OneStep = {
    str: moved1[1],
    positions: moved1[0],
  };
  const kif2: Kif = kif.add(os1, kif.getCurrent());
  const indexChanged: Kif = kif2.changeIndex(oneStep);
  const target2 = pos1.pos[5][7];
  const source2 = <PieceObj>pos1.pos[6][7];
  const positionsForBranch = pos1.move(target2, source2);
  const os2: OneStep = {
    str: positionsForBranch[1],
    positions: positionsForBranch[0],
  };
  const hasBranch1: Kif = indexChanged.add(os2, indexChanged.getCurrent());

  test('分岐を作成できる', async () => {
    expect(hasBranch1.displayIndex).toBe(1);
    expect(hasBranch1.history[1]).toBeInstanceOf(Branch);
    const br = <Branch>hasBranch1.history[1];
    expect(br.displayIndex).toBe(1);
    expect(br.branch).toHaveLength(2);

    const indexToHead: Kif = hasBranch1.changeIndex(oneStep);
    const target = pos1.pos[5][4];
    const source = <PieceObj>pos1.pos[6][4];
    const moved = pos1.move(target, source);
    const os3: OneStep = {
      str: moved[1],
      positions: moved[0],
    };
    const hasBranch2: Kif = indexToHead.add(os3, indexToHead.getCurrent());
    const br2 = <Branch>hasBranch2.history[1];
    expect(br2.displayIndex).toBe(2);
    expect(br2.branch).toHaveLength(3);
  });

  test('分岐作成後、棋譜を追加できる', async () => {
    const curPos: Positions = hasBranch1.getCurrent().positions;
    const target3 = curPos.pos[3][1];
    const source3 = <PieceObj>curPos.pos[2][1];
    const moved2 = curPos.move(target3, source3);
    const os3: OneStep = {
      str: moved2[1],
      positions: moved2[0],
    };
    const addedToBranch: Kif = hasBranch1.add(os3, hasBranch1.getCurrent());
    expect(addedToBranch.displayIndex).toBe(1);
    expect(addedToBranch.history[1]).toBeInstanceOf(Branch);
    const br: Branch = <Branch>addedToBranch.history[1];
    expect(br.branch[0]).toBeInstanceOf(Kif);
    const ki: Kif = <Kif>br.branch[1];
    expect(ki.displayIndex).toBe(1);
    expect(ki.history.length).toBe(2);
  });

  test('getAsInline()できる', async () => {
    const curPos: Positions = hasBranch1.getCurrent().positions;
    const target3 = curPos.pos[3][1];
    const source3 = <PieceObj>curPos.pos[2][1];
    const moved2 = curPos.move(target3, source3);
    const os3: OneStep = {
      str: moved2[1],
      positions: moved2[0],
    };
    const addedToBranch: Kif = hasBranch1.add(os3, hasBranch1.getCurrent());
    expect(addedToBranch.getAsInline()).toHaveLength(3);
  });

  test('分岐に棋譜を追加したあと、changeIndex()できる', async () => {
    const curPos: Positions = hasBranch1.getCurrent().positions;
    const target3 = curPos.pos[3][1];
    const source3 = <PieceObj>curPos.pos[2][1];
    const moved2 = curPos.move(target3, source3);
    const os3: OneStep = {
      str: moved2[1],
      positions: moved2[0],
    };
    const addedToBranch: Kif = hasBranch1.add(os3, hasBranch1.getCurrent());
    const indexChanged = addedToBranch.changeIndex(os2);
    const br = <Branch>indexChanged.history[1];
    expect(indexChanged.getCurrent()).toEqual(os2);
    expect(br.branch[1].displayIndex).toBe(0);

    const cur = indexChanged.getCurrent();
    const addedToBranch2: Kif = indexChanged.add(os3, cur);
    expect(addedToBranch2.history[1]).toBeInstanceOf(Branch);
    const br2 = <Branch>addedToBranch2.history[1];
    expect(br2.branch).toHaveLength(2);
  });

  test('hasCurrent()できる', async () => {
    const br = <Branch>hasBranch1.history[1];
    const resultFalse: [boolean, number | undefined] = br.hasCurrent(pos1);
    const resultTrue: [boolean, number | undefined] = br.hasCurrent(
      br.getCurrent().positions,
    );
    expect(resultFalse[0]).toBeFalsy();
    expect(resultFalse[1]).toBeUndefined();
    expect(resultTrue[0]).toBeTruthy();
    expect(resultTrue[1]).toBe(1);
  });

  test('incBranch()できる', async () => {
    const br = <Branch>hasBranch1.history[1];
    const increased = br.incBranch(os2);
    expect(increased.displayIndex).toBe(1);
    expect(increased.branch).toHaveLength(2);
  });
});
