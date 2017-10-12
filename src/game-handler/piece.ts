import EmpObj from './emp';
import { turnOverPieceName } from '../fn/strings';

type PorE = PieceObj | EmpObj;

export default class PieceObj {
  name: string;
  whose: number;
  row: number;
  col: number;
  _canMoveTo: Array<PorE>;
  constructor(
    name: string,
    whose: number,
    row: number,
    col: number,
    _movs?: Array<PorE>,
  ) {
    this.name = name;
    this.whose = whose;
    this.row = row;
    this.col = col;
    this._canMoveTo = _movs || [];
  }

  set canMoveTo(movs: Array<PorE>) {
    this._canMoveTo = movs;
  }

  get canMoveTo(): Array<PorE> {
    return this._canMoveTo;
  }

  canPromote(r: number): boolean {
    const name = this.name;
    const row = this.row;
    const whose = this.whose;
    const inEnemyArea: () => boolean = () => {
      return (
        (whose === 0 && (r <= 2 || row <= 2)) ||
        (whose === 1 && (6 <= r || 6 <= row))
      );
    };
    if (row === -1) {
      return false;
    } else if (
      (name === '飛' ||
        name === '角' ||
        name === '銀' ||
        name === '桂' ||
        name === '香' ||
        name === '歩') &&
      inEnemyArea()
    ) {
      return true;
    } else {
      return false;
    }
  }

  canMove(target: PorE): boolean {
    const movs = this.canMoveTo;
    if (movs && movs.includes(target)) {
      return true;
    } else {
      return false;
    }
  }

  canMoveNext(turn: number, r: number): boolean {
    const name = this.name;
    const d: Array<boolean> = turn === 0 ? [r <= 0, r <= 1] : [8 <= r, 7 <= r];
    if (((name === '歩' || name === '香') && d[0]) || (name === '桂' && d[1])) {
      return false;
    } else {
      return true;
    }
  }

  captured(): PieceObj {
    return new PieceObj(
      turnOverPieceName(this.name, 'demote'),
      1 - this.whose,
      -1,
      -1,
    );
  }

  move(r: number, c: number): PieceObj {
    return new PieceObj(this.name, this.whose, r, c);
  }

  promote(r: number, c: number): PieceObj {
    return new PieceObj(
      turnOverPieceName(this.name, 'promote'),
      this.whose,
      r,
      c,
    );
  }

  update() {
    return new PieceObj(this.name, this.whose, this.row, this.col);
  }
}
