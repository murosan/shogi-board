import { Piece } from '../shogi/Piece'
import Confirm from '../shogi/Confirm'

export type ClickProps = {
  // クリックされた駒のIDか Confirm オブジェクト
  clicked: Piece | Confirm

  // 行。将棋の表現と違って行が先なので注意
  row: number

  // 列。列は後
  column: number

  // 持ち駒が選択された場合のみ、何枚目のという情報が入る
  i?: number

  // Confirm オブジェクトが選択された時のみ、成る場合は true にする
  // 不成は false
  promote?: boolean
}
