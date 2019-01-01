import MoveProps from '../../model/events/MoveProps'
import { demote } from '../handler/piece'
import { columnString, pieceString, rowString } from '../strings'

/**
 * 棋譜の文字列を生成する
 * @param p MoveProps
 */
export function genKifString(p: MoveProps): string {
  const pc: string = pieceString(p.promote ? demote(p.piece) : p.piece)
  const dr: string = rowString(p.dest.row)
  const dc: string = columnString(p.dest.column)

  if (p.source.row === -1) return `${dc}${dr}${pc}打`

  const sr: number = p.source.row + 1
  const sc: number = p.source.column + 1
  const promote: string =
    p.promote === undefined ? '' : p.promote ? '成' : '不成'

  return `${dc}${dr}${pc}${promote}(${sc}${sr})`
}
