import { Piece } from '../../model/shogi/Piece'

export function demote(p: Piece): Piece {
  if (Math.abs(p) < 10) return p

  if (p < 0) return p + 10
  return p - 10
}
