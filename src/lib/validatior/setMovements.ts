import Point from '../../model/shogi/Point'
import Position from '../../model/shogi/Position'
import {
  Empty,
  Fu0,
  Fu1,
  Kyou0,
  Kyou1,
  Kei0,
  Kei1,
  Gin0,
  Gin1,
  Kin0,
  Kin1,
  Kaku0,
  Kaku1,
  Hisha0,
  Hisha1,
  Gyoku0,
  Gyoku1,
  Uma0,
  Uma1,
  Ryu0,
  Ryu1,
  To0,
  To1,
  NariKyou0,
  NariKyou1,
  NariKei0,
  NariKei1,
  NariGin0,
  NariGin1,
  Piece,
} from '../../model/shogi/Piece'
import fu from './pieces/fu'
import kyou from './pieces/kyou'
import kei from './pieces/kei'
import gin from './pieces/gin'
import kin from './pieces/kin'
import kaku from './pieces/kaku'
import hisha from './pieces/hisha'
import gyoku from './pieces/gyoku'
import uma from './pieces/uma'
import ryu from './pieces/ryu'
import ValidationInfo from '../../model/shogi/ValidationInfo'

/**
 * 全ての動かせる駒の Point 情報をセットする
 * @param vi ValidationInfo セットする対象
 * @param pos Position 局面。この局面にある全ての駒の動ける場所を調べる
 */
export default function(vi: ValidationInfo, pos: Position): void {
  const setForEach = (targets: Point[], point: Point) =>
    targets.forEach(p => {
      const i: Point[][][] =
        <Piece>point.piece * pos.turn > 0 ? vi.turn : vi.next
      i[p.row][p.column] = i[p.row][p.column].concat(point)
    })

  pos.pos.forEach((line, row) =>
    line.forEach((piece, column) => {
      if (piece === Empty) return
      const point: Point = { row, column, piece }
      setForEach(getTargets(pos, point), point)
    })
  )

  pos.cap0.forEach((count, i) => {
    if (count === 0) return
    const point: Point = { row: -1, column: -1, piece: i + 1 }
    setForEach(getTargets(pos, point), point)
  })

  pos.cap1.forEach((count, i) => {
    if (count === 0) return
    const point: Point = { row: -1, column: -1, piece: -(i + 1) }
    setForEach(getTargets(pos, point), point)
  })
}

function getTargets(pos: Position, point: Point): Point[] {
  const piece = point.piece

  if (piece === Empty)
    throw new Error('Cannot get targets to move for empty cell.')
  if (piece === Fu0 || piece === Fu1) return fu(pos, point)
  if (piece === Kyou0 || piece === Kyou1) return kyou(pos, point)
  if (piece === Kei0 || piece === Kei1) return kei(pos, point)
  if (piece === Gin0 || piece === Gin1) return gin(pos, point)
  if (
    piece === Kin0 ||
    piece === Kin1 ||
    piece === To0 ||
    piece === To1 ||
    piece === NariKyou0 ||
    piece === NariKyou1 ||
    piece === NariKei0 ||
    piece === NariKei1 ||
    piece === NariGin0 ||
    piece === NariGin1
  )
    return kin(pos, point)
  if (piece === Kaku0 || piece === Kaku1) return kaku(pos, point)
  if (piece === Hisha0 || piece === Hisha1) return hisha(pos, point)
  if (piece === Gyoku0 || piece === Gyoku1) return gyoku(pos, point)
  if (piece === Uma0 || piece === Uma1) return uma(pos, point)
  if (piece === Ryu0 || piece === Ryu1) return ryu(pos, point)

  throw new Error('Could get targets to move. Got invalid piece ID')
}
