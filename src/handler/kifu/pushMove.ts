import Branch from '../../model/kifu/Branch'
import History, { isBranch, KifuComponent } from '../../model/kifu/History'
import Kifu from '../../model/kifu/Kifu'
import { Move } from '../../model/kifu/Move'

/**
 * 棋譜に新しいMoveを追加する
 * @param old Kifu
 * @param m Move 追加する一手
 */
export default function pushMove(old: Kifu, m: Move): Kifu {
  return {
    meta: old.meta,
    history: pushToHistory(old.history, m),
  }
}

function pushToHistory(h: History, m: Move): History {
  const isLast: boolean = h.index === h.moves.length - 1
  const last: KifuComponent = h.moves[h.index]

  if (isLast && isBranch(last))
    return {
      moves: h.moves
        .slice(0, h.moves.length - 1)
        .concat(pushToBranch(last, m, true)),
      index: h.index,
    }

  const nextIndex: number = h.index + 1

  if (isLast)
    return {
      moves: h.moves.concat(m),
      index: nextIndex,
    }

  const next: KifuComponent = h.moves[nextIndex]
  const init: KifuComponent[] = h.moves.slice(0, nextIndex)

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

  const tail: KifuComponent[] = h.moves.slice(nextIndex, h.moves.length)
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
    moveEquals(h.moves[0] as Move, m)
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

function createBranch(tail: KifuComponent[], m: Move): Branch {
  return {
    branches: [toHistory(tail), toHistory([m])],
    index: 1,
  }
}

function toHistory(c: KifuComponent[]): History {
  return { moves: c, index: 0 }
}

export function moveEquals(a: Move, b: Move): boolean {
  return (
    a.index === b.index &&
    a.source.row === b.source.row &&
    a.source.column === b.source.column &&
    a.dest.row === b.dest.row &&
    a.dest.column === b.dest.column &&
    a.piece === b.piece &&
    a.promote === b.promote &&
    a.str === b.str
  )
}
