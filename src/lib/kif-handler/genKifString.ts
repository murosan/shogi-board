import { MoveProps } from '../../model/events/MoveProps'
import { demote } from '../game-handler/piece'
import { columnString, pieceString, rowString } from '../strings'

/**
 * 棋譜の文字列を生成する
 * @param p MoveProps
 */
export function genKifString({
  source,
  dest,
  piece,
  promote,
}: MoveProps): string {
  const pc: string = pieceString(promote ? demote(piece) : piece)
  const dr: string = rowString(dest.row)
  const dc: string = columnString(dest.column)

  if (source.row === -1) return `${dc}${dr}${pc}打`

  const sr: number = source.row + 1
  const sc: number = source.column + 1
  const promoteStr: () => string = () => {
    if (promote === true) return '成'
    if (promote === false) return '不成'
    return ''
  }

  return `${dc}${dr}${pc}${promoteStr()}(${sc}${sr})`
}
