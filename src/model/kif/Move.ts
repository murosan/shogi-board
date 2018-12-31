import Position from '../shogi/Position'
import Point from '../shogi/Point'
import { Piece } from '../shogi/Piece'

export default interface Move {
  // 棋譜の文字列
  str: string

  // 移動元
  // 持ち駒なら { -1, -1 }
  // 初期局面は undefined 許容
  source?: Point

  // 移動先
  // 初期局面は undefined 許容
  dest?: Point

  // 駒ID
  // 初期局面は undefined 許容
  piece?: Piece

  // 成 or 不成
  // そもそも成も不成も選択できない時は undefined
  promote?: boolean

  // 消費時間
  time?: number

  // 配置
  pos: Position

  // コメント
  comment?: string
}
