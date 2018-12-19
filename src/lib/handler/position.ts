import { Empty, Piece } from '../../model/shogi/Piece'
import Position from '../../model/shogi/Position'
import { Turn } from '../../model/shogi/Turn'
import { decreaseCaptures, increaseCaptures } from './captures'
import { demote } from './piece'

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

  // 移動する駒
  piece: Piece
}

export function move(p: MoveProps): Position {
  const updatedPos: Piece[][] = p.pos.pos.map((row: number[], r: number) =>
    row.map((piece: Piece, c: number) => {
      // 移動前の位置なら空マスに
      if (p.source.row === r && p.source.column === c) return Empty

      // 移動先の位置なら更新
      if (p.dest.row === r && p.dest.column === c) return p.piece

      return piece
    })
  )

  // 持ち駒を更新する
  type CaptureHandler = (cap: number[], turn: Turn) => number[]
  const handleCaptures: CaptureHandler = (cap: number[], turn: Turn) => {
    // 手番ではない場合、何もしない
    if (p.pos.turn !== turn) return cap.slice()

    // 移動先が相手の駒なら持ち駒を増やす
    const d: Piece = p.pos.pos[p.dest.row][p.dest.column]
    if (d * turn < 0) return increaseCaptures(cap, Math.abs(demote(d)))

    // 移動元が持ち駒なら減らす
    if (p.source.row === -1 && p.source.column === -1)
      return decreaseCaptures(cap, Math.abs(p.piece))

    return cap.slice()
  }

  const updatedCap0: number[] = handleCaptures(p.pos.cap0, 1)
  const updatedCap1: number[] = handleCaptures(p.pos.cap1, -1)

  return {
    pos: updatedPos,
    cap0: updatedCap0,
    cap1: updatedCap1,
    turn: <Turn>-p.pos.turn,
    moveCount: p.pos.moveCount + 1,
  }
}
