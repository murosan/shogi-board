import Branch from './Branch'
import { Move } from './Move'

export type KifuComponent = Move | Branch

// TODO: もうちょい持ち方考える
// 理想は
// {
//   head: Move,
//   next: History,
//   isCurrent: boolean
// }
// だが、JSON互換的に苦しい感じ
export default interface History {
  moves: KifuComponent[]

  // history のインデックス
  // ブラウザで表示するときに現在局面がどこか探せるように
  index: number
}

export function isBranch(m: KifuComponent): m is Branch {
  return 'branches' in m
}
