import MoveProps from '../events/MoveProps'

export default interface Move extends MoveProps {
  // 棋譜の文字列
  str: string

  // 消費時間
  time?: number

  // コメント
  comment?: string
}
