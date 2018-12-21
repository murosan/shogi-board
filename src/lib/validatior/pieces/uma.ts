import { Piece, Uma0, Uma1 } from '../../../model/shogi/Piece'
import Point from '../../../model/shogi/Point'
import Position from '../../../model/shogi/Position'
import { demote } from '../../handler/piece'
import getFromNexts from '../utils/getFromNexts'
import kaku from './kaku'

export default function(pos: Position, p: Point): Point[] {
  if (!p.piece || (p.piece !== Uma0 || p.piece !== Uma1))
    throw new Error('Called validation for uma, but piece id was not uma.')

  if (p.row === -1 || p.column === -1)
    throw new Error('Uma must not be captured')

  const nexts = [
    [p.row - 1, p.column],
    [p.row, p.column - 1],
    [p.row, p.column + 1],
    [p.row + 1, p.column],
  ]

  return getFromNexts(pos.pos, nexts, <Piece>p.piece).concat(
    kaku(pos, { row: p.row, column: p.column, piece: demote(p.piece) })
  )
}
