import { MoveProps } from '../../model/events/MoveProps'
import {
  Fu0,
  Fu1,
  Gyoku0,
  Gyoku1,
  Hisha0,
  Hisha1,
  Kaku0,
  Kaku1,
  Kei0,
  Kei1,
  Kyou0,
  Kyou1,
  Ryu0,
  Ryu1,
  Uma0,
  Uma1,
} from '../../model/shogi/Piece'
import Point from '../../model/shogi/Point'
import { Position } from '../../model/shogi/Position'
import { Turn } from '../../model/shogi/Turn'
import { canPromote, demote } from '../game/piece'
import { columnString, pieceString, rowString } from '../../lib/strings'
import { getTargets } from '../../lib/validatior/getTargets'

/*
優先順位イメージ

上|引
左|右
寄
直
(左|右)寄
(左|右)(上|引)
*/

/**
 * 棋譜の文字列を生成する
 * 生成のルールについては以下を参照
 * https://www.shogi.or.jp/faq/kihuhyouki.html
 *
 * @param props MoveProps
 * @param prev Point 前回の指し手
 */
export function genKifuString(props: MoveProps, prev: Point): string {
  const { source, dest, piece: _piece, promote, pos } = props
  const piece = promote ? demote(_piece) : _piece
  const { row: srow } = source
  const { row: drow, column: dcol } = dest

  const pc: string = pieceString(piece)

  const dr: string = rowString(drow)
  const dc: string = columnString(dcol)
  let base: string

  // 同~ のように表記するか
  const isSame: boolean = prev.row === drow && prev.column === dcol
  if (isSame) base = `同${pc}`
  else base = `${dc}${dr}${pc}`

  // 味方の同じ種類の駒が他にあれば取得し、dest に移動できるものをリストアップする
  const sourcePoint = { ...source, piece }
  const targettings: Point[] = findSamePieces(sourcePoint, pos).filter(p =>
    getTargets(pos, p).some(
      ({ row, column }) => row === drow && column === dcol
    )
  )

  const isMulti: boolean = targettings.length > 0

  // 持ち駒から打つ場合
  // 他に dest に移動できる駒が存在すれば '打' をつける
  if (srow === -1) {
    if (isMulti) return `${base}打`
    return base
  }

  if (
    piece === Kei0 ||
    piece === Kei1 ||
    piece === Hisha0 ||
    piece === Hisha1 ||
    piece === Kaku0 ||
    piece === Kaku1 ||
    piece === Ryu0 ||
    piece === Ryu1 ||
    piece === Uma0 ||
    piece === Uma1
  )
    base += additionalForTwo(props, targettings[0])
  else if (
    piece !== Gyoku0 &&
    piece !== Gyoku1 &&
    piece !== Fu0 &&
    piece !== Fu1 &&
    piece !== Kyou0 &&
    piece !== Kyou1
  )
    base += additional(props, targettings)

  // true → 成
  // false → 不成
  // undefined → 無印
  // MoveProps を参照。
  if (promote) base += '成'
  // 成れる駒なら 不成 とする
  // undefined を弾いている
  else if (promote === false) base += '不成'

  return base
}

function findSamePieces(point: Point, position: Position): Point[] {
  const { row, column, piece } = point
  const points: Point[] = []

  const { turn, pos } = position
  for (let r = 0; r <= 8; r++) {
    for (let c = 0; c <= 8; c++) {
      if (r === row && c === column) continue // 全く同じ駒は無視

      const p = pos[r][c]
      if (turn * p > 0 && p === piece) points.push({ row: r, column: c, piece })
    }
  }

  return points
}

function additionalForTwo(
  { source, dest, pos: { turn } }: MoveProps,
  another?: Point
): string {
  if (!another) return ''
  const { row: srow, column: scol } = source
  const { row: drow } = dest
  const { row: arow, column: acol } = another

  if (srow === drow && arow !== drow) return '寄'
  if (
    (srow === drow && arow === drow) ||
    (isAbove(srow, drow, turn) && isAbove(arow, drow, turn)) ||
    (isBelow(srow, drow, turn) && isBelow(arow, drow, turn))
  ) {
    if (isLeft(scol, acol, turn)) return '左'
    return '右'
  }
  if (isAbove(srow, arow, turn)) return '引'
  return '上'
}

function additional(
  { source, dest, pos: { turn } }: MoveProps,
  targettings: Point[]
): string {
  if (targettings.length === 0) return ''

  const { row: srow, column: scol } = source
  const { row: drow, column: dcol } = dest

  const moving = {
    sameRow: srow === drow,
    sameCol: scol === dcol,
    below: isBelow(srow, drow, turn),
    above: isAbove(srow, drow, turn),
    left: isLeft(scol, dcol, turn),
    right: isRight(scol, dcol, turn),
  }

  const another = {
    sameRow: false,
    below: false,
    above: false,
    left: false,
    right: false,
  }

  for (let { row, column: col } of targettings) {
    if (row === drow) another.sameRow = true
    if (isBelow(row, drow, turn)) another.below = true
    if (isAbove(row, drow, turn)) another.above = true
    if (isLeft(col, dcol, turn)) another.left = true
    if (isRight(col, dcol, turn)) another.right = true
  }

  if (moving.below && !another.below) return '上'
  if (moving.below && moving.sameCol) return '直'
  if (moving.above && !another.above) return '引'
  if (moving.sameRow && !another.sameRow) return '寄'
  if (moving.left && !another.left) return '左'
  if (moving.right && !another.right) return '右'

  if (moving.sameRow && moving.left) return '左寄'
  if (moving.sameRow) return '右寄'

  if (moving.below && moving.left) return '左上'
  if (moving.below) return '右上'

  if (moving.above && moving.left) return '左引'
  return '右引'
  // '引直' はありえない
}

function isBelow(srow: number, drow: number, turn: Turn): boolean {
  return (srow - drow) * turn > 0
}
function isAbove(srow: number, drow: number, turn: Turn): boolean {
  return (srow - drow) * turn < 0
}

function isLeft(scol: number, dcol: number, turn: Turn): boolean {
  return (scol - dcol) * turn > 0
}
function isRight(scol: number, dcol: number, turn: Turn): boolean {
  return (scol - dcol) * turn < 0
}
