import PieceObj from './piece';
import Captures from './captures';
import PromotionConfirmObj from './promotion-confirm';
import EmpObj from './emp';
import { CellComponent } from '../game';
import { generateKif } from '../fn/strings';

type nonEmpCells = PieceObj | PromotionConfirmObj;

export default class Positions {
  pos: Array<Array<CellComponent>>;
  cap0: Captures;
  cap1: Captures;
  turn: number;
  selected?: nonEmpCells;
  constructor(pos: Array<Array<CellComponent>>,
    c0: Captures, c1: Captures, turn: number, selected?: nonEmpCells) {
    this.pos = pos;
    this.cap0 = c0;
    this.cap1 = c1;
    this.turn = turn;
    this.selected = selected;
  }

  /**
   * 配置が一致するかどうか判定する
   * @param p 配置
   */
  match(p: Positions): boolean {
    const posA = p.pos;
    const matchPos: boolean = this.pos.every((rowContainer, row: number) => {
      return rowContainer.every((b, col: number) => {
        const a: CellComponent = posA[row][col];
        if ((b instanceof EmpObj) && (a instanceof EmpObj)) {
          return true;
        } else if ((b instanceof PieceObj) && (a instanceof PieceObj)) {
          // 駒の名前と所有者が一緒なら同じ
          return (b.name === a.name) && (b.whose === a.whose);
        } else {
          return false;
        }
      });
    });

    return matchPos && p.cap0.match(this.cap0) && p.cap1.match(this.cap1);
  }

  /**
   * 駒を動かす
   * @param target 移動先
   * @param source 移動元
   */
  move(target: CellComponent, source: PieceObj): [Positions, string | undefined] {
    const pos = this.pos.slice();
    const cap0 = this.cap0;
    const cap1 = this.cap1;
    const turn = this.turn;
    const newSelected: Array<nonEmpCells> = [];
    const kif: Array<string> = [];
    const pushKif = ((status: '' | '成' | '不成' | '打',
      targetRow: number, targetCol: number, source_: PieceObj) => {
      kif.push(generateKif(targetRow, targetCol, source_.name, source_.row, source_.col, status));
    });

    const newPos: Array<Array<CellComponent>> = pos.map((rowContainer, row) => {
      return rowContainer.map((cell, col) => {
        if (target instanceof PromotionConfirmObj) {
          if (target === cell) {
            pushKif((target.moved === source) ? '不成' : '成', row, col, target.origin);
            return source.update();
          }
          else { return cell.update(); }
        }
        else if (source === cell) { return new EmpObj(); }
        else if (target === cell) {
          if (source.canPromote(row)) {
            if (source.canMoveNext(turn, row)) {
              // promotion confirm
              const pc = new PromotionConfirmObj(source, source.move(row, col), source.promote(row, col));
              newSelected.push(pc);
              return pc;
            }
            else {
              pushKif('成', row, col, source);
              return source.promote(row, col);
            }
          }
          else {
            pushKif((source.row === -1) ? '打' : '', row, col, source);
            return source.move(row, col);
          }
        }
        else { return cell.update(); }
      });
    });

    const newCap: [Captures, Captures] = handleCaptures();

    function handleCaptures(): [Captures, Captures] {
      if (source.row === -1 && (target instanceof EmpObj)) {
        // 持ち駒を空ますに置くとき
        return (turn === 0) ?
          [cap0.dec(source), cap1.update()] :
          [cap0.update(), cap1.dec(source)];
      } else if (target instanceof PieceObj && target.whose !== turn) {
        // 移動先(target) が相手の駒のとき
        return (turn === 0) ?
          [cap0.inc(target.captured()), cap1.update()] :
          [cap0.update(), cap1.inc(target.captured())];
      } else {
        // 移動先が (promotion confirm | 盤上の駒を空ますに移動) のとき
        return [cap0.update(), cap1.update()];
      }
    }

    return [
      new Positions(
        newPos, newCap[0], newCap[1],
        (newSelected[0] ? turn : (1 - turn)), newSelected[0]
      ),
      kif[0]
    ];
  }

  select(target: nonEmpCells): Positions {
    return new Positions(this.pos, this.cap0, this.cap1, this.turn, target);
  }

  update(): Positions {
    const newPos = this.pos.map((r) => {
      return r.slice().map((c) => {
        return c.update();
      });
    });
    return new Positions(newPos, this.cap0.update(), this.cap1.update(), this.turn);
  }
}
