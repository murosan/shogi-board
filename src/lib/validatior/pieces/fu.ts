import { Fu0, Fu1 } from '../../../model/shogi/Piece'
import Point from '../../../model/shogi/Point'
import { Position } from '../../../model/shogi/Position'
import getEmpties from '../utils/getEmpties'

export default function fu(pos: Position, p: Point): Point[] {
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

  if (p.row === -1 && p.column === -1) {
    const invalidRow: number = p.piece > 0 ? 0 : 8
    return getEmpties(pos.pos, [invalidRow], columnsOfContainingFu)
  }

  const nextRow: number = p.piece > 0 ? p.row - 1 : p.row + 1

  // 盤外か味方の駒ならなし
  if (nextRow < 0 || nextRow > 8 || pos.pos[nextRow][p.column] * p.piece > 0)
    return []

  // 空マスか、相手の駒ならOK
  return [{ row: nextRow, column: p.column }]
}
