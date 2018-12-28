import Point from '../../../model/shogi/Point'

export default function(a: Point, b: Point): number {
  return a.row - b.row || a.column - b.column
}
