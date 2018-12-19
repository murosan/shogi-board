import { Hisha0, Hisha1, Piece } from '../../../model/shogi/Piece'
import Point from '../../../model/shogi/Point'
import Position from '../../../model/shogi/Position'
import getEmpties from '../utils/getEmpties'
import getWithCallbacks from '../utils/getWithCallbacks'

export default function(pos: Position, p: Point): Point[] {
  if (!p.piece || (p.piece !== Hisha0 && p.piece !== Hisha1))
    throw new Error('Called validation for hisha, but piece id was not hisha.')

  if (p.row === -1 && p.column === -1) return getEmpties(pos.pos)
  return onBoard()

  function onBoard(): Point[] {
    const diffList = [[-1, 0], [1, 0], [0, 1], [0, 1]]
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
