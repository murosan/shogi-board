import { Kaku0, Kaku1, Piece } from '../../../model/shogi/Piece'
import Point from '../../../model/shogi/Point'
import Position from '../../../model/shogi/Position'
import getEmpties from '../utils/getEmpties'
import getWithCallbacks from '../utils/getWithCallbacks'

export default function(pos: Position, p: Point): Point[] {
  if (!p.piece || (p.piece !== Kaku0 && p.piece !== Kaku1))
    throw new Error('Called validation for kaku, but piece id was not kaku.')

  if (p.row === -1 && p.column === -1) return getEmpties(pos.pos)
  return onBoard()

  function onBoard(): Point[] {
    const diffList = [[-1, -1], [-1, 1], [1, -1], [1, 1]]
    const points: Point[] = []

    for (let i = 0; i < diffList.length; i++) {
      getWithCallbacks(
        pos.pos,
        p.row + diffList[i][0],
        p.column + diffList[i][1],
        <Piece>p.piece,
        points,
        diffList[i][0],
        diffList[i][1]
      )
    }

    return points
  }
}
