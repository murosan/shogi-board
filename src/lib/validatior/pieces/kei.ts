import { Empty, Kei0, Kei1, Piece } from '../../../model/shogi/Piece'
import Point from '../../../model/shogi/Point'
import Position from '../../../model/shogi/Position'
import getEmpties from '../utils/getEmpties'

export default function(pos: Position, p: Point): Point[] {
  if (!p.piece || (p.piece !== Kei0 && p.piece !== Kei1))
    throw new Error('Called validation for kei, but piece id was not kei.')

  if (p.row === -1 && p.column === -1) return capture()
  return onBoard()

  function capture(): Point[] {
    const invalidRow1: number = <Piece>p.piece > 0 ? 0 : 8
    const invalidRow2: number =
      <Piece>p.piece > 0 ? invalidRow1 + 1 : invalidRow1 - 1
    return getEmpties(
      pos.pos,
      (r: number, _: number) => r !== invalidRow1 && r !== invalidRow2
    )
  }

  function onBoard(): Point[] {
    const nextRow: number = <Piece>p.piece > 0 ? p.row - 2 : p.row + 2
    if (nextRow < 0 || nextRow > 8)
      throw new Error(
        '[validate kei] Found the piece that can move to nowhere.\n' +
          'It must be promoted when last moved.'
      )

    const getPoints = (c: number) => {
      if (c < 0 || c > 8) return []

      const target: Piece = pos.pos[nextRow][c]
      if (target === Empty || target * <Piece>p.piece < 0)
        return [{ row: nextRow, column: c }]
      return []
    }

    return getPoints(p.column - 1).concat(getPoints(p.column + 1))
  }
}
