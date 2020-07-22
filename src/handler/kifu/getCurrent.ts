import History, { isBranch, KifuComponent } from '../../model/kifu/History'
import Kifu from '../../model/kifu/Kifu'
import { Move } from '../../model/kifu/Move'

/**
 * 棋譜の現在表示局面のMoveを返す
 * 開始局面は0なので、3手目を表示中なら3と3手目のMoveが返る
 * @param k Kif
 */
export default function (k: Kifu): Move {
  let history: History = k.history
  let moveOrBranch: KifuComponent = history.moves[history.index]

  while (isBranch(moveOrBranch)) {
    history = moveOrBranch.branches[moveOrBranch.index]
    moveOrBranch = history.moves[history.index]
  }

  return moveOrBranch
}
