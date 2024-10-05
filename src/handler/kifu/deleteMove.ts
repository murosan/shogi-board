import Branch from '../../model/kifu/Branch'
import History, { isBranch } from '../../model/kifu/History'
import Kifu from '../../model/kifu/Kifu'
import { Move } from '../../model/kifu/Move'
import { moveEquals } from './pushMove'

export default function deleteMove(k: Kifu, m: Move): Kifu {
  if (m.index === 0) throw new Error('初期局面は削除できません')
  return {
    meta: k.meta,
    history: deleteFromHistory(k.history, m),
  }
}

function deleteFromHistory(h: History, m: Move): History {
  const lastIndex = h.moves.length - 1
  const last = h.moves[lastIndex]

  // 末尾がBranchでその中に消したいMoveがある場合
  if (isBranch(last) && m.index >= last.branches[0].moves[0].index) {
    let index = Math.min(lastIndex, h.index)
    let moves = h.moves.slice(0, lastIndex)

    const deleted = deleteFromBranch(last, m)
    if (deleted.branches.length <= 1) {
      // 分岐が無くなっていたらマージする
      index += deleted.branches[0].index
      moves = moves.concat(deleted.branches[0].moves)
    } else {
      moves = moves.concat(deleted)
    }

    return { index, moves }
  }

  const at = m.index - (h.moves[0] as Move).index
  const mv = h.moves[at] as Move

  if (mv && moveEquals(mv, m))
    return {
      index: Math.min(at - 1, h.index),
      moves: h.moves.slice(0, at),
    }

  return {
    index: h.index,
    moves: h.moves.slice(),
  }
}

function deleteFromBranch(b: Branch, m: Move): Branch {
  let i = b.index
  const branches: History[] = []

  for (let j = 0; j < b.branches.length; j++) {
    const h = deleteFromHistory(b.branches[j], m)
    if (h.moves.length > 0) branches.push(h)
    else if (b.index >= j) i = 0
  }

  return { index: i, branches }
}
