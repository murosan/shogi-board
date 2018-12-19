import { Piece } from './Piece'
import { Turn } from './Turn'

export default interface Position {
  // 駒の配置 9*9 (0始まり、8まで)
  // 初期局面の例は ./PositionInit.ts
  pos: Piece[][]

  // 先手の持ち駒[歩の枚数, 香の枚数, 桂, 銀, 金, 角, 飛]
  // TODO: Turnは [先手:1] [後手:-1] にしたので修正するか検討
  cap0: number[]

  // 後手の持ち駒[歩の枚数, 香の枚数, 桂, 銀, 金, 角, 飛]
  cap1: number[]

  // 手番
  //  1: 先手番
  // -1: 後手番
  turn: Turn

  // 手数
  // 初期局面は0
  moveCount: number
}
