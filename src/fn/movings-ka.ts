import { MovProps } from './movings';
import PieceObj from '../game-handler/piece';
import EmpObj from '../game-handler/emp';
import PromotionConfirmObj from '../game-handler/promotion-confirm';
import empLocations from './movings-emp-loc';

type Fn = (n: number) => number;
type PorE = PieceObj | EmpObj;
type cells = PorE | PromotionConfirmObj;

interface PosTurnPieceFn {
  pos: Array<Array<cells>>;
  turn: number;
  piece: PieceObj;
  fn: Array<Array<Fn>>;
}

export default function movKa(props: MovProps): Array<PorE> {
  const pi = props.pieceObj;
  const po = props.positions;
  const pos = po.pos;
  const turn = po.turn;

  if (pi.row === -1) {
    return empLocations(pos);
  } else {
    const fncs = [
      [(r: number) => r - 1, (c: number) => c - 1],
      [(r: number) => r - 1, (c: number) => c + 1],
      [(r: number) => r + 1, (c: number) => c - 1],
      [(r: number) => r + 1, (c: number) => c + 1]
    ];
    return movOnBoard({ pos: pos, turn: turn, piece: pi, fn: fncs });
  }
}

export function movOnBoard(props: PosTurnPieceFn): Array<PorE> {
  const pos = props.pos;
  const turn = props.turn;
  const piece = props.piece;
  const row = piece.row;
  const col = piece.col;
  const inRange = (r: number, c: number) => (0 <= r && r <= 8 && 0 <= c && c <= 8);

  function checkRec(movs: Array<PorE>, row: number, col: number,
    rowFn: Fn, colFn: Fn): Array<PorE> {
    const movs_ = movs.slice();
    const r = rowFn(row);
    const c = colFn(col);

    if (!inRange(r, c)) {
      return movs_;
    } else {
      const target: cells = pos[r][c];
      const whose = (target instanceof PieceObj) ? target.whose : null;
      if (whose === turn) {
        return movs_;
      } else if (target instanceof PieceObj) {
        movs_.push(target);
        return movs_;
      } else {
        if (target instanceof EmpObj) {
          movs_.push(target);
        }
        return checkRec(movs_, r, c, rowFn, colFn);
      }
    }
  }

  return checkRec([], row, col, props.fn[0][0], props.fn[0][1])
    .concat(checkRec([], row, col, props.fn[1][0], props.fn[1][1]))
    .concat(checkRec([], row, col, props.fn[2][0], props.fn[2][1]))
    .concat(checkRec([], row, col, props.fn[3][0], props.fn[3][1]));
}
