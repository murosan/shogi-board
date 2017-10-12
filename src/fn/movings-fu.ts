import { MovProps } from './movings';
import PieceObj from '../game-handler/piece';
import EmpObj from '../game-handler/emp';
import PromotionConfirmObj from '../game-handler/promotion-confirm';
import { isPiece, isEmp } from './type-checker';

type CellComponent = PieceObj | EmpObj | PromotionConfirmObj;
type PieceOrEmp = PieceObj | EmpObj;
type EmpTargets = Array<EmpObj>;
type PieceOrEmpTargets = Array<PieceOrEmp>;

interface PosTurn {
  pos: Array<Array<CellComponent>>;
  turn: number;
}
interface AddTargetProps {
  target: CellComponent;
  listCanMoveTo: EmpTargets;
  turn: number;
  row: number;
}

export default function movFu(props: MovProps): PieceOrEmpTargets {
  const piece = props.pieceObj;
  const positions = props.positions;
  const pos = positions.pos;
  const turn = positions.turn;

  if (piece.row === -1) {
    return movCapture({ pos: pos, turn: turn });
  } else {
    return movOnBoard({ pos: pos, turn: turn }, piece);
  }
}

function notDuplicated(col: number, props: PosTurn): boolean {
  const pos = props.pos;
  const turn = props.turn;
  return rowRec(0);

  function rowRec(row: number): boolean {
    if (row === 9) {
      return true;
    } else {
      const target: CellComponent = pos[row][col];
      return duplicatingCheck(target, row);
    }
  }

  function duplicatingCheck(target: CellComponent, row: number): boolean {
    if (isFuAndMine(target)) {
      return false;
    } else {
      return rowRec(row + 1);
    }
  }

  function isFuAndMine(cc: CellComponent): boolean {
    return isPiece(cc) && cc.name === '歩' && cc.whose === turn;
  }
}

function movCapture(props: PosTurn): EmpTargets {
  const pos = props.pos;
  const turn = props.turn;
  return colRec(0, []);

  function colRec(col: number, listCanMoveTo: EmpTargets): EmpTargets {
    if (col === 9) {
      return listCanMoveTo.slice();
    } else {
      return handleRec(listCanMoveTo);
    }

    function handleRec(listCanMoveTo: EmpTargets) {
      const isNotDup = notDuplicated(col, props);
      const list = isNotDup ? rowRec(0, listCanMoveTo) : listCanMoveTo;
      return colRec(col + 1, list);
    }

    function rowRec(row: number, listCanMoveTo: EmpTargets): EmpTargets {
      if (row === 9) {
        return listCanMoveTo.slice();
      } else {
        const target: CellComponent = pos[row][col];
        const movs_ = addTargetIfEmp({ target, listCanMoveTo, turn, row });
        return rowRec(row + 1, movs_);
      }
    }

    function addTargetIfEmp(props: AddTargetProps): EmpTargets {
      if (isEmp(props.target) && isNotEdge(props.row, turn)) {
        return props.listCanMoveTo.concat(props.target);
      } else {
        return props.listCanMoveTo.slice();
      }
    }
  }
}

function movOnBoard(props: PosTurn, pieceObj: PieceObj): PieceOrEmpTargets {
  const pos = props.pos;
  const turn = props.turn;
  const row = pieceObj.row;
  const col = pieceObj.col;
  const targetRow = turn === 0 ? row - 1 : row + 1;

  if (isNotEdge(targetRow, turn)) {
    const target: CellComponent = pos[targetRow][col];
    return setTargetIfEnemyPieceOrEmp(target, turn);
  } else {
    return [];
  }

  function setTargetIfEnemyPieceOrEmp(
    target: CellComponent,
    turn: number,
  ): PieceOrEmpTargets {
    if (isEmp(target) || isEnemyPiece(target, turn)) {
      return [target];
    } else {
      return [];
    }
  }

  function isEnemyPiece(
    target: CellComponent,
    turn: number,
  ): target is PieceObj {
    return isPiece(target) && target.whose !== turn;
  }
}

function isNotEdge(row: number, turn: number): boolean {
  return turn === 0 ? row !== 0 : row !== 8;
}
