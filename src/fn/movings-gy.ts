import { MovProps } from './movings';
import PieceObj from '../game-handler/piece';
import EmpObj from '../game-handler/emp';
import PromotionConfirmObj from '../game-handler/promotion-confirm';
import { isPiece, isEmp } from '../fn/type-checker';

type PieceOrEmp = PieceObj | EmpObj;
type PieceOrEmpTargets = Array<PieceOrEmp>;
type PieceOrPromotionConfirm = PieceObj | PromotionConfirmObj;
type CellComponent = PieceOrEmp | PromotionConfirmObj;
type TargetPossibilities = Array<Array<number>>;

interface PosTurn {
  pos: Array<Array<CellComponent>>;
  turn: number;
  possibilities: Array<Array<number>>;
}

export default function movGy(props: MovProps): PieceOrEmpTargets {
  const piece = props.pieceObj;
  const positions = props.positions;
  const pos = positions.pos;
  const turn = positions.turn;
  const possibilities: TargetPossibilities = getPossibilitiesOfTarget(
    piece.row,
    piece.col
  );

  return movOnBoard({ pos: pos, turn: turn, possibilities: possibilities });
}

function getPossibilitiesOfTarget(row: number, col: number): TargetPossibilities {
  return [
    [row - 1, col - 1],
    [row - 1, col],
    [row - 1, col + 1],
    [row, col - 1],
    [row, col + 1],
    [row + 1, col - 1],
    [row + 1, col],
    [row + 1, col + 1]
  ];
}

export function movOnBoard(props: PosTurn): PieceOrEmpTargets {
  const pos = props.pos;
  const turn = props.turn;
  const possibilities: Array<Array<number>> = props.possibilities.filter(
    possibilityIsOnBoard
  );
  const len = possibilities.length;
  const res = getIfEmpOrEnemyPieceRec(0, []);
  return res;

  function getIfEmpOrEnemyPieceRec(
    index: number,
    listCanMoveTo: PieceOrEmpTargets
  ): PieceOrEmpTargets {
    if (index === len) {
      return listCanMoveTo.slice();
    } else {
      const target = getIfEmpOrEnemyPiece(possibilities[index]);
      const targets = target ? listCanMoveTo.concat(target) : listCanMoveTo;
      return getIfEmpOrEnemyPieceRec(index + 1, targets);
    }
  }

  function getIfEmpOrEnemyPiece(possible: Array<number>): PieceOrEmp | null {
    const row = possible[0];
    const col = possible[1];
    const target: CellComponent = pos[row][col];
    if (isEmpOrEnemyPiece(target, turn)) {
      return target;
    } else {
      return null;
    }
  }
}

function possibilityIsOnBoard(
  possible: Array<number>,
  index: number
): Array<number> | undefined {
  const row = possible[0];
  const col = possible[1];
  if (isOnBorad(row, col)) {
    return possible.slice();
  }
}

function isOnBorad(row: number, col: number): boolean {
  return 0 <= row && row <= 8 && 0 <= col && col <= 8;
}

function isEmpOrEnemyPiece(cc: CellComponent, turn: number): cc is EmpObj | PieceObj {
  return isEmp(cc) || isEnemyPiece(cc, turn);
}

function isEnemyPiece(piece: PieceOrPromotionConfirm, turn: number): piece is PieceObj {
  return isPiece(piece) && piece.whose !== turn;
}
