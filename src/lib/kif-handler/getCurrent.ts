import History, { isBranch, KifComponent } from '../../model/kif/History'
import Kif from '../../model/kif/Kif'
import Move from '../../model/kif/Move'

/**
 * 棋譜の現在表示局面のMoveを返す
 * 開始局面は0なので、3手目を表示中なら3と3手目のMoveが返る
 * @param k Kif
 */
export default function(k: Kif): Move {
  let history: History = k.history
  let moveOrBranch: KifComponent = history.moves[history.index]

  while (isBranch(moveOrBranch)) {
    history = moveOrBranch.branches[moveOrBranch.index]
    moveOrBranch = history.moves[history.index]
  }

  return moveOrBranch
}
