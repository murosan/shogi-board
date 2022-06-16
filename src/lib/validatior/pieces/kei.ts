import { Kei0, Kei1 } from '../../../model/shogi/Piece'
import Point from '../../../model/shogi/Point'
import { Position } from '../../../model/shogi/Position'
import getEmpties from '../utils/getEmpties'
import getFromNexts from '../utils/getFromNexts'

export default function kei(pos: Position, p: Point): Point[] {
  if (!p.piece || (p.piece !== Kei0 && p.piece !== Kei1))
    throw new Error('Called validation for kei, but piece id was not kei.')

  if (p.row === -1 && p.column === -1) {
    const invalidRow1: number = p.piece > 0 ? 0 : 8
    const invalidRow2: number = p.piece > 0 ? invalidRow1 + 1 : invalidRow1 - 1
    return getEmpties(pos.pos, [invalidRow1, invalidRow2])
  }

  const nextRow: number = p.piece > 0 ? p.row - 2 : p.row + 2
  if (nextRow < 0 || nextRow > 8) return []
  const nexts: number[][] = [
    [nextRow, p.column - 1],
    [nextRow, p.column + 1],
  ]
  return getFromNexts(pos.pos, nexts, p.piece)
}
