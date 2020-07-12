import { Piece } from '../shogi/Piece'
import { Position } from '../shogi/Position'

export interface MoveProps {
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

  // 一手前の移動先
  // 同じだったら`同歩`のような棋譜を生成するため
  prevDest?: {
    row: number
    column: number
  }

  // 移動する駒
  piece: Piece

  // undefined: 成・不成 はそもそも選択できない状態
  // true: 成
  // false: 不成
  promote?: boolean
}
