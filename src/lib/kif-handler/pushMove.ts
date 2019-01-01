import History, { isBranch, KifComponent } from '../../model/kif/History'
import Kif from '../../model/kif/Kif'
import Move from '../../model/kif/Move'
import Branch from '../../model/kif/Branch'

/**
 * 棋譜に新しいMoveを追加する
 * @param old Kif
 * @param m Move 追加する一手
 */
export default function(old: Kif, m: Move): Kif {
  return {
    meta: old.meta,
    history: pushToHistory(old.history, m),
  }
}

function pushToHistory(h: History, m: Move): History {
  const lastIsCurrent: boolean = h.index === h.moves.length - 1
  const last: KifComponent = h.moves[h.index]

  if (lastIsCurrent && isBranch(last))
    return {
      moves: h.moves
        .slice(0, h.moves.length - 1)
        .concat(pushToBranch(last, m, true)),
      index: h.index,
    }

  const nextIndex: number = h.index + 1

  if (lastIsCurrent)
    return {
      moves: h.moves.concat(m),
      index: nextIndex,
    }

  const next: KifComponent = h.moves[nextIndex]
  const init: KifComponent[] = h.moves.slice(0, nextIndex)
  const tail: KifComponent[] = h.moves.slice(nextIndex, h.moves.length)

  const newMoves: KifComponent[] = isBranch(next)
    ? init.concat(pushToBranch(next, m, false))
    : init.concat(createBranch(tail, m))

  return {
    moves: newMoves,
    index: h.index + 1,
  }
}

function pushToBranch(b: Branch, m: Move, recursive: boolean): Branch {
  if (recursive)
    return {
      branches: b.branches.map((h: History, i: number) => {
        if (i === b.index) return pushToHistory(h, m)
        return h
      }),
      index: b.index,
    }

  return {
    branches: b.branches.concat(toHistory([m])),
    index: b.branches.length,
  }
}

function createBranch(tail: KifComponent[], m: Move): Branch {
  return {
    branches: [toHistory(tail), toHistory([m])],
    index: 1,
  }
}

function toHistory(c: KifComponent[]): History {
  return { moves: c, index: 0 }
}
