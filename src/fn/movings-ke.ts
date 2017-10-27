import { MovProps } from './movings';
import PieceObj from '../game-handler/piece';
import EmpObj from '../game-handler/emp';
import PromotionConfirmObj from '../game-handler/promotion-confirm';
import { isPiece, isEmp } from '../fn/type-checker';

type CellComponent = PieceObj | EmpObj | PromotionConfirmObj;
type EmpTargets = Array<EmpObj>;
type PieceOrEmpTargets = Array<PieceObj | EmpObj>;

interface PosTurn {
  pos: Array<Array<CellComponent>>;
  turn: number;
}

export default function movKe(props: MovProps): PieceOrEmpTargets {
  const piece = props.pieceObj;
  const positions = props.positions;
  const pos = positions.pos;
  const turn = positions.turn;

  if (isCapturePiece(piece)) {
    return movCapture({ pos: pos, turn: turn });
  } else {
    return movOnBoard({ pos: pos, turn: turn }, piece);
  }
}

function movCapture(props: PosTurn): EmpTargets {
  const pos = props.pos;
  const turn = props.turn;
  function rowRec(row: number, movs: EmpTargets): EmpTargets {
    if (row === 9) {
      return movs.slice();
    } else {
      const movs_ = rowIsInRange(row, turn) ? colRec(0, movs) : movs;
      return rowRec(row + 1, movs_);
    }

    function colRec(col: number, movs: EmpTargets): EmpTargets {
      if (col === 9) {
        return movs.slice();
      } else {
        const target = pos[row][col];
        const movs_ = isEmp(target) ? movs.concat(target) : movs;
        return colRec(col + 1, movs_);
      }
    }

    function rowIsInRange(row: number, turn: number): boolean {
      return (
        (turn === 0 && row !== 0 && row !== 1) ||
        (turn === 1 && row !== 7 && row !== 8)
      );
    }
  }

  return rowRec(0, []);
}

function movOnBoard(props: PosTurn, pieceObj: PieceObj): PieceOrEmpTargets {
  const pos = props.pos;
  const turn = props.turn;
  const row = pieceObj.row;
  const col = pieceObj.col;
  const movs: PieceOrEmpTargets = [];
  const targetRow = turn === 0 ? row - 2 : row + 2;
  const targetCol1 = col + 1;
  const targetCol2 = col - 1;

  if (inRange(targetRow)) {
    const pusing = (x: number) => {
      const target: CellComponent = pos[targetRow][x];
      if (isEmp(target) || isEnemyPiece(target, turn)) {
        movs.push(target);
      }
    };

    if (inRange(targetCol1)) {
      pusing(targetCol1);
    }
    if (inRange(targetCol2)) {
      pusing(targetCol2);
    }
  }

  return movs;
}

function isCapturePiece(piece: PieceObj): boolean {
  return piece.row === -1;
}

function inRange(i: number): boolean {
  return 0 <= i && i <= 8;
}

function isEnemyPiece(target: CellComponent, turn: number): target is PieceObj {
  return isPiece(target) && target.whose !== turn;
}
