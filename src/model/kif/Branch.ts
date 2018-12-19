import { History } from './History'

export default interface Branch {
  branches: History[]

  // branches のインデックス
  // 棋譜を表示するときに、どの History を選べば良いか
  // 現在局面を知るために必要
  index: number
}
