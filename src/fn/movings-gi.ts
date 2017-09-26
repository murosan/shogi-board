import { MovProps } from './movings';
import PieceObj from '../game-handler/piece';
import EmpObj from '../game-handler/emp';
import empLocations from './movings-emp-loc';
import { movOnBoard } from './movings-gy';

type PieceOrEmpTargets = Array<PieceObj | EmpObj>;
type Possibilities = Array<Array<number>>;

interface PossibilityProps {
  turn: number;
  piece: PieceObj
}

export default function movGi(props: MovProps): PieceOrEmpTargets {
  const piece = props.pieceObj;
  const positions = props.positions;
  const pos = positions.pos;

  if (isCapturePiece(piece)) {
    return empLocations(pos);
  } else {
    const turn = positions.turn;
    const possibilityProps = {
      turn: turn,
      piece: piece
    }
    const possibilities: Possibilities = getTargetPossibilities(possibilityProps);
    return movOnBoard({ pos: pos, turn: turn, possibilities: possibilities });
  }
}

function isCapturePiece(piece: PieceObj): boolean {
  return piece.row === -1;
}

function getTargetPossibilities(props: PossibilityProps): Possibilities {
  const row = props.piece.row;
  const col = props.piece.col;
  return props.turn === 0
    ? [
        [row - 1, col - 1],
        [row - 1, col],
        [row - 1, col + 1],
        [row + 1, col - 1],
        [row + 1, col + 1]
      ]
    : [
        [row - 1, col - 1],
        [row - 1, col + 1],
        [row + 1, col - 1],
        [row + 1, col],
        [row + 1, col + 1]
      ];
}
