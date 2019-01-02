import Branch from '../../model/kif/Branch'
import History, { isBranch, KifComponent } from '../../model/kif/History'
import Kif from '../../model/kif/Kif'

/**
 * 現在局面を更新した新しい棋譜を返す
 * @param k Kif 更新したい棋譜
 * @param x number 現在局面にしたい手数
 * @param y number | undefined 分岐を切り替える場合のみ、分岐のインデックス
 */
export function changeIndex(k: Kif, x: number, y?: number): Kif {
  return {
    meta: k.meta,
    history: changeHistory(k.history, x, y),
  }
}

// TODO: Move にインデックスを入れたので、少しシンプルにできる
function changeHistory(h: History, x: number, y?: number): History {
  const lastIndex: number = h.moves.length - 1
  const last: KifComponent = h.moves[lastIndex]
  const init: KifComponent[] = h.moves.slice(0, lastIndex)

  const xPassesIfBranch: number = x <= lastIndex ? 0 : x - lastIndex

  const moves: KifComponent[] = isBranch(last)
    ? init.concat(changeBranch(last, xPassesIfBranch, y))
    : h.moves.slice()

  const index: number = x <= lastIndex ? x : lastIndex

  return { moves, index }
}

function changeBranch(b: Branch, x: number, y?: number): Branch {
  const index = x === 0 && y !== undefined ? y : b.index

  if (x === 0)
    return {
      branches: b.branches.map(h => changeHistory(h, 0)),
      index,
    }

  const branches = b.branches.map((h: History, i: number) =>
    i === b.index ? changeHistory(h, x, y) : h
  )

  return { branches, index }
}
