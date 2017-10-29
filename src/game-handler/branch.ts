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
    let index: number | undefined;
    const result: boolean = !this.branch.every(checkKif);
    return [result, index];

    function checkKif(k: Kif, i: number): boolean {
      const head: KifComponent = k.history[0];
      const match: boolean = isBranch(head)
        ? false
        : head.positions.match(positions);
      if (match) {
        index = i;
      }
      return !match;
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
      ? new Branch(branch.map(kifRec), headHasCurrent[1])
      : handleBranch();

    function handleBranch() {
      const filter = branch.filter(isDispKif);
      const kifChangedIndex = branch[displayIndex].changeIndex(target);
      const indexChanged = filter.concat(kifChangedIndex);
      return new Branch(indexChanged, indexChanged.length - 1);
    }

    function kifRec(k: Kif, i: number): Kif {
      return i === headHasCurrent[1] ? k.changeIndex(target) : k.setIndexZero();
    }

    function isDispKif(kif: Kif, i: number): boolean {
      return kif === branch[displayIndex];
    }
  }

  /**
   * 分岐の各先頭に現在局面があるか判定し結果を返す、ある場合はそのIndexも返す
   * @param current 現在局面
   */
  hasCurrent(current: Positions): MatchTuple {
    const result: boolean = !this.branch.every(checkKif);
    let index: number | undefined;
    return [result, index];

    function checkKif(k: Kif, i: number): boolean {
      const h: KifComponent = k.history[0];
      const res: boolean = !isBranch(h) && h.positions !== current;
      if (!res) {
        index = i;
      }
      return res;
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
