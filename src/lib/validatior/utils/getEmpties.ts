import { Piece, Empty } from '../../../model/shogi/Piece'
import Point from '../../../model/shogi/Point'

export type ValidateFunc = (row: number, column: number) => boolean

export default function(pos: Piece[][], validate?: ValidateFunc): Point[] {
  const points: Point[] = []

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (pos[r][c] !== Empty) continue
      const point: Point = { row: r, column: c }
      if (validate && validate(r, c)) points.push(point)
      if (!validate) points.push(point)
    }
  }

  return points
}
