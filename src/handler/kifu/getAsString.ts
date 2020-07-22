import History, { isBranch, KifuComponent } from '../../model/kifu/History'
import Kifu from '../../model/kifu/Kifu'

export function getAsString(k: Kifu): string {
  if (k.history.moves.length < 1) return ''
  return getRec({
    moves: k.history.moves.slice(1),
    index: k.history.index,
  })
}

function getRec(h: History): string {
  return h.moves
    .map((kc: KifuComponent) =>
      isBranch(kc) ? getRec(kc.branches[kc.index]) : `${kc.index} ${kc.str}`
    )
    .join('\n')
}
