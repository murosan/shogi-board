import { Gyoku0, Piece } from '../../../model/shogi/Piece'
import Point from '../../../model/shogi/Point'
import Position from '../../../model/shogi/Position'
import { Turn } from '../../../model/shogi/Turn'
import { moveBoardOnly } from '../../handler/position'
import getTargets from '../getTargets'
import { find } from './algorithm'

/**
 * points が attacker の駒の効きに入っているか
 * 王手放置・打ち歩詰めチェックに使用する
 * 入っている: true
 * 入っていない: false
 *
 * 例. 初期局面で先手の59玉に、後手の駒の効きがあるかを調べるとき
 * pos は初期局面
 * point は、{ row: 8, column: 4 }
 * attacker は Gote(-1)
 * を渡し、false が返る
 *
 * @param pos Position 配置
 * @param point Point 調べたい位置
 * @param attacker Turn 攻め手番
 * @param ignoreCheckLeaving boolean | undefined 王手放置チェックを無視するか
 *                           無視する(チェックしない): true
 *                           無視しない(チェックする): false | undefined
 *                           基本的に外から呼ぶ時は undefined で
 */
export default function isPointed(
  pos: Position,
  point: Point,
  attacker: Turn,
  ignoreCheckLeaving?: boolean
): boolean {
  for (let row = 0; row < pos.pos.length; row++) {
    for (let column = 0; column < pos.pos.length; column++) {
      const piece: Piece = pos.pos[row][column]
      // 受け側の駒か、空マスならスキップ
      if (piece * attacker <= 0) continue

      // 攻め側の駒の targets に point が含まれていなかったらスキップ
      const targets: Point[] = getTargets(pos, { row, column, piece })
      const foundIndex: number = find(targets, point)
      if (foundIndex === -1) continue

      // 王手放置チェックをしないとき、
      // 攻め側の駒が玉じゃないとき、
      // 受け側の駒が玉の時は
      // 次に動けるので true
      if (
        ignoreCheckLeaving ||
        Math.abs(piece) !== Gyoku0 ||
        (point.piece && Math.abs(point.piece) === Gyoku0)
      )
        return true

      // 攻め側の駒が玉なので動かした結果、攻め側の玉が王手放置にならないか調べる
      const moved = moveBoardOnly({
        pos,
        source: { row, column },
        dest: { row: point.row, column: point.column },
        piece,
      })
      return !isPointed(moved, point, <Turn>-attacker, true)
    }
  }

  return false
}
