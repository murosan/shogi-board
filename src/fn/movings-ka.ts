import { MovProps } from './movings';
import PieceObj from '../game-handler/piece';
import EmpObj from '../game-handler/emp';
import PromotionConfirmObj from '../game-handler/promotion-confirm';
import empLocations from './movings-emp-loc';
import { isPiece, isEmp } from '../fn/type-checker';

type Fn = (n: number) => number;
type PieceOrEmp = PieceObj | EmpObj;
type CellComponent = PieceOrEmp | PromotionConfirmObj;
type PieceOrEmpTargets = Array<PieceOrEmp>;

interface PosTurnPieceFn {
  pos: Array<Array<CellComponent>>;
  turn: number;
  piece: PieceObj;
  fn: Array<Array<Fn>>;
}
interface AddIfEnemyProps {
  target: PieceObj;
  movs: PieceOrEmpTargets;
  turn: number;
}
interface AddIfEmpProps {
  target: EmpObj | PromotionConfirmObj;
  movs: PieceOrEmpTargets;
  turn: number;
  row: number;
  col: number;
}

export default function movKa(props: MovProps): PieceOrEmpTargets {
  const piece = props.pieceObj;
  const positions = props.positions;
  const pos = positions.pos;
  const turn = positions.turn;

  if (isCapturePiece(piece)) {
    return empLocations(pos);
  } else {
    const fncs = [
      [(r: number) => r - 1, (c: number) => c - 1],
      [(r: number) => r - 1, (c: number) => c + 1],
      [(r: number) => r + 1, (c: number) => c - 1],
      [(r: number) => r + 1, (c: number) => c + 1],
    ];
    return movOnBoard({ pos: pos, turn: turn, piece: piece, fn: fncs });
  }
}

export function movOnBoard(props: PosTurnPieceFn): PieceOrEmpTargets {
  const pos = props.pos;
  const turn = props.turn;
  const piece = props.piece;
  const row = piece.row;
  const col = piece.col;
  const movs: PieceOrEmpTargets = [];

  return checkRec(movs, row, col, props.fn[0][0], props.fn[0][1])
    .concat(checkRec(movs, row, col, props.fn[1][0], props.fn[1][1]))
    .concat(checkRec(movs, row, col, props.fn[2][0], props.fn[2][1]))
    .concat(checkRec(movs, row, col, props.fn[3][0], props.fn[3][1]));

  function checkRec(
    movs: PieceOrEmpTargets,
    r: number,
    c: number,
    rowFn: Fn,
    colFn: Fn,
  ): PieceOrEmpTargets {
    const movs_ = movs.slice();
    const row = rowFn(r);
    const col = colFn(c);

    if (isOutOfBoard(row, col)) {
      return movs_;
    } else {
      return handleRec(movs_);
    }

    function handleRec(movs: PieceOrEmpTargets) {
      const target: CellComponent = pos[row][col];
      if (isPiece(target)) {
        return addTargetIfEnemyPiece({ target, movs, turn });
      } else {
        return addIfEmpAndRec({ target, movs, turn, row, col });
      }
    }

    function addTargetIfEnemyPiece(
      addProps: AddIfEnemyProps,
    ): PieceOrEmpTargets {
      if (isMine(addProps.target, turn)) {
        return movs.slice();
      } else {
        return movs.concat(addProps.target);
      }
    }

    function addIfEmpAndRec(addProps: AddIfEmpProps): PieceOrEmpTargets {
      const targets = isEmp(addProps.target)
        ? movs.concat(addProps.target)
        : movs.slice();
      return checkRec(targets, addProps.row, addProps.col, rowFn, colFn);
    }

    function isMine(piece: PieceObj, turn: number): boolean {
      return piece.whose === turn;
    }
  }
}

function isCapturePiece(piece: PieceObj): boolean {
  return piece.row === -1;
}

function isOutOfBoard(row: number, col: number): boolean {
  return 0 >= row || row >= 8 || 0 >= col || col >= 8;
}
