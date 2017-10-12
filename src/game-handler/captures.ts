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
    const capsArr = Array.from(this.captures);
    return capsArr.every(e => {
      const v: Array<PieceObj> = e[1];
      return v && 0 < v.length;
    });
  }

  isEmpty(): boolean {
    return !this.nonEmpty();
  }

  inc(pieceObj: PieceObj): Captures {
    const name = pieceObj.name;
    const capsArr: Array<KeyVal> = Array.from(this.captures);
    const caps = capsArr.map(sep => {
      const key: string = sep[0];
      const value: Array<PieceObj> = sep[1].map((p: PieceObj) => {
        return p.update();
      });
      if (key === name) {
        value.push(pieceObj.update());
      }
      return <KeyVal>[key, value];
    });
    return new Captures(this.whose, new Map(caps));
  }

  dec(pieceObj: PieceObj): Captures {
    const name = pieceObj.name;
    const capsArr: Array<KeyVal> = Array.from(this.captures);
    const caps = capsArr.map(sep => {
      const index = sep[1].indexOf(pieceObj);
      const key: string = sep[0];
      const value: Array<PieceObj> = sep[1].map((p: PieceObj) => {
        return p.update();
      });
      if (key === name && index !== -1) {
        value.splice(index, 1);
      }
      return <KeyVal>[key, value];
    });
    return new Captures(this.whose, new Map(caps));
  }

  update() {
    const capsArr: Array<KeyVal> = Array.from(this.captures);
    const caps = capsArr.map(sep => {
      const key: string = sep[0];
      const value: Array<PieceObj> = sep[1].map((p: PieceObj) => {
        return p.update();
      });
      return <KeyVal>[key, value];
    });
    return new Captures(this.whose, new Map(caps));
  }

  match(c: Captures): boolean {
    const cA = Array.from(c.captures);
    const cB = Array.from(this.captures);
    const matchCap = cA.every((kvA: KeyVal, i: number) => {
      const kvB = cB[i];
      return kvA[0] === kvB[0] && kvA[1].length === kvB[1].length;
    });

    return c.whose === this.whose && matchCap;
  }
}
