import { Gyoku0, Gyoku1, Piece } from '../../../model/shogi/Piece'
import Point from '../../../model/shogi/Point'
import Position from '../../../model/shogi/Position'
import getFromNexts from '../utils/getFromNexts'

export default function(pos: Position, p: Point): Point[] {
  if (!p.piece || (p.piece !== Gyoku0 && p.piece !== Gyoku1))
    throw new Error('Called validation for gyoku, but piece id was not gyoku.')

  if (p.row === -1 && p.column === -1)
    throw new Error('Gyoku must not be captured')

  const nexts: number[][] = [
    [p.row - 1, p.column - 1],
    [p.row - 1, p.column],
    [p.row - 1, p.column + 1],
    [p.row, p.column - 1],
    [p.row, p.column + 1],
    [p.row + 1, p.column - 1],
    [p.row + 1, p.column],
    [p.row + 1, p.column + 1],
  ]

  return getFromNexts(pos.pos, nexts, <Piece>p.piece)
}
