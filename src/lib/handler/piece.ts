import {
  Piece,
  Empty,
  Hisha0,
  Kin0,
  Fu0,
  Fu1,
  Kyou0,
  Kyou1,
  Kei0,
  Kei1,
} from '../../model/shogi/Piece'

/**
 * 駒を成る
 * canPromote を通っている前提
 * @param p Piece 成る前の駒
 */
export function promote(p: Piece): Piece {
  if (p > 0) return p + 10
  return p - 10
}

/**
 * 駒を成る前の駒にする
 * @param p Piece 成駒
 */
export function demote(p: Piece): Piece {
  if (Math.abs(p) < 10) return p

  if (p < 0) return p + 10
  return p - 10
}

export interface CanPromoteProps {
  // 移動前の行
  sourceRow: number

  // 移動後の行
  destRow: number

  // 移動する駒
  piece: Piece
}

/**
 * 成・不成の選択ができるかどうか
 * 選択可能: true
 * 選択不可: false
 * @param props CanPromoteProps
 * @returns boolean
 *          成れる駒 && sourceRow か destRow が敵陣なら true
 *          成れない駒(金とか、既に成駒の場合)なら false
 */
export function canPromote(props: CanPromoteProps): boolean {
  // 持ち駒
  if (props.sourceRow === -1) return false

  const isPromotable: boolean =
    props.piece !== Empty &&
    Math.abs(props.piece) !== Kin0 &&
    Math.abs(props.piece) <= Hisha0

  const rows: number[] = props.piece > 0 ? [0, 1, 2] : [6, 7, 8]
  const isInEnemyArea: boolean =
    rows.includes(props.sourceRow) || rows.includes(props.destRow)

  return isPromotable && isInEnemyArea
}

/**
 * 移動後に、必ず成る必要があるか
 * 歩・香・桂が不成の場合に次に動けないとき true
 * @param p Piece 動かす駒
 * @param row 移動後の行
 * @returns boolean
 *          成必要がある場合 true
 */
export function mustPromote(p: Piece, row: number): boolean {
  return (
    ((p === Fu0 || p === Kyou0) && row === 0) ||
    ((p === Fu1 || p === Kyou1) && row === 8) ||
    (p === Kei0 && (row === 0 || row === 1)) ||
    (p === Kei1 && (row === 8 || row === 7))
  )
}
