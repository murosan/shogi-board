import Positions from './positions';
import { Kif, OneStep, KifComponent } from './kif';

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

export default class Branch {
  branch: Array<Kif>;
  displayIndex: number;
  constructor(branch: Array<Kif>, displayIndex?: number) {
    this.branch = branch;
    this.displayIndex = displayIndex || 0;
  }

  /**
   * targetを追加したBranchを返す
   * @param target 追加する一手
   * @param current 現在局面
   */
  add(target: OneStep, current: OneStep): Branch {
    return new Branch(
      this.branch.map((b: Kif, i: number) => {
        if (i === this.displayIndex) {
          return b.add(target, current);
        } else {
          return b;
        }
      }),
      this.displayIndex
    );
  }

  /**
   * 分岐を増やす
   * @param target 追加する一手
   */
  incBranch(target: OneStep): Branch {
    const br: Array<Kif> = this.branch.slice();
    const match: [boolean, number | undefined] = this.hasSamePos(target.positions);
    if (match[0]) {
      // targetと同じ局面が分岐にすでにある場合は、displayIndexを更新するのみ
      return new Branch(br, match[1]);
    } else {
      // 分岐を増やす
      return new Branch(br.concat(new Kif([target])), br.length);
    }
  }

  /**
   * 分岐の各先頭に現在局面があるか判定し結果を返す、ある場合はそのIndexも返す
   * @param current 現在局面
   */
  hasCurrent(current: Positions): [boolean, number | undefined] {
    let index: number | undefined;
    const result: boolean = !this.branch.every((k: Kif, i: number) => {
      const h: KifComponent = k.history[0];
      const res: boolean = !(h instanceof Branch) && h.positions !== current;
      if (!res) {
        index = i;
      }
      return res;
    });
    return [result, index];
  }

  /**
   * 分岐の各先頭と同じ配置かどうか判定しその結果を返す、ある場合はそのindexも返す
   * @param positions 比較する配置
   */
  hasSamePos(positions: Positions): [boolean, number | undefined] {
    let index: number | undefined;
    const result: boolean = !this.branch.every((k: Kif, i: number) => {
      const head: KifComponent = k.history[0];
      const match: boolean =
        head instanceof Branch ? false : head.positions.match(positions);
      if (match) {
        index = i;
      }
      return !match;
    });
    return [result, index];
  }

  /**
   * 分岐の表示箇所を変更したBranchを返す
   * @param target 表示したい一手
   */
  changeIndex(target: OneStep): Branch {
    const headHas: [boolean, number | undefined] = this.hasCurrent(target.positions);
    if (headHas[0]) {
      return new Branch(
        this.branch.map((k: Kif, i: number) => {
          if (i === headHas[1]) {
            return k.changeIndex(target);
          } else {
            return k.setIndexZero();
          }
        }),
        headHas[1]
      );
    } else {
      const br: Array<Kif> = this.branch.slice();
      const dispKif: Kif = br[this.displayIndex];
      br.splice(br.indexOf(dispKif), 1);
      const branch = br.concat(dispKif.changeIndex(target));
      return new Branch(branch, branch.length - 1);
    }
  }

  /**
   * 各分岐(Kif)のdisplayIndexを0にする
   */
  setEachIndexZero(): Branch {
    return new Branch(
      this.branch.map((b: Kif) => {
        return b.setIndexZero();
      }),
      this.displayIndex
    );
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
