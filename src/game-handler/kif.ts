import Positions from './positions';
import Branch from './branch';
import { isBranch } from '../fn/type-checker';

// OneStep = 一手(棋譜の文字列 + 配置)
export interface OneStep {
  str: string;
  positions: Positions;
}
export type KifComponent = OneStep | Branch;
export type History = Array<KifComponent>;

/**
 * Kif Definition
 *
 * Kif: {
 *   history: History,
 *   displayIndex: number
 * }
 * History: Array<OneStep | Branch>
 * OneStep: {
 *   str: string,
 *   positions: Positions
 * }
 *
 * Branch: {
 *   branch: Array<Kif>,
 *   displayIndex: number
 * }
 */

/**
 * Kif functions:
 * add
 * makeBranch
 * changeIndex
 * setIndexZero
 * getCurrent
 * getAsInline
 */

export class Kif {
  history: History;
  displayIndex: number;
  constructor(kifComponent: History, displayIndex?: number) {
    this.history = kifComponent;
    this.displayIndex = displayIndex || 0;
  }

  /**
   * 局面を追加したKifを返す
   * @param target 追加する局面
   * @param current 現在局面
   */
  add(target: OneStep, current: OneStep): Kif {
    const last: KifComponent = this.history[this.history.length - 1];
    const nextIndex: number = this.displayIndex + 1;

    if (last === current) {
      return new Kif(this.history.concat(target), nextIndex);
    } else if (notHasCurrentAndLastIsBranch(this, last)) {
      const former = this.history.slice(0, this.displayIndex);
      const addedToFormer = former.concat(last.add(target, current));
      return new Kif(addedToFormer, this.displayIndex);
    } else {
      // 現在局面が含まれる、かつ最後ではない
      return this.makeBranch(target, nextIndex);
    }

    function notHasCurrentAndLastIsBranch(
      this_: Kif,
      last: KifComponent,
    ): last is Branch {
      return !this_.history.includes(current) && isBranch(last);
    }
  }

  /**
   * nextがoneStepと同一局面か判定し、違う場合は分岐を作成後、Kifを返す
   * @param target 追加するOneStep
   * @param nextIndex
   */
  makeBranch(target: OneStep, nextIndex: number): Kif {
    const next: KifComponent = this.history[nextIndex];
    if (isNotBranchAndNextIsTarget()) {
      return new Kif(this.history, nextIndex);
    } else {
      // nextが分岐ならそのままincBranch、違ったら分岐作成
      const former: Array<KifComponent> = this.history.slice(0, nextIndex);
      const br: Branch = isBranch(next)
        ? next.incBranch(target)
        : make(this.history.slice(nextIndex, this.history.length));
      return new Kif(former.concat(br), nextIndex);
    }

    function isNotBranchAndNextIsTarget(): boolean {
      return !isBranch(next) && next.positions.match(target.positions);
    }

    function make(his: History): Branch {
      return new Branch([new Kif(his)]).incBranch(target);
    }
  }

  /**
   * 棋譜の表示箇所を変更したKifを返す
   * @param target 表示したい一手
   */
  changeIndex(target: OneStep): Kif {
    const includeTarget: boolean = this.history.includes(target);
    return new Kif(this.history.map(check), handleKifIndex(this));

    function check(h: KifComponent): KifComponent {
      return isBranch(h) ? handleBranchIndex(h) : h;
    }

    function handleBranchIndex(b: Branch): KifComponent {
      return includeTarget ? b.setEachIndexZero() : b.changeIndex(target);
    }

    function handleKifIndex(this_: Kif): number {
      const his = this_.history;
      return includeTarget ? his.indexOf(target) : his.length - 1;
    }
  }

  /**
   * displayIndexを0にする
   */
  setIndexZero(): Kif {
    return new Kif(this.history.map(setEach), 0);

    function setEach(h: KifComponent): KifComponent {
      return isBranch(h) ? h.setEachIndexZero() : h;
    }
  }

  /**
   * 現在の一手を返す
   */
  getCurrent(): OneStep {
    const cur: KifComponent = this.history[this.displayIndex];
    return isBranch(cur) ? cur.getCurrent() : cur;
  }

  /**
   * 分岐のない棋譜を配列で返す
   */
  getAsInline(): Array<OneStep> {
    return Array.prototype.concat.apply([], this.history.map(getEach));

    function getEach(kc: KifComponent): Array<OneStep> {
      return isBranch(kc) ? kc.getAsInline() : [kc];
    }
  }
}
