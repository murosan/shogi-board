import { MovProps } from './movings';
import PieceObj from '../game-handler/piece';
import EmpObj from '../game-handler/emp';
import PromotionConfirmObj from '../game-handler/promotion-confirm';

type PorE = PieceObj | EmpObj;

interface PosTurn {
  pos: Array<Array<PorE | PromotionConfirmObj>>;
  turn: number;
}

export default function movFu(props: MovProps): Array<PorE> {
  const pi = props.pieceObj;
  const po = props.positions;
  const pos = po.pos;
  const turn = po.turn;

  if (pi.row === -1) {
    return movCapture({ pos: pos, turn: turn });
  } else {
    return movOnBoard({ pos: pos, turn: turn }, pi);
  }
}

function notDuplicated(col: number, props: PosTurn): boolean {
  const pos = props.pos;
  const turn = props.turn;
  function rowRec(row: number): boolean {
    if (row === 9) {
      return true;
    } else {
      const target: PorE | PromotionConfirmObj = pos[row][col];
      if (
        target instanceof PieceObj ? target.name === '歩' && target.whose === turn : false
      ) {
        return false;
      } else {
        return rowRec(row + 1);
      }
    }
  }

  return rowRec(0);
}

function movCapture(props: PosTurn): Array<EmpObj> {
  const pos = props.pos;
  const turn = props.turn;
  function colRec(col: number, movs: Array<EmpObj>): Array<EmpObj> {
    function rowRec(row: number, movs: Array<EmpObj>): Array<EmpObj> {
      const movs_ = movs.slice();
      if (row === 9) {
        return movs_;
      } else {
        const target: PorE | PromotionConfirmObj = pos[row][col];
        if (
          target instanceof EmpObj &&
          ((turn === 0 && row !== 0) || (turn === 1 && row !== 8))
        ) {
          movs_.push(target);
        }
        return rowRec(row + 1, movs_);
      }
    }

    const movs_ = movs.slice();
    if (col === 9) {
      return movs_;
    } else if (notDuplicated(col, props)) {
      return colRec(col + 1, rowRec(0, movs_));
    } else {
      return colRec(col + 1, movs_);
    }
  }

  return colRec(0, []);
}

function movOnBoard(props: PosTurn, pieceObj: PieceObj): Array<PorE> {
  const pos = props.pos;
  const turn = props.turn;
  const row = pieceObj.row;
  const col = pieceObj.col;
  const movs = [];
  const targetRow = turn === 0 ? row - 1 : row + 1;

  if (turn === 0 ? 0 <= targetRow : targetRow <= 8) {
    const target = pos[targetRow][col];
    if (
      target instanceof EmpObj ||
      (target instanceof PieceObj && target.whose !== turn)
    ) {
      movs.push(target);
    }
  }

  return movs;
}
