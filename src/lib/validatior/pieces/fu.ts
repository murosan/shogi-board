import { Fu0, Fu1, Piece } from '../../../model/shogi/Piece'
import Point from '../../../model/shogi/Point'
import Position from '../../../model/shogi/Position'
import getEmpties from '../utils/getEmpties'

export default function(pos: Position, p: Point): Point[] {
  if (!p.piece || (p.piece !== Fu0 && p.piece !== Fu1))
    throw new Error('Called validation for fu, but piece id was not fu.')

  // 二歩チェックのため、すでに歩がある列を入れておく
  const columnsOfContainingFu: number[] = []
  for (let col = 0; col < 9; col++) {
    for (let row = 0; row < 9; row++) {
      if (pos.pos[row][col] === p.piece) {
        columnsOfContainingFu.push(col)
        break
      }
    }
  }

  if (p.row === -1 && p.column === -1) return capture()
  return onBoard()

  function capture(): Point[] {
    const invalidRow: number = <Piece>p.piece > 0 ? 0 : 8
    return getEmpties(
      pos.pos,
      (r: number, c: number) =>
        r !== invalidRow && !columnsOfContainingFu.includes(c)
    )
  }

  function onBoard(): Point[] {
    const nextRow: number = <Piece>p.piece > 0 ? p.row - 1 : p.row + 1

    // 盤外か味方の駒ならなし
    if (
      nextRow < 0 ||
      nextRow > 8 ||
      pos.pos[nextRow][p.column] * <Piece>p.piece > 0
    )
      return []

    // 空マスか、相手の駒ならOK
    return [{ row: nextRow, column: p.column }]
  }
}
