import { Piece } from './Piece'

/**
 * 成・不成を選択する画面の時、GameStateにセットするもの
 */
export default interface Confirm {
  // 成の場合の駒ID
  promoted: Piece

  // 不成の場合の駒ID
  preserved: Piece
}
