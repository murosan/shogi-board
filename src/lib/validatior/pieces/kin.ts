import {
  Kin0,
  Kin1,
  NariGin0,
  NariGin1,
  NariKei0,
  NariKei1,
  NariKyou0,
  NariKyou1,
  Piece,
  To0,
  To1,
} from '../../../model/shogi/Piece'
import Point from '../../../model/shogi/Point'
import Position from '../../../model/shogi/Position'
import getEmpties from '../utils/getEmpties'
import getFromNexts from '../utils/getFromNexts'

export default function(pos: Position, p: Point): Point[] {
  if (
    !p.piece ||
    (p.piece !== Kin0 &&
      p.piece !== Kin1 &&
      p.piece !== To0 &&
      p.piece !== To1 &&
      p.piece !== NariKyou0 &&
      p.piece !== NariKyou1 &&
      p.piece !== NariKei0 &&
      p.piece !== NariKei1 &&
      p.piece !== NariGin0 &&
      p.piece !== NariGin1)
  )
    throw new Error(
      'Called validation for kin(or promoted piece moves as same as kin), but piece id was not as expected.'
    )

  if (p.row === -1 && p.column === -1) return getEmpties(pos.pos)
  return onBoard()

  function onBoard(): Point[] {
    const nexts: number[][] =
      <Piece>p.piece > 0
        ? [
            [p.row - 1, p.column - 1],
            [p.row - 1, p.column],
            [p.row - 1, p.column + 1],
            [p.row, p.column - 1],
            [p.row, p.column + 1],
            [p.row + 1, p.column],
          ]
        : [
            [p.row - 1, p.column],
            [p.row, p.column - 1],
            [p.row, p.column + 1],
            [p.row + 1, p.column - 1],
            [p.row + 1, p.column],
            [p.row + 1, p.column + 1],
          ]

    return getFromNexts(pos.pos, nexts, <Piece>p.piece)
  }
}
