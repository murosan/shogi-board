import MoveProps from '../../model/events/MoveProps'
import { Empty, Piece } from '../../model/shogi/Piece'
import Position from '../../model/shogi/Position'
import { Gote, Sente, Turn } from '../../model/shogi/Turn'
import { decreaseCaptures, increaseCaptures } from './captures'
import { demote } from './piece'

export function move(p: MoveProps): Position {
  // 持ち駒を更新する
  type CaptureHandler = (cap: number[], turn: Turn) => number[]
  const handleCaptures: CaptureHandler = (cap: number[], turn: Turn) => {
    // 手番ではない場合、何もしない
    if (p.pos.turn !== turn) return cap.slice()

    // 移動先が相手の駒なら持ち駒を増やす
    const d: Piece = p.pos.pos[p.dest.row][p.dest.column]
    if (d * turn < 0) return increaseCaptures(cap, demote(d))

    // 移動元が持ち駒なら減らす
    if (p.source.row === -1 && p.source.column === -1)
      return decreaseCaptures(cap, p.piece)

    return cap.slice()
  }

  const updatedCap0: number[] = handleCaptures(p.pos.cap0, Sente)
  const updatedCap1: number[] = handleCaptures(p.pos.cap1, Gote)

  return {
    pos: moveOnBoard(p),
    cap0: updatedCap0,
    cap1: updatedCap1,
    turn: <Turn>-p.pos.turn,
    moveCount: p.pos.moveCount + 1,
  }
}

export function moveBoardOnly(p: MoveProps): Position {
  return {
    pos: moveOnBoard(p),
    cap0: p.pos.cap0.slice(),
    cap1: p.pos.cap1.slice(),
    turn: <Turn>-p.pos.turn,
    moveCount: p.pos.moveCount + 1,
  }
}

function moveOnBoard(p: MoveProps): number[][] {
  return p.pos.pos.map((line, r) =>
    line.map((piece, c) => {
      // 移動前の位置なら空マスに
      if (p.source.row === r && p.source.column === c) return Empty

      // 移動先の位置なら更新
      if (p.dest.row === r && p.dest.column === c) return p.piece

      return piece
    })
  )
}
