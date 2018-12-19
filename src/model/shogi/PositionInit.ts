import {
  Empty,
  Fu0,
  Fu1,
  Gin0,
  Gin1,
  Gyoku0,
  Gyoku1,
  Hisha0,
  Hisha1,
  Kaku0,
  Kaku1,
  Kei0,
  Kei1,
  Kin0,
  Kin1,
  Kyou0,
  Kyou1,
} from './Piece'
import Position from './Position'
import { Sente } from './Turn'

/**
 * 初期局を返す
 * column は reverse() されているので、
 * 飛車と角の位置が逆に見える
 * 棋譜との互換性を保つため。３三角 → pos[2][2] という感じで変換が楽
 */
export function hirate(): Position {
  return {
    pos: [
      [Kyou1, Kei1, Gin1, Kin1, Gyoku1, Kin1, Gin1, Kei1, Kyou1],
      [Empty, Kaku1, Empty, Empty, Empty, Empty, Empty, Hisha1, Empty],
      [Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1],
      [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
      [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
      [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
      [Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0],
      [Empty, Hisha0, Empty, Empty, Empty, Empty, Empty, Kaku0, Empty],
      [Kyou0, Kei0, Gin0, Kin0, Gyoku0, Kin0, Gin0, Kei0, Kyou0],
    ],
    cap0: [0, 0, 0, 0, 0, 0, 0],
    cap1: [0, 0, 0, 0, 0, 0, 0],
    turn: Sente,
    moveCount: 0,
  }
}
