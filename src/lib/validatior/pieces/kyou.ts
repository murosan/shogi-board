import { Kyou0, Kyou1 } from '../../../model/shogi/Piece'
import Point from '../../../model/shogi/Point'
import { Position } from '../../../model/shogi/Position'
import getEmpties from '../utils/getEmpties'
import getWithDiff from '../utils/getWithDiff'

export default function kyou(pos: Position, p: Point): Point[] {
  if (!p.piece || (p.piece !== Kyou0 && p.piece !== Kyou1))
    throw new Error('Called validation for kyou, but piece id was not kyou.')

  if (p.row === -1 && p.column === -1) {
    const invalidRow: number = p.piece > 0 ? 0 : 8
    return getEmpties(pos.pos, [invalidRow])
  }

  const diff = p.piece > 0 ? -1 : 1
  const points: Point[] = []
  getWithDiff(pos.pos, p.row + diff, p.column, p.piece, points, diff, 0)
  if (p.piece > 0) points.reverse()
  return points
}
