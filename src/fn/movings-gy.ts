import { MovProps } from './movings';
import PieceObj from '../game-handler/piece';
import EmpObj from '../game-handler/emp';
import PromotionConfirmObj from '../game-handler/promotion-confirm';

type PorE = PieceObj | EmpObj;

interface PosTurn {
  pos: Array<Array<PorE | PromotionConfirmObj>>;
  turn: number;
  targets: Array<Array<number>>
}

export default function movGy(props: MovProps): Array<PorE> {
  const pi = props.pieceObj;
  const po = props.positions;
  const pos = po.pos;
  const turn = po.turn;
  const row = pi.row;
  const col = pi.col;
  const targets: Array<Array<number>> = [
    [row - 1, col - 1], [row - 1, col], [row - 1, col + 1],
    [row, col - 1], [row, col + 1],
    [row + 1, col - 1], [row + 1, col], [row + 1, col + 1]
  ];

  return movOnBoard({ pos: pos, turn: turn, targets: targets });
}

export function movOnBoard(props: PosTurn): Array<PorE> {
  const pos = props.pos;
  const turn = props.turn;
  const targets = props.targets;
  const movs: Array<PorE> = [];


  for (const t of targets) {
    const r: number = t[0];
    const c: number = t[1];
    if (0 <= r && r <= 8 && 0 <= c && c <= 8) {
      const p = pos[r][c];
      if ((p instanceof EmpObj) || ((p instanceof PieceObj) && (p.whose !== turn))) {
        movs.push(p);
      }
    }
  }

  return movs;
}
