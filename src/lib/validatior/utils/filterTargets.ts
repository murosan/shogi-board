import { Gyoku0, Piece, Fu0, Gyoku1, Fu1 } from '../../../model/shogi/Piece'
import Point from '../../../model/shogi/Point'
import Position from '../../../model/shogi/Position'
import { Gote, Sente, Turn } from '../../../model/shogi/Turn'
import { moveBoardOnly, move } from '../../handler/position'
import getGyokuPoint from './getGyokuPoint'
import isPointed from './isPointed'
import getTargets from '../getTargets'

/**
 * 王手放置か打ち歩詰めだったら弾く
 * @param pos Position 動かす前の配置
 * @param point Point 動かしたい駒の場所情報
 * @param targets point を getTargets で取得したリスト
 * @returns targets にフィルターをかけた結果
 */
export default function filter(
  pos: Position,
  point: Point,
  targets: Point[]
): Point[] {
  if (!point.piece) throw new Error('piece id is needed')

  const turn: Turn = point.piece > 0 ? Sente : Gote

  // 手番側の玉がある場所。駒を動かしたとき王手放置にならないようにメモしておく
  let gp = getGyokuPoint(pos.pos, turn)

  // 王手放置・打ち歩詰めチェックを通った場所を入れていく
  const filtered: Point[] = []

  for (let i = 0; i < targets.length; i++) {
    // 盤上だけ動かす
    const moved: Position = moveBoardOnly({
      pos: pos,
      source: { row: point.row, column: point.column },
      dest: { row: targets[i].row, column: targets[i].column },
      piece: <Piece>point.piece,
    })

    // 玉自身の動きチェックをしていたら、玉が動くので、再セット
    if (point.piece && Math.abs(point.piece) === Gyoku0)
      gp = getGyokuPoint(moved.pos, turn)

    // 王手放置ならpushしない
    const isOute = gp !== undefined && isPointed(moved, gp, <Turn>-turn)
    if (isOute) continue

    // 打ち歩詰めチェック
    const enemyGyoku = getGyokuPoint(moved.pos, <Turn>-turn)
    // 相手玉が打った歩による王手である
    if (enemyGyoku && isPointed(moved, enemyGyoku, turn)) {
      // 打った歩が次に取られるか
      const fuIsPointed = isPointed(moved, targets[i], <Turn>-turn)

      // 相手玉が逃げられば場所があるか
      const enemyGyokuTargets = getTargets(moved, enemyGyoku)
      const filteredEnemyGyokuTargets = filter(
        moved,
        enemyGyoku,
        enemyGyokuTargets
      )

      // 打った歩が取られない && 逃げ場所がないとき、打ち歩詰めである
      if (!fuIsPointed && filteredEnemyGyokuTargets.length === 0) continue
    }

    // OK
    filtered.push(targets[i])
  }

  return filtered
}
