import PieceObj from './piece';
import Captures from './captures';
import PromotionConfirmObj from './promotion-confirm';
import EmpObj from './emp';
import { generateKif } from '../fn/strings';
import { isPiece, isEmp, isPromotionConfirm } from '../fn/type-checker';

type nonEmpCells = PieceObj | PromotionConfirmObj;
type CellComponent = nonEmpCells | EmpObj;
type Row = Array<CellComponent>;
type Pos = Array<Row>;

export default class Positions {
  pos: Pos;
  cap0: Captures;
  cap1: Captures;
  turn: number;
  selected?: nonEmpCells;
  constructor(
    pos: Pos,
    c0: Captures,
    c1: Captures,
    turn: number,
    selected?: nonEmpCells,
  ) {
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
    const posA: Pos = p.pos;
    const matchPos: boolean = this.pos.every(checkRow);
    return matchPos && p.cap0.match(this.cap0) && p.cap1.match(this.cap1);

    function checkRow(r: Row, row: number) {
      return r.every(checkCell);

      function checkCell(c: CellComponent, col: number) {
        const a = posA[row][col];
        return bothEmp(a, c) || bothPieceAndSame(a, c);
      }

      function bothEmp(a: CellComponent, b: CellComponent): boolean {
        return isEmp(b) && isEmp(a);
      }

      function bothPieceAndSame(a: CellComponent, b: CellComponent): boolean {
        return (
          isPiece(b) && isPiece(a) && b.name === a.name && b.whose === a.whose
        );
      }
    }
  }

  /**
   * 駒を動かした、Positionsと棋譜の文字列を返す
   * @param target 移動先
   * @param source 移動元
   */
  move(
    target: CellComponent,
    source: PieceObj,
  ): [Positions, string | undefined] {
    const pos: Pos = this.pos.slice();
    const cap0: Captures = this.cap0;
    const cap1: Captures = this.cap1;
    const turn: number = this.turn;
    const newSelected: Array<nonEmpCells> = [];
    const kif: Array<string> = [];

    const captures: [Captures, Captures] = handleCaptures();
    return [
      new Positions(
        getMovedPos(),
        captures[0],
        captures[1],
        newSelected[0] ? turn : 1 - turn,
        newSelected[0],
      ),
      kif[0],
    ];

    function getMovedPos(): Pos {
      return pos.map(rowRec);
    }

    function rowRec(r: Row, row: number): Row {
      return r.map(colRec);

      function colRec(c: CellComponent, col: number): CellComponent {
        if (isPromotionConfirm(target)) {
          return targetIsConfirm(target, c, row, col);
        } else if (source === c) {
          // 移動元を参照中なら空ますに
          return new EmpObj();
        } else if (target === c) {
          // cが移動先
          return referringTarget(row, col);
        } else {
          return c.update();
        }
      }
    }

    function targetIsConfirm(
      target: PromotionConfirmObj,
      cell: CellComponent,
      row: number,
      col: number,
    ): CellComponent {
      if (target === cell) {
        // 成/不成が選択されたConfirmCell
        pushKif(target.moved === source ? '不成' : '成', row, col, target.origin);
        return source.update();
      } else {
        // ConfirmCellでなければ更新のみ
        return cell.update();
      }
    }

    function referringTarget(row: number, col: number): CellComponent {
      return source.canPromote(row)
        ? handleCanPromote(row, col)
        : autoPromote();

      function autoPromote(): CellComponent {
        pushKif(source.row === -1 ? '打' : '', row, col, source);
        return source.move(row, col);
      }
    }

    function handleCanPromote(row: number, col: number): CellComponent {
      return source.canMoveNext(turn, row)
        ? makePromotionConfirm()
        : autoPromote();

      function makePromotionConfirm(): CellComponent {
        const pc = new PromotionConfirmObj(
          source,
          source.move(row, col),
          source.promote(row, col),
        );
        newSelected.push(pc);
        return pc;
      }

      function autoPromote(): CellComponent {
        pushKif('成', row, col, source);
        return source.promote(row, col);
      }
    }

    function handleCaptures(): [Captures, Captures] {
      if (source.row === -1 && isEmp(target)) {
        // 持ち駒を空ますに置くとき
        return turn === 0
          ? [cap0.dec(source), cap1.update()]
          : [cap0.update(), cap1.dec(source)];
      } else if (isPiece(target) && target.whose !== turn) {
        // 移動先(target) が相手の駒のとき
        return turn === 0
          ? [cap0.inc(target.captured()), cap1.update()]
          : [cap0.update(), cap1.inc(target.captured())];
      } else {
        // 移動先が (promotion confirm | 盤上の駒を空ますに移動) のとき
        return [cap0.update(), cap1.update()];
      }
    }

    function pushKif(
      status: '' | '成' | '不成' | '打',
      targetRow: number,
      targetCol: number,
      source_: PieceObj,
    ): void {
      const generateKifProps = {
        targetRow: targetRow,
        targetCol: targetCol,
        name: source_.name,
        row: source_.row,
        col: source_.col,
        status: status,
      };
      kif.push(generateKif(generateKifProps));
      return;
    }
  }

  /**
   * selectedにtargetを入れたPositionsを返す
   * @param target 選択されたCellComponent
   */
  select(target: nonEmpCells): Positions {
    return new Positions(this.pos, this.cap0, this.cap1, this.turn, target);
  }

  /**
   * 全てのCellComponentsが更新されたPositionsを返す
   */
  update(): Positions {
    return new Positions(
      this.pos.map(updateRow),
      this.cap0.update(),
      this.cap1.update(),
      this.turn,
    );

    function updateRow(r: Row): Row {
      return r.map(updateCell);
    }

    function updateCell(c: CellComponent): CellComponent {
      return c.update();
    }
  }
}
