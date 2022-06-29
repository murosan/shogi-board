import { isBranch, KifuComponent } from '../../model/kifu/History'
import Kifu from '../../model/kifu/Kifu'

/**
 * 棋譜にコメントがあるか確認する
 * ある場合 true
 */
export function hasComment(k: Kifu): boolean {
  const checks: KifuComponent[][] = [k.history.moves]

  while (checks.length > 0) {
    const moves = checks.pop()
    if (!moves) return false

    for (let i = 0; i < moves.length; i++) {
      const kc = moves[i]
      if (isBranch(kc)) {
        kc.branches.forEach(b => checks.push(b.moves))
        continue
      }

      if (kc.comment) return true
    }
  }

  return false
}
