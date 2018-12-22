import Point from './Point'

/**
 * 駒を動かせる場所を表す
 */
export default interface ValidationInfo {
  // 選択された駒、駒を動かしたり、持ち駒を打つことができる駒の Point 情報を配列で持つ
  targets: Point[]
}
