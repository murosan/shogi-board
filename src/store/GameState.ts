import { ClickProps } from '../model/events/ClickProps'
import Kifu from '../model/kifu/Kifu'
import { Move } from '../model/kifu/Move'
import Confirm from '../model/shogi/Confirm'
import Point from '../model/shogi/Point'

/**
 * 盤面が今どういう状態かを表す
 */
export interface GameState {
  // 盤面描画用インデックスの配列
  // [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  // or
  // [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -1]。
  // 盤面反転を楽にするため用意している。
  // -1 と 9 はEdge部分。0-8が駒が置かれる9*9の盤面。
  indexes: number[]

  // 選択された駒の情報を入れる
  // { row, column, Piece, 0 } で指定
  // 持ち駒が選択されていたら、
  // { -1, -1, Piece, 何番目か } で指定
  // undefined なら選択なしの状態
  selected: Point | null

  // 成・不成 を選択する画面の状態
  // undefined なら選択画面ではない
  confirm: Confirm | null

  // 駒を動かせる場所を入れておくもの
  moveTargets: Point[]

  // 棋譜
  kifu: Kifu

  // 棋譜の現在表示局面を返す
  currentMove: Move

  // 盤面反転
  reverse(): void

  // 盤面反転されている場合true
  isReversed: boolean

  // 駒をクリックして動かしたりする
  clickPiece(p: ClickProps): void

  // 棋譜をクリックして表示局面を変える
  clickKifu(moveCount: number, branchIndex?: number): void

  setKifu(kifu: Kifu): void
}
