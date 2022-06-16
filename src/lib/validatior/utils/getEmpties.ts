import { Piece, Empty } from '../../../model/shogi/Piece'
import Point from '../../../model/shogi/Point'

export default function getEmpties(
  pos: Piece[][],
  invalidRows?: number[],
  invalidColumns?: number[]
): Point[] {
  const points: Point[] = []

  for (let r = 0; r < 9; r++) {
    if (invalidRows && invalidRows.includes(r)) continue

    for (let c = 0; c < 9; c++) {
      const columnIsInvalid = invalidColumns && invalidColumns.includes(c)
      if (columnIsInvalid || pos[r][c] !== Empty) continue
      points.push({ row: r, column: c })
    }
  }

  return points
}
