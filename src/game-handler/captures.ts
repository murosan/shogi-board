import PieceObj from './piece';

type KeyVal = [string, Array<PieceObj>];

export default class Captures {
  whose: number;
  captures: Map<string, Array<PieceObj>>;
  constructor(whose: number, init?: Map<string, Array<PieceObj>>) {
    this.whose = whose;
    this.captures =
      init ||
      new Map([
        ['飛', []],
        ['角', []],
        ['金', []],
        ['銀', []],
        ['桂', []],
        ['香', []],
        ['歩', []],
      ]);
  }

  nonEmpty(): boolean {
    return Array.from(this.captures).every(lengthCheck);

    function lengthCheck(e: [string, Array<PieceObj>]): boolean {
      const val = e[1];
      return val && 0 < val.length;
    }
  }

  isEmpty(): boolean {
    return !this.nonEmpty();
  }

  inc(pieceObj: PieceObj): Captures {
    const caps = Array.from(this.captures).map(handleSep);
    return new Captures(this.whose, new Map(caps));

    function handleSep(
      sep: [string, Array<PieceObj>],
    ): [string, Array<PieceObj>] {
      const value: Array<PieceObj> =
        sep[0] === pieceObj.name ? sep[1].concat(pieceObj.update()) : sep[1];
      return [sep[0], value];
    }
  }

  dec(pieceObj: PieceObj): Captures {
    const caps = Array.from(this.captures).map(handleSep);
    return new Captures(this.whose, new Map(caps));

    function handleSep(
      sep: [string, Array<PieceObj>],
    ): [string, Array<PieceObj>] {
      const index = sep[1].indexOf(pieceObj);
      return <KeyVal>[sep[0], sep[1].filter(excludeTarget)];

      function excludeTarget(p: PieceObj): boolean {
        return !(sep[0] === pieceObj.name && index !== -1);
      }
    }
  }

  update() {
    const caps = Array.from(this.captures).map(handleSep);
    return new Captures(this.whose, new Map(caps));

    function handleSep(
      sep: [string, Array<PieceObj>],
    ): [string, Array<PieceObj>] {
      return [sep[0], sep[1].map(updateEach)];
    }

    function updateEach(p: PieceObj): PieceObj {
      return p.update();
    }
  }

  match(c: Captures): boolean {
    const cA = Array.from(c.captures);
    const cB = Array.from(this.captures);
    return c.whose === this.whose && cA.every(check);

    function check(keyValA: KeyVal, i: number): boolean {
      const kvB = cB[i];
      return keyValA[0] === kvB[0] && keyValA[1].length === kvB[1].length;
    }
  }
}
