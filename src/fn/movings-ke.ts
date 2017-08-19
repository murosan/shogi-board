import { MovProps } from './movings';
import PieceObj from '../game-handler/piece';
import EmpObj from '../game-handler/emp';
import PromotionConfirmObj from '../game-handler/promotion-confirm';

type PorE = PieceObj | EmpObj;

interface PosTurn {
  pos: Array<Array<PorE | PromotionConfirmObj>>;
  turn: number;
}

export default function movKe(props: MovProps): Array<PorE> {
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

function movCapture(props: PosTurn): Array<EmpObj> {
  const pos = props.pos;
  const turn = props.turn;
  function rowRec(row: number, movs: Array<EmpObj>): Array<EmpObj> {
    function colRec(col: number, movs: Array<EmpObj>): Array<EmpObj> {
      const movs_ = movs.slice();
      if (col === 9) {
        return movs_;
      } else {
        const target = pos[row][col];
        if (target instanceof EmpObj) {
          movs_.push(target);
        }
        return colRec(col + 1, movs_);
      }
    }

    const movs_ = movs.slice();
    if (row === 9) {
      return movs_;
    } else if ((turn === 0 && row !== 0 && row !== 1) || (turn === 1 && row !== 7 && row !== 8)) {
      return rowRec(row + 1, colRec(0, movs_));
    } else {
      return rowRec(row + 1, movs_);
    }
  }

  return rowRec(0, []);
}

function movOnBoard(props: PosTurn, pieceObj: PieceObj): Array<PorE> {
  const pos = props.pos;
  const turn = props.turn;
  const row = pieceObj.row;
  const col = pieceObj.col;
  const movs: Array<PorE> = [];
  const targetRow = (turn === 0) ? (row - 2) : (row + 2);
  const targetCol1 = col + 1;
  const targetCol2 = col - 1;
  const inRange = (x: number) => { return 0 <= x && x <= 8; }

  if (inRange(targetRow)) {
    const pusing = (x: number) => {
      const target = pos[targetRow][x];
      if ((target instanceof EmpObj) || ((target instanceof PieceObj) && (target.whose !== turn))) {
        movs.push(target);
      }
    }

    if (inRange(targetCol1)) { pusing(targetCol1); }
    if (inRange(targetCol2)) { pusing(targetCol2); }
  }

  return movs;
}
