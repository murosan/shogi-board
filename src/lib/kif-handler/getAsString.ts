import History, { isBranch, KifComponent } from '../../model/kif/History'
import Kif from '../../model/kif/Kif'

export function getAsString(k: Kif): string {
  if (k.history.moves.length < 1) return ''
  return getRec({
    moves: k.history.moves.slice(1),
    index: k.history.index,
  })
}

function getRec(h: History): string {
  return h.moves
    .map((kc: KifComponent) =>
      isBranch(kc) ? getRec(kc.branches[kc.index]) : `${kc.index} ${kc.str}`
    )
    .join('\n')
}
