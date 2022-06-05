import { MoveProps } from '../events/MoveProps'

export interface Move extends MoveProps {
  // 手数
  index: number

  // 棋譜の文字列
  str: string

  // 消費時間(秒)
  time?: number

  // 消費時間合計(秒)
  timeTotal?: number

  // コメント
  comment?: string
}
