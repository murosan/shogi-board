import { Kyou0, Kyou1, Piece } from '../../../model/shogi/Piece'
import Point from '../../../model/shogi/Point'
import Position from '../../../model/shogi/Position'
import getEmpties from '../utils/getEmpties'
import getWithCallbacks from '../utils/getWithCallbacks'

export default function(pos: Position, p: Point): Point[] {
  if (!p.piece || (p.piece !== Kyou0 && p.piece !== Kyou1))
    throw new Error('Called validation for kyou, but piece id was not kyou.')

  if (p.row === -1 && p.column === -1) return capture()
  return onBoard()

  function capture(): Point[] {
    const invalidRow: number = <Piece>p.piece > 0 ? 0 : 8
    return getEmpties(pos.pos, (r: number, c: number) => r !== invalidRow)
  }

  function onBoard(): Point[] {
    const diff = <Piece>p.piece > 0 ? -1 : 1
    const points: Point[] = []

    getWithCallbacks(
      pos.pos,
      p.row + diff,
      p.column,
      <Piece>p.piece,
      points,
      diff,
      0
    )

    return points
  }
}
