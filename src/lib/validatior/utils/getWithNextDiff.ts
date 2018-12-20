import { Piece } from '../../../model/shogi/Piece'
import Point from '../../../model/shogi/Point'

export default function(
  pos: Piece[][],
  row: number,
  column: number,
  piece: Piece,
  points: Point[],
  rowDiff: number,
  columnDiff: number
): void {
  while (0 <= row && row <= 8 && 0 <= column && column <= 8) {
    const target: Piece = pos[row][column]
    if (target * piece > 0) break
    points.push({ row, column })
    if (target * piece < 0) break
    row += rowDiff
    column += columnDiff
  }
}
