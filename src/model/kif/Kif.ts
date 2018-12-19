import { History } from './History'
import Meta from './Meta'

export default interface Kif {
  // 対局者などの対局情報
  meta: Meta

  // 棋譜
  history: History[]

  // history のインデックス
  // ブラウザで表示するときに現在局面がどこか探せるように
  index: number
}
