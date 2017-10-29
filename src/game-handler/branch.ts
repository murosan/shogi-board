import Positions from './positions';
import { Kif, OneStep, KifComponent } from './kif';
import { isBranch } from '../fn/type-checker';

/**
 * Branch functions:
 * add
 * incBranch
 * hasCurrent
 * hasSamePos
 * changeIndex
 * setIndexZero
 * getCurernt
 * getAsInline
 */

type KifList = Array<Kif>;
type MatchTuple = [boolean, number | undefined];

export default class Branch {
  branch: KifList;
  displayIndex: number;
  constructor(branch: KifList, displayIndex?: number) {
    this.branch = branch;
    this.displayIndex = displayIndex || 0;
  }

  /**
   * targetを追加したBranchを返す
   * @param target 追加する一手
   * @param current 現在局面
   */
  add(target: OneStep, current: OneStep): Branch {
    const displayIndex = this.displayIndex;
    return new Branch(this.branch.map(addEach), displayIndex);

    function addEach(b: Kif, i: number): Kif {
      return i === displayIndex ? b.add(target, current) : b;
    }
  }

  /**
   * 分岐を増やす
   * @param target 追加する一手
   */
  incBranch(target: OneStep): Branch {
    const br: KifList = this.branch;
    const match: MatchTuple = this.hasSamePos(target.positions);
    const newIndex = match[0] ? match[1] : br.length;
    const newBranches: KifList = match[0]
      ? br.slice()
      : br.concat(new Kif([target]));
    return new Branch(newBranches, newIndex);
  }

  /**
   * 分岐の各先頭と同じ配置かどうか判定しその結果を返す、ある場合はそのindexも返す
   * @param positions 比較する配置
   */
  hasSamePos(positions: Positions): MatchTuple {
    return this.branch.reduce(matchCheck, [false, undefined]);

    function matchCheck(previous: MatchTuple, current: Kif, i: number) {
      const head: KifComponent = current.history[0];
      const match: boolean = !isBranch(head) && head.positions.match(positions);
      const result: MatchTuple = match ? [true, i] : previous;
      return result;
    }
  }

  /**
   * 分岐の表示箇所を変更したBranchを返す
   * @param target 表示したい一手
   */
  changeIndex(target: OneStep): Branch {
    const branch = this.branch;
    const displayIndex = this.displayIndex;
    const headHasCurrent: MatchTuple = this.hasCurrent(target.positions);
    return headHasCurrent[0]
      ? new Branch(branch.map(handleIndex), headHasCurrent[1])
      : handleBranch();

    function handleBranch(): Branch {
      const excluded = branch.filter(excludeDisplayedKif);
      const indexChanged = branch[displayIndex].changeIndex(target);
      const combined = excluded.concat(indexChanged);
      return new Branch(combined, combined.length - 1);
    }

    function handleIndex(k: Kif, i: number): Kif {
      return i === headHasCurrent[1] ? k.changeIndex(target) : k.setIndexZero();
    }

    function excludeDisplayedKif(kif: Kif): boolean {
      return kif !== branch[displayIndex];
    }
  }

  /**
   * 分岐の各先頭に現在局面があるか判定し結果を返す、ある場合はそのIndexも返す
   * @param current 現在局面
   */
  hasCurrent(current: Positions): MatchTuple {
    return this.branch.reduce(check, [false, undefined]);

    function check(previous: MatchTuple, cur: Kif, i: number): MatchTuple {
      const head: KifComponent = cur.history[0];
      const headIsCurrent: boolean =
        !isBranch(head) && head.positions === current;
      const result: MatchTuple = headIsCurrent ? [true, i] : previous;
      return result;
    }
  }

  /**
   * 各分岐(Kif)のdisplayIndexを0にする
   */
  setEachIndexZero(): Branch {
    return new Branch(this.branch.map(setEach), this.displayIndex);

    function setEach(kif: Kif): Kif {
      return kif.setIndexZero();
    }
  }

  /**
   * 現在の一手を返す
   */
  getCurrent(): OneStep {
    return this.branch[this.displayIndex].getCurrent();
  }

  /**
   * 分岐のない棋譜を配列で返す
   */
  getAsInline(): Array<OneStep> {
    return this.branch[this.displayIndex].getAsInline();
  }
}
