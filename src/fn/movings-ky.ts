import { MovProps } from './movings';
import PieceObj from '../game-handler/piece';
import EmpObj from '../game-handler/emp';
import PromotionConfirmObj from '../game-handler/promotion-confirm';
import { isPiece, isEmp } from '../fn/type-checker';

type CellComponent = PieceObj | EmpObj | PromotionConfirmObj;
type PieceOrEmp = PieceObj | EmpObj;
type PieceOrEmpTargets = Array<PieceOrEmp>;
type EmpTargets = Array<EmpObj>;

interface PosTurn {
  pos: Array<Array<CellComponent>>;
  turn: number;
}

export default function movKy(props: MovProps): PieceOrEmpTargets {
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

function movCapture(props: PosTurn): EmpTargets {
  const pos = props.pos;
  const turn = props.turn;

  function rowRec(row: number, movs: EmpTargets): EmpTargets {
    if (row === 9) {
      return movs.slice();
    } else {
      const movs_ = isNotEdge(row, turn) ? colRec(0, movs) : movs;
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

    function isNotEdge(row: number, turn: number): boolean {
      return (turn === 0 && row !== 0) || (turn === 1 && row !== 8);
    }
  }

  return rowRec(0, []);
}

function movOnBoard(props: PosTurn, pieceObj: PieceObj): PieceOrEmpTargets {
  const pos = props.pos;
  const turn = props.turn;
  const row = pieceObj.row;
  const col = pieceObj.col;

  function rowRec(r: number, movs: PieceOrEmpTargets): PieceOrEmpTargets {
    const targetRow = turn === 0 ? r - 1 : r + 1;
    if (isOutOfBoard(targetRow)) {
      return movs.slice();
    } else {
      return handleRec(targetRow, movs);
    }
  }

  function handleRec(row: number, movs: PieceOrEmpTargets): PieceOrEmpTargets {
    const target: CellComponent = pos[row][col];
    if (isPiece(target)) {
      const movs_ = isEnemyPiece(target, turn)
        ? movs.concat(target)
        : movs.slice();
      return movs_;
    } else {
      const movs_ = isEmp(target) ? movs.concat(target) : movs;
      return rowRec(row, movs_);
    }
  }

  function isOutOfBoard(row: number): boolean {
    return row < 0 || 8 < row;
  }

  function isEnemyPiece(piece: PieceObj, turn: number): boolean {
    return piece.whose !== turn;
  }

  return rowRec(row, []);
}
