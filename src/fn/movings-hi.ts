import { MovProps } from './movings';
import PieceObj from '../game-handler/piece';
import EmpObj from '../game-handler/emp';
import empLocations from './movings-emp-loc';
import { movOnBoard } from './movings-ka';

export default function movHi(props: MovProps): Array<PieceObj | EmpObj> {
  const pi = props.pieceObj;
  const po = props.positions;
  const pos = po.pos;
  const turn = po.turn;

  if (pi.row === -1) {
    return empLocations(pos);
  } else {
    const fncs = [
      [(r: number) => r - 1, (c: number) => c],
      [(r: number) => r + 1, (c: number) => c],
      [(r: number) => r, (c: number) => c - 1],
      [(r: number) => r, (c: number) => c + 1]
    ];
    return movOnBoard({ pos: pos, turn: turn, piece: pi, fn: fncs });
  }
}
