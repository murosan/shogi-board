import Branch from './Branch'
import Move from './Move'

export type KifComponent = Move | Branch

export default interface History {
  moves: KifComponent[]

  // history のインデックス
  // ブラウザで表示するときに現在局面がどこか探せるように
  index: number
}

export function isBranch(m: KifComponent): m is Branch {
  return 'branches' in m
}
