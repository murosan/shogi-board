import { positionFromKind } from './InitialPositions'
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
import { Position } from './Position'
import { Gote, Sente } from './Turn'

const cap0 = [0, 0, 0, 0, 0, 0, 0]
const cap1 = [0, 0, 0, 0, 0, 0, 0]
const moveCount = 0

// 駒落ちが多いから後手にしておく
const posDefaults = { cap0, cap1, moveCount, turn: Gote }

const cases: { [key: string]: Position } = {}

cases['平手'] = {
  ...posDefaults,
  turn: Sente,
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
}

cases['香落ち'] = {
  ...posDefaults,
  pos: [
    [Empty, Kei1, Gin1, Kin1, Gyoku1, Kin1, Gin1, Kei1, Kyou1],
    [Empty, Kaku1, Empty, Empty, Empty, Empty, Empty, Hisha1, Empty],
    [Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0],
    [Empty, Hisha0, Empty, Empty, Empty, Empty, Empty, Kaku0, Empty],
    [Kyou0, Kei0, Gin0, Kin0, Gyoku0, Kin0, Gin0, Kei0, Kyou0],
  ],
}

cases['右香落ち'] = {
  ...posDefaults,
  pos: [
    [Kyou1, Kei1, Gin1, Kin1, Gyoku1, Kin1, Gin1, Kei1, Empty],
    [Empty, Kaku1, Empty, Empty, Empty, Empty, Empty, Hisha1, Empty],
    [Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0],
    [Empty, Hisha0, Empty, Empty, Empty, Empty, Empty, Kaku0, Empty],
    [Kyou0, Kei0, Gin0, Kin0, Gyoku0, Kin0, Gin0, Kei0, Kyou0],
  ],
}

cases['両香落ち'] = {
  ...posDefaults,
  pos: [
    [Empty, Kei1, Gin1, Kin1, Gyoku1, Kin1, Gin1, Kei1, Empty],
    [Empty, Kaku1, Empty, Empty, Empty, Empty, Empty, Hisha1, Empty],
    [Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0],
    [Empty, Hisha0, Empty, Empty, Empty, Empty, Empty, Kaku0, Empty],
    [Kyou0, Kei0, Gin0, Kin0, Gyoku0, Kin0, Gin0, Kei0, Kyou0],
  ],
}

cases['角落ち'] = {
  ...posDefaults,
  pos: [
    [Kyou1, Kei1, Gin1, Kin1, Gyoku1, Kin1, Gin1, Kei1, Kyou1],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Hisha1, Empty],
    [Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0],
    [Empty, Hisha0, Empty, Empty, Empty, Empty, Empty, Kaku0, Empty],
    [Kyou0, Kei0, Gin0, Kin0, Gyoku0, Kin0, Gin0, Kei0, Kyou0],
  ],
}

cases['飛車落ち'] = {
  ...posDefaults,
  pos: [
    [Kyou1, Kei1, Gin1, Kin1, Gyoku1, Kin1, Gin1, Kei1, Kyou1],
    [Empty, Kaku1, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0],
    [Empty, Hisha0, Empty, Empty, Empty, Empty, Empty, Kaku0, Empty],
    [Kyou0, Kei0, Gin0, Kin0, Gyoku0, Kin0, Gin0, Kei0, Kyou0],
  ],
}

cases['飛車香落ち'] = {
  ...posDefaults,
  pos: [
    [Empty, Kei1, Gin1, Kin1, Gyoku1, Kin1, Gin1, Kei1, Kyou1],
    [Empty, Kaku1, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0],
    [Empty, Hisha0, Empty, Empty, Empty, Empty, Empty, Kaku0, Empty],
    [Kyou0, Kei0, Gin0, Kin0, Gyoku0, Kin0, Gin0, Kei0, Kyou0],
  ],
}

cases['飛車両香落ち'] = {
  ...posDefaults,
  pos: [
    [Empty, Kei1, Gin1, Kin1, Gyoku1, Kin1, Gin1, Kei1, Empty],
    [Empty, Kaku1, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0],
    [Empty, Hisha0, Empty, Empty, Empty, Empty, Empty, Kaku0, Empty],
    [Kyou0, Kei0, Gin0, Kin0, Gyoku0, Kin0, Gin0, Kei0, Kyou0],
  ],
}

cases['二枚落ち'] = {
  ...posDefaults,
  pos: [
    [Kyou1, Kei1, Gin1, Kin1, Gyoku1, Kin1, Gin1, Kei1, Kyou1],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0],
    [Empty, Hisha0, Empty, Empty, Empty, Empty, Empty, Kaku0, Empty],
    [Kyou0, Kei0, Gin0, Kin0, Gyoku0, Kin0, Gin0, Kei0, Kyou0],
  ],
}

cases['三枚落ち'] = {
  ...posDefaults,
  pos: [
    [Empty, Kei1, Gin1, Kin1, Gyoku1, Kin1, Gin1, Kei1, Kyou1],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0],
    [Empty, Hisha0, Empty, Empty, Empty, Empty, Empty, Kaku0, Empty],
    [Kyou0, Kei0, Gin0, Kin0, Gyoku0, Kin0, Gin0, Kei0, Kyou0],
  ],
}

cases['四枚落ち'] = {
  ...posDefaults,
  pos: [
    [Empty, Kei1, Gin1, Kin1, Gyoku1, Kin1, Gin1, Kei1, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0],
    [Empty, Hisha0, Empty, Empty, Empty, Empty, Empty, Kaku0, Empty],
    [Kyou0, Kei0, Gin0, Kin0, Gyoku0, Kin0, Gin0, Kei0, Kyou0],
  ],
}

cases['五枚落ち'] = {
  ...posDefaults,
  pos: [
    [Empty, Empty, Gin1, Kin1, Gyoku1, Kin1, Gin1, Kei1, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0],
    [Empty, Hisha0, Empty, Empty, Empty, Empty, Empty, Kaku0, Empty],
    [Kyou0, Kei0, Gin0, Kin0, Gyoku0, Kin0, Gin0, Kei0, Kyou0],
  ],
}

cases['六枚落ち'] = {
  ...posDefaults,
  pos: [
    [Empty, Empty, Gin1, Kin1, Gyoku1, Kin1, Gin1, Empty, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0],
    [Empty, Hisha0, Empty, Empty, Empty, Empty, Empty, Kaku0, Empty],
    [Kyou0, Kei0, Gin0, Kin0, Gyoku0, Kin0, Gin0, Kei0, Kyou0],
  ],
}

cases['七枚落ち'] = {
  ...posDefaults,
  pos: [
    [Empty, Empty, Empty, Kin1, Gyoku1, Kin1, Gin1, Empty, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0],
    [Empty, Hisha0, Empty, Empty, Empty, Empty, Empty, Kaku0, Empty],
    [Kyou0, Kei0, Gin0, Kin0, Gyoku0, Kin0, Gin0, Kei0, Kyou0],
  ],
}

cases['八枚落ち'] = {
  ...posDefaults,
  pos: [
    [Empty, Empty, Empty, Kin1, Gyoku1, Kin1, Empty, Empty, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0],
    [Empty, Hisha0, Empty, Empty, Empty, Empty, Empty, Kaku0, Empty],
    [Kyou0, Kei0, Gin0, Kin0, Gyoku0, Kin0, Gin0, Kei0, Kyou0],
  ],
}

cases['九枚落ち'] = {
  ...posDefaults,
  pos: [
    [Empty, Empty, Empty, Empty, Gyoku1, Kin1, Empty, Empty, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0],
    [Empty, Hisha0, Empty, Empty, Empty, Empty, Empty, Kaku0, Empty],
    [Kyou0, Kei0, Gin0, Kin0, Gyoku0, Kin0, Gin0, Kei0, Kyou0],
  ],
}

cases['十枚落ち'] = {
  ...posDefaults,
  pos: [
    [Empty, Empty, Empty, Empty, Gyoku1, Empty, Empty, Empty, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1, Fu1],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0],
    [Empty, Hisha0, Empty, Empty, Empty, Empty, Empty, Kaku0, Empty],
    [Kyou0, Kei0, Gin0, Kin0, Gyoku0, Kin0, Gin0, Kei0, Kyou0],
  ],
}

cases['裸玉'] = {
  ...posDefaults,
  pos: [
    [Empty, Empty, Empty, Empty, Gyoku1, Empty, Empty, Empty, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
    [Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0, Fu0],
    [Empty, Hisha0, Empty, Empty, Empty, Empty, Empty, Kaku0, Empty],
    [Kyou0, Kei0, Gin0, Kin0, Gyoku0, Kin0, Gin0, Kei0, Kyou0],
  ],
}

// 不明
cases['一枚落ち'] = cases['平手']

it('InitialPosition', () => {
  for (let [handicap, expected] of Object.entries(cases)) {
    const result = positionFromKind(handicap)
    expect(result).toEqual(expected)
  }
})
