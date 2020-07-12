import { Empty } from '../model/shogi/Piece'
import { Position } from '../model/shogi/Position'
import { Sente } from '../model/shogi/Turn'

export function emptyPosition(): Position {
  return {
    pos: [
      [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
      [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
      [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
      [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
      [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
      [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
      [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
      [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
      [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    ],
    cap0: [0, 0, 0, 0, 0, 0, 0],
    cap1: [0, 0, 0, 0, 0, 0, 0],
    turn: Sente,
    moveCount: 0,
  }
}
