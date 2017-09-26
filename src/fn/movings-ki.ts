import { MovProps } from './movings';
import PieceObj from '../game-handler/piece';
import EmpObj from '../game-handler/emp';
import empLocations from './movings-emp-loc';
import { movOnBoard } from './movings-gy';

export default function movKi(props: MovProps): Array<PieceObj | EmpObj> {
  const pi = props.pieceObj;
  const po = props.positions;
  const pos = po.pos;
  const row = pi.row;

  if (pi.row === -1) {
    return empLocations(pos);
  } else {
    const col = pi.col;
    const turn = po.turn;
    const targets: Array<Array<number>> =
      turn === 0
        ? [
            [row - 1, col - 1],
            [row - 1, col],
            [row - 1, col + 1],
            [row, col - 1],
            [row, col + 1],
            [row + 1, col]
          ]
        : [
            [row - 1, col],
            [row, col - 1],
            [row, col + 1],
            [row + 1, col - 1],
            [row + 1, col],
            [row + 1, col + 1]
          ];
    return movOnBoard({ pos: pos, turn: turn, possibilities: targets });
  }
}
