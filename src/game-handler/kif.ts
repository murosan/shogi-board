import Positions from './positions';
import Branch from './branch';

// OneStep = 一手(棋譜の文字列 + 配置)
export interface OneStep {
  str: string;
  positions: Positions;
}
export type KifComponent = OneStep | Branch;
export type History = Array<KifComponent>;

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
      // 現在局面が最後なら後ろに追加して返す
      return new Kif(this.history.concat(target), nextIndex);
    } else if (!this.history.includes(current) && last instanceof Branch) {
      // 現在局面が含まれない、かつ最後が分岐
      const former: Array<KifComponent> = this.history.slice(
        0,
        this.displayIndex
      );
      return new Kif(
        former.concat(last.add(target, current)),
        this.displayIndex
      );
    } else {
      // 現在局面が含まれる、かつ最後ではない
      return this.makeBranch(target, nextIndex);
    }
  }

  /**
   * nextがoneStepと同一局面か判定し、違う場合は分岐を作成後、Kifを返す
   * @param target 追加するOneStep
   * @param nextIndex 
   */
  makeBranch(target: OneStep, nextIndex: number): Kif {
    const next: KifComponent = this.history[nextIndex];
    if (!(next instanceof Branch) && next.positions.match(target.positions)) {
      return new Kif(this.history, nextIndex);
    } else {
      // nextが分岐ならそのままincBranch、違ったら分岐作成
      const former: Array<KifComponent> = this.history.slice(0, nextIndex);
      const br: Branch =
        next instanceof Branch
          ? next.incBranch(target)
          : new Branch([
              new Kif(this.history.slice(nextIndex, this.history.length))
            ]).incBranch(target);
      return new Kif(former.concat(br), nextIndex);
    }
  }

  /**
   * 棋譜の表示箇所を変更したKifを返す
   * @param target 表示したい一手
   */
  changeIndex(target: OneStep): Kif {
    const includeTarget: boolean = this.history.includes(target);
    return new Kif(
      this.history.map((h: KifComponent) => {
        if (h instanceof Branch) {
          return includeTarget ? h.setEachIndexZero() : h.changeIndex(target);
        } else {
          return h;
        }
      }),
      includeTarget ? this.history.indexOf(target) : this.history.length - 1
    );
  }

  /**
   * displayIndexを0にする
   */
  setIndexZero(): Kif {
    return new Kif(
      this.history.map((h: KifComponent) => {
        if (h instanceof Branch) {
          return h.setEachIndexZero();
        } else {
          return h;
        }
      }),
      0
    );
  }

  /**
   * 現在の一手を返す
   */
  getCurrent(): OneStep {
    const cur: KifComponent = this.history[this.displayIndex];
    if (cur instanceof Branch) {
      return cur.getCurrent();
    } else {
      return cur;
    }
  }

  /**
   * 分岐のない棋譜を配列で返す
   */
  getAsInline(): Array<OneStep> {
    return Array.prototype.concat.apply(
      [],
      this.history.map((kc: KifComponent) => {
        if (kc instanceof Branch) {
          return kc.getAsInline();
        } else {
          return kc;
        }
      })
    );
  }
}
