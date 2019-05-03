import Branch from '../../model/kif/Branch'
import History, { isBranch, KifComponent } from '../../model/kif/History'
import Kif from '../../model/kif/Kif'
import { Move } from '../../model/kif/Move'

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

  if (isBranch(next))
    return {
      moves: init.concat(pushToBranch(next, m, false)),
      index: nextIndex,
    }

  // 追加しようとしてる Move が次と一緒ならインデックスだけ更新
  if (moveEquals(m, next))
    return {
      moves: h.moves.slice(),
      index: nextIndex,
    }

  const tail: KifComponent[] = h.moves.slice(nextIndex, h.moves.length)
  return {
    moves: init.concat(createBranch(tail, m)),
    index: nextIndex,
  }
}

function pushToBranch(b: Branch, m: Move, recursive: boolean): Branch {
  // 分岐の先頭は現在表示局面ではないので、再帰的に更新する
  if (recursive)
    return {
      branches: b.branches.map((h: History, i: number) => {
        if (i === b.index) return pushToHistory(h, m)
        return h
      }),
      index: b.index,
    }

  const indexOfNewMove: number = b.branches.findIndex(h =>
    moveEquals(<Move>h.moves[0], m)
  )

  // 追加しようとしてる Move がすでに分岐の先頭にある
  if (indexOfNewMove !== -1)
    return {
      branches: b.branches.slice(),
      index: indexOfNewMove,
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

function moveEquals(a: Move, b: Move): boolean {
  return (
    a.index === b.index &&
    a.source.row === b.source.row &&
    a.source.column === b.source.column &&
    a.dest.row === b.dest.row &&
    a.dest.column === b.dest.column &&
    a.piece === b.piece &&
    a.promote === b.promote
  )
}
