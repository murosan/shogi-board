import { Piece } from './Piece'

/**
 * 駒などの場所を表す
 *
 * (先手)２二角: { row: 1, column: 1, piece: 6 } ← i はなくても良い
 * (先手)５六銀: { row: 4, column: 5, piece: 4, i: undefined } ← undefined と書いても良い
 * (後手)２三歩: { row: 1, column: 2, piece: -1 }
 * (先手)持ち駒の1枚目の歩: { row: -1, column: -1, piece: 1, i: 0 }
 */
export default interface Point {
  // 行。持ち駒なら -1
  row: number

  // 列。持ち駒なら -1
  column: number

  // 駒ID
  piece?: Piece

  // 持ち駒の場合、何枚目の駒か
  // 盤上なら undefined のままで良い
  i?: number
}
