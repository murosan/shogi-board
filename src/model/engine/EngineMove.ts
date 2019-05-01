import Point from '../shogi/Point'
import { Piece } from '../shogi/Piece'

// サーバー側の Move 定義
export class EngineMove {
  source: Point
  dest: Point
  pieceId: Piece
  isPromoted: boolean
  constructor(source: Point, dest: Point, pieceId: Piece, isPromoted: boolean) {
    this.source = source
    this.dest = dest
    this.pieceId = pieceId
    this.isPromoted = isPromoted
  }
}
