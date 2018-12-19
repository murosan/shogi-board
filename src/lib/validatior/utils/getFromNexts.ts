import { Piece } from '../../../model/shogi/Piece'
import Point from '../../../model/shogi/Point'

export default function(pos: Piece[][], nexts: number[][], p: Piece): Point[] {
  const points: Point[] = []

  for (let i = 0; i < nexts.length; i++) {
    const row = nexts[i][0]
    const column = nexts[i][1]
    if (
      row >= 0 &&
      row <= 8 &&
      column >= 0 &&
      column <= 8 &&
      pos[row][column] * p <= 0
    )
      points.push({ row, column })
  }

  return points
}
