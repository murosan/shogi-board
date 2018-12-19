import Point from './Point'

/**
 * 駒を動かせる場所を表す
 */
export default interface ValidationInfo {
  // 手番側が、駒を動かしたり、持ち駒を打つことができる駒のPoint情報を配列で持つ
  // 例えば先手番で、２四に動かせる駒が、２五歩、６八角、持ち駒の桂、の3つある場合
  // Point[1][3] は、[
  //   {row: 1, column: 4, piece: 1},
  //   {row: 5, column: 7, piece: 6},
  //   {row: -1, column: -1, piece: 3},
  // ]
  // となる
  turn: Point[][][]

  // 手番ではない側が、駒を動かしたり、持ち駒を打つことができる駒のPoint情報を配列で持つ
  // 王手放置の禁止や、詰み判定に使用する
  next: Point[][][]
}
