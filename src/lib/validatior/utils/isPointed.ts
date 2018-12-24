import { Piece } from '../../../model/shogi/Piece'
import Point from '../../../model/shogi/Point'
import Position from '../../../model/shogi/Position'
import { Turn } from '../../../model/shogi/Turn'
import getTargets from '../getTargets'

/**
 * points が attacker の駒の効きに入っているか
 * 王手放置・打ち歩詰めチェックに使用する
 * 入っている: true
 * 入っていない: false
 *
 * 例. 初期局面で先手の59玉に、後手の駒の効きがあるかを調べるとき
 * pos は初期局面
 * points は、[{ row: 8, column: 4 }]
 * attacker は Gote(-1)
 * を渡し、false が返る
 *
 * @param pos Position 配置
 * @param points Point[] 調べたい位置のリスト
 * @param attacker Turn 攻め手番
 */
export default function(
  pos: Position,
  points: Point[],
  attacker: Turn
): boolean {
  for (let row = 0; row < pos.pos.length; row++) {
    for (let column = 0; column < pos.pos.length; column++) {
      const piece: Piece = pos.pos[row][column]
      // 受け側の駒か空マスならスキップ
      if (piece * attacker <= 0) continue

      const targets: Point[] = getTargets(pos, { row, column, piece })
      for (let i = 0; i < targets.length; i++) {
        for (let j = 0; j < points.length; j++) {
          if (
            targets[i].row === points[j].row &&
            targets[i].column === points[j].column
          )
            return true
        }
      }
    }
  }

  return false
}
