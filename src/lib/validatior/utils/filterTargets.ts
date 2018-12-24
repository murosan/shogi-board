import { Gyoku0, Piece } from '../../../model/shogi/Piece'
import Point from '../../../model/shogi/Point'
import Position from '../../../model/shogi/Position'
import { Gote, Sente, Turn } from '../../../model/shogi/Turn'
import { moveBoardOnly } from '../../handler/position'
import getGyokuPoint from './getGyokuPoint'
import isPointed from './isPointed'

/**
 * 王手放置か打ち歩詰めだったら弾く
 * @param pos Position 動かす前の配置
 * @param point Point 動かしたい駒の場所情報
 * @param targets point を getTargets で取得したリスト
 * @returns targets にフィルターをかけた結果
 */
export default function(
  pos: Position,
  point: Point,
  targets: Point[]
): Point[] {
  const turn: Turn = point.piece && point.piece > 0 ? Sente : Gote

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
    const isOute = gp !== undefined && isPointed(moved, [gp], <Turn>(turn * -1))
    if (isOute) continue

    // TODO: 打ち歩詰めチェック。
    //       pointが-1&&Fuなら玉のgetTargets&filerTargetsを再帰的に呼び、
    //       長さが0じゃない or 打った歩が取られる位置にある

    // OK
    filtered.push(targets[i])
  }

  return filtered
}
