import Point from '../shogi/Point'
import { Piece } from '../shogi/Piece'

// サーバー側の Move 定義
export default interface EngineMove {
  source: Point
  dest: Point
  pieceId: Piece
  isPromoted: boolean
}
