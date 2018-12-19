import { Piece, Ryu0, Ryu1 } from '../../../model/shogi/Piece'
import Point from '../../../model/shogi/Point'
import Position from '../../../model/shogi/Position'
import getFromNexts from '../utils/getFromNexts'
import hisha from './hisha'

export default function(pos: Position, p: Point): Point[] {
  if (!p.piece || (p.piece !== Ryu0 && p.piece !== Ryu1))
    throw new Error('Called validation for ryu, but piece id was not ryu.')

  if (p.row === -1 || p.column === -1)
    throw new Error('Ryu must not be captured')

  const nexts = [
    [p.row - 1, p.column - 1],
    [p.row - 1, p.column + 1],
    [p.row + 1, p.column - 1],
    [p.row + 1, p.column + 1],
  ]

  return getFromNexts(pos.pos, nexts, <Piece>p.piece).concat(hisha(pos, p))
}
