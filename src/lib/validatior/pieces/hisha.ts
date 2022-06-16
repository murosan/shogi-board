import { Hisha0, Hisha1 } from '../../../model/shogi/Piece'
import Point from '../../../model/shogi/Point'
import { Position } from '../../../model/shogi/Position'
import { comp } from '../utils/algorithm'
import getEmpties from '../utils/getEmpties'
import getWithDiff from '../utils/getWithDiff'

export default function hisha(pos: Position, p: Point): Point[] {
  if (!p.piece || (p.piece !== Hisha0 && p.piece !== Hisha1))
    throw new Error('Called validation for hisha, but piece id was not hisha.')

  if (p.row === -1 && p.column === -1) return getEmpties(pos.pos)

  const diffList = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
  ]
  const points: Point[] = []

  for (let i = 0; i < diffList.length; i++) {
    getWithDiff(
      pos.pos,
      p.row + diffList[i][0],
      p.column + diffList[i][1],
      p.piece,
      points,
      diffList[i][0],
      diffList[i][1]
    )
  }

  points.sort(comp)
  return points
}
