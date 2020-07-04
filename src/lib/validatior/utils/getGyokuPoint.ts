import { Gyoku0, Piece } from '../../../model/shogi/Piece'
import Point from '../../../model/shogi/Point'
import { Turn } from '../../../model/shogi/Turn'

/**
 * 玉の位置を探す
 * @param pos number[][] 盤上の配置
 * @param turn Turn どっちの玉を探すか。先手玉を探したいときは Sente を渡す
 * @returns 見つかった場合 Point
 *          見つからなかった場合 undefined
 */
export default function (pos: number[][], turn: Turn): Point | undefined {
  for (let r = 0; r < pos.length; r++) {
    for (let c = 0; c < pos.length; c++) {
      const piece: Piece = pos[r][c]
      const isGyoku: boolean = Math.abs(piece) === Gyoku0
      const isOwnersTurn: boolean = piece * turn > 0
      if (isGyoku && isOwnersTurn) return { row: r, column: c, piece }
    }
  }
}
