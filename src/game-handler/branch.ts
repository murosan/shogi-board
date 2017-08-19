import Positions from './positions';
import { Kif, OneStep, KifComponent } from './kif';

/**
 * Branch functions:
 * add
 * incBranch
 * hasCurrent
 * hasSamePos
 * changeIndex
 * setIndexZeroToEach
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

  add(oneStep: OneStep, current: OneStep): Branch {
    return new Branch(
      this.branch.map((b, i) => {
        if (i === this.displayIndex) { return b.add(oneStep, current); }
        else { return b; }
      }),
      this.displayIndex
    );
  }

  incBranch(target: OneStep): Branch {
    const br = this.branch.slice();
    const match = this.hasSamePos(target.positions);
    if (!match[0]) {
      return new Branch(br.concat(new Kif([target])), br.length);
    } else {
      return new Branch(br, match[1]);
    }
  }

  hasCurrent(current: Positions): [boolean, number | undefined] {
    let index;
    const result: boolean = !this.branch.every((k: Kif, i: number) => {
      const h: KifComponent = k.history[0];
      const res: boolean = (!(h instanceof Branch)) && (h.positions !== current);
      if (!res) { index = i; }
      return res;
    });
    return [result, index];
  }

  hasSamePos(positions: Positions): [boolean, number | undefined] {
    let index;
    const result: boolean = !this.branch.every((k: Kif, i: number) => {
      const head: KifComponent = k.history[0];
      const match: boolean = (head instanceof Branch) ? false :
        head.positions.match(positions);
      if (match) { index = i; }
      return !match;
    });
    return [result, index];
  }

  changeIndex(target: OneStep): Branch {
    const headHas = this.hasCurrent(target.positions);
    if (headHas[0]) {
      return new Branch(
        this.branch.map((k: Kif, i: number) => {
          if (i === headHas[1]) { return k.changeIndex(target); }
          else { return k.setIndexZero(); }
        }),
        headHas[1]
      );
    } else {
      const br = this.branch.slice();
      const dispKif = br[this.displayIndex];
      br.splice(br.indexOf(dispKif), 1);
      const branch = br.concat(dispKif.changeIndex(target))
      return new Branch(
        branch,
        branch.length - 1
      );
    }
  }

  setEachIndexZero(): Branch {
    return new Branch(
      this.branch.map((b) => { return b.setIndexZero(); }),
      this.displayIndex
    );
  }

  getCurrent(): OneStep {
    return this.branch[this.displayIndex].getCurrent();
  }

  getAsInline(): Array<OneStep> {
    return this.branch[this.displayIndex].getAsInline();
  }
}
