import { Piece } from '../shogi/Piece'
import Position from '../shogi/Position'

export default interface MoveProps {
  // 駒を動かす前の Position
  pos: Position

  // 移動前の位置
  source: {
    row: number
    column: number
  }

  // 移動後の位置
  dest: {
    row: number
    column: number
  }

  // 移動する駒
  piece: Piece

  // undefined: 選択できない局面
  // true: 成
  // false: 不成
  promote?: boolean
}
