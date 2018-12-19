import Position from '../shogi/Position'
import Point from '../shogi/Point'
import { Piece } from '../shogi/Piece'

export default interface Move {
  // 棋譜の文字列
  // TODO: できれば無くしたい。
  str: string

  // 移動元
  // 持ち駒なら { -1, -1 }
  source: Point

  // 移動先
  dest: Point

  // 駒ID
  piece: Piece

  // 成 or 不成
  // そもそも成も不成も選択できない時は undefined
  promote?: boolean

  // 消費時間
  time?: number

  // 配置
  // 入れておくとサイズはでかくなるが、色々楽なので
  // 問題が出たら考える
  pos: Position

  // コメント
  comment: string
}
