import { MovProps } from './movings';
import PieceObj from '../game-handler/piece';
import EmpObj from '../game-handler/emp';
import empLocations from './movings-emp-loc';
import { movOnBoard } from './movings-ka';

type PieceOrEmpTargets = Array<PieceObj | EmpObj>;

export default function movHi(props: MovProps): PieceOrEmpTargets {
  const piece = props.pieceObj;
  const positions = props.positions;
  const pos = positions.pos;
  const turn = positions.turn;

  if (isCapturePiece(piece)) {
    return empLocations(pos);
  } else {
    const fncs = [
      [(r: number) => r - 1, (c: number) => c],
      [(r: number) => r + 1, (c: number) => c],
      [(r: number) => r, (c: number) => c - 1],
      [(r: number) => r, (c: number) => c + 1]
    ];
    return movOnBoard({ pos: pos, turn: turn, piece: piece, fn: fncs });
  }
}

function isCapturePiece(piece: PieceObj): boolean {
  return piece.row === -1;
}
