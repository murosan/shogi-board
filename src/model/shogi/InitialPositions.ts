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
  Piece,
} from './Piece'
import { Position } from './Position'
import { Gote, Sente, Turn } from './Turn'

export const HandicapKinds = {
  hirate: '平手',
  kyouOti: '香落ち', // 左香落ち
  migiKyouOti: '右香落ち',
  ryouKyouOti: '両香落ち',
  kakuOti: '角落ち',
  hishaOti: '飛車落ち',
  hishaKyouOti: '飛車香落ち', // 飛車+左香
  hishaRyouKyouOti: '飛車両香落ち',
  nimaiOti: '二枚落ち',
  sannmaiOti: '三枚落ち',
  yonnmaiOti: '四枚落ち',
  gomaiOti: '五枚落ち',
  rokumaiOti: '六枚落ち',
  nanamaiOti: '七枚落ち',
  hatimaiOti: '八枚落ち',
  kyuumaiOti: '九枚落ち',
  juumaiOti: '十枚落ち',
  ragyoku: '裸玉',
}

export function positionFromKind(kind: string): Position {
  const k = HandicapKinds
  if (kind === k.hirate) return hirate()
  if (kind === k.kyouOti) return kyouOti()
  if (kind === k.migiKyouOti) return migiKyouOti()
  if (kind === k.ryouKyouOti) return ryouKyouOti()
  if (kind === k.kakuOti) return kakuOti()
  if (kind === k.hishaOti) return hishaOti()
  if (kind === k.hishaKyouOti) return hishaKyouOti()
  if (kind === k.hishaRyouKyouOti) return hishaRyouKyouOti()
  if (kind === k.nimaiOti) return nmaiOti(2)
  if (kind === k.sannmaiOti) return nmaiOti(3)
  if (kind === k.yonnmaiOti) return nmaiOti(4)
  if (kind === k.gomaiOti) return nmaiOti(5)
  if (kind === k.rokumaiOti) return nmaiOti(6)
  if (kind === k.nanamaiOti) return nmaiOti(7)
  if (kind === k.hatimaiOti) return nmaiOti(8)
  if (kind === k.kyuumaiOti) return nmaiOti(9)
  if (kind === k.juumaiOti) return nmaiOti(10)
  if (kind === k.ragyoku) return ragyoku()
  return hirate()
}

export const hirate = () => toPosition({ pos: hiratePos() })
export const kyouOti = () => reps([0, 0])
export const migiKyouOti = () => reps([8, 0])
export const ryouKyouOti = () => reps([0, 0], [8, 0])
export const kakuOti = () => reps([1, 1])
export const hishaOti = () => reps([7, 1])
export const hishaKyouOti = () => reps([7, 1], [0, 0])
export const hishaRyouKyouOti = () => reps([7, 1], [0, 0], [8, 0])
export const nmaiOti = (n: number) => repsN(n)
export const ragyoku = () =>
  handicapped(
    // prettier-ignore
    [
      [Empty, Empty,  Empty, Empty, Gyoku1, Empty, Empty, Empty, Empty],
      [Empty, Empty,  Empty, Empty, Empty,  Empty, Empty, Empty, Empty],
      [Empty, Empty,  Empty, Empty, Empty,  Empty, Empty, Empty, Empty],
      [Empty, Empty,  Empty, Empty, Empty,  Empty, Empty, Empty, Empty],
      [Empty, Empty,  Empty, Empty, Empty,  Empty, Empty, Empty, Empty],
      [Empty, Empty,  Empty, Empty, Empty,  Empty, Empty, Empty, Empty],
      [Fu0,   Fu0,    Fu0,   Fu0,   Fu0,    Fu0,   Fu0,   Fu0,   Fu0  ],
      [Empty, Hisha0, Empty, Empty, Empty,  Empty, Empty, Kaku0, Empty],
      [Kyou0, Kei0,   Gin0,  Kin0,  Gyoku0, Kin0,  Gin0,  Kei0,  Kyou0],
    ]
  )

/**
 * 初期局を返す
 * column は reverse() されているので、
 * 飛車と角の位置が逆に見える
 * 棋譜との互換性を保つため。
 * ３三角 → pos[2][2]、
 * ３四飛 → pos[3][2]、
 * ７六歩 → pos[5][6] という感じで変換が楽
 */
function hiratePos(): Piece[][] {
  // prettier-ignore
  return [
    [Kyou1, Kei1,   Gin1,  Kin1,  Gyoku1, Kin1,  Gin1,  Kei1,   Kyou1],
    [Empty, Kaku1,  Empty, Empty, Empty,  Empty, Empty, Hisha1, Empty],
    [Fu1,   Fu1,    Fu1,   Fu1,   Fu1,    Fu1,   Fu1,   Fu1,    Fu1  ],
    [Empty, Empty,  Empty, Empty, Empty,  Empty, Empty, Empty,  Empty],
    [Empty, Empty,  Empty, Empty, Empty,  Empty, Empty, Empty,  Empty],
    [Empty, Empty,  Empty, Empty, Empty,  Empty, Empty, Empty,  Empty],
    [Fu0,   Fu0,    Fu0,   Fu0,   Fu0,    Fu0,   Fu0,   Fu0,    Fu0  ],
    [Empty, Hisha0, Empty, Empty, Empty,  Empty, Empty, Kaku0,  Empty],
    [Kyou0, Kei0,   Gin0,  Kin0,  Gyoku0, Kin0,  Gin0,  Kei0,   Kyou0],
  ]
}

type Tuple = [number, number]
const repsN = (n: number) => {
  const r: Tuple[] = [
    [1, 1],
    [7, 1],
  ]
  if (n >= 3) r.push([0, 0])
  if (n >= 4) r.push([8, 0])
  if (n >= 5) r.push([1, 0])
  if (n >= 6) r.push([7, 0])
  if (n >= 7) r.push([2, 0])
  if (n >= 8) r.push([6, 0])
  if (n >= 9) r.push([3, 0])
  if (n >= 10) r.push([5, 0])
  return reps(...r)
}

function reps(...replacements: Tuple[]): Position {
  const pos = hiratePos()
  for (let [col, row] of replacements) {
    pos[row][col] = Empty
  }
  return handicapped(pos)
}

function handicapped(pos: Piece[][]): Position {
  return toPosition({ pos, turn: Gote })
}

function toPosition({ turn, pos }: { turn?: Turn; pos: Piece[][] }): Position {
  return {
    pos,
    cap0: [0, 0, 0, 0, 0, 0, 0],
    cap1: [0, 0, 0, 0, 0, 0, 0],
    turn: turn || Sente,
    moveCount: 0,
  }
}
