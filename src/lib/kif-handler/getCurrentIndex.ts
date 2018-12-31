import History, { isBranch, KifComponent } from '../../model/kif/History'
import Kif from '../../model/kif/Kif'

export default function(k: Kif): number {
  // return する値。足していく
  let result: number = k.history.index

  let his: History = k.history
  let moves: KifComponent[] = his.moves
  let currentMoves: KifComponent = moves[his.index]

  while (isBranch(currentMoves)) {
    his = currentMoves.branches[currentMoves.index]
    moves = his.moves
    currentMoves = moves[his.index]
    result += his.index + 1
  }

  return result
}
