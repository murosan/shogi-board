import {
  Empty,
  Fu0,
  Fu1,
  Gin0,
  Gin1,
  Gyoku0,
  Gyoku1,
  Hisha0,
  Hisha1,
  Kaku0,
  Kaku1,
  Kei0,
  Kei1,
  Kin0,
  Kin1,
  Kyou0,
  Kyou1,
  NariGin0,
  NariGin1,
  NariKei0,
  NariKei1,
  NariKyou0,
  NariKyou1,
  Ryu0,
  Ryu1,
  To0,
  To1,
  Uma0,
  Uma1,
} from '../../model/shogi/Piece'
import Point from '../../model/shogi/Point'
import { Position } from '../../model/shogi/Position'
import fu from './pieces/fu'
import gin from './pieces/gin'
import gyoku from './pieces/gyoku'
import hisha from './pieces/hisha'
import kaku from './pieces/kaku'
import kei from './pieces/kei'
import kin from './pieces/kin'
import kyou from './pieces/kyou'
import ryu from './pieces/ryu'
import uma from './pieces/uma'

/**
 * 駒を動かせる場所を取得する
 * @param pos Position 駒の配置
 * @param point Point 動ける場所を取得したい駒の位置
 */
export function getTargets(pos: Position, point: Point): Point[] {
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

  throw new Error('Could not get targets to move. Got invalid piece ID')
}
