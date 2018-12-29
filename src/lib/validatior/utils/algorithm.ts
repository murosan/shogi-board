import Point from '../../../model/shogi/Point'

export function comp(a: Point, b: Point): number {
  return a.row - b.row || a.column - b.column
}

export function exists(pts: Point[], p: Point): boolean {
  let i = pts.length >> 1
  let l = 0
  let r = pts.length - 1

  while (l <= r) {
    if (pts[i].row === p.row && pts[i].column === p.column) return true
    if (pts[i].row < p.row) l = i + 1
    else if (pts[i].row > p.row) r = i - 1
    else if (pts[i].column < p.column) l = i + 1
    else r = i - 1
    i = l + ((r - l) >> 1)
  }

  return false
}
