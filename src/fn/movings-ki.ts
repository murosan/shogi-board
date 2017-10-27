import { MovProps } from './movings';
import PieceObj from '../game-handler/piece';
import EmpObj from '../game-handler/emp';
import empLocations from './movings-emp-loc';
import { movOnBoard } from './movings-gy';

type PieceOrEmpTargets = Array<PieceObj | EmpObj>;

export default function movKi(props: MovProps): PieceOrEmpTargets {
  const piece = props.pieceObj;
  const positions = props.positions;
  const pos = positions.pos;
  const row = piece.row;

  if (isCapturePiece(piece)) {
    return empLocations(pos);
  } else {
    const col = piece.col;
    const turn = positions.turn;
    const targetPossibilities: Array<Array<number>> =
      turn === 0
        ? [
            [row - 1, col - 1],
            [row - 1, col],
            [row - 1, col + 1],
            [row, col - 1],
            [row, col + 1],
            [row + 1, col],
          ]
        : [
            [row - 1, col],
            [row, col - 1],
            [row, col + 1],
            [row + 1, col - 1],
            [row + 1, col],
            [row + 1, col + 1],
          ];
    return movOnBoard({
      pos: pos,
      turn: turn,
      possibilities: targetPossibilities,
    });
  }
}

function isCapturePiece(piece: PieceObj): boolean {
  return piece.row === -1;
}
