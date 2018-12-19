import {
  Empty,
  Fu0,
  Fu1,
  Gin0,
  Gin1,
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
  NariGin0,
  NariGin1,
  NariKei0,
  NariKei1,
  NariKyou0,
  NariKyou1,
  Ryu0,
  Ryu1,
  To0,
  To1,
  Uma0,
  Uma1,
} from '../../model/shogi/Piece'
import { demote } from './piece'

it('成駒を元に戻せる', async () => {
  expect(demote(To0)).toEqual(Fu0)
  expect(demote(NariKyou0)).toEqual(Kyou0)
  expect(demote(NariKei0)).toEqual(Kei0)
  expect(demote(NariGin0)).toEqual(Gin0)
  expect(demote(Uma0)).toEqual(Kaku0)
  expect(demote(Ryu0)).toEqual(Hisha0)

  expect(demote(To1)).toEqual(Fu1)
  expect(demote(NariKyou1)).toEqual(Kyou1)
  expect(demote(NariKei1)).toEqual(Kei1)
  expect(demote(NariGin1)).toEqual(Gin1)
  expect(demote(Uma1)).toEqual(Kaku1)
  expect(demote(Ryu1)).toEqual(Hisha1)
})

it('成駒ではない場合ばそのまま', async () => {
  expect(demote(Empty)).toEqual(Empty)

  expect(demote(Fu0)).toEqual(Fu0)
  expect(demote(Kyou0)).toEqual(Kyou0)
  expect(demote(Kei0)).toEqual(Kei0)
  expect(demote(Gin0)).toEqual(Gin0)
  expect(demote(Kin0)).toEqual(Kin0)
  expect(demote(Kaku0)).toEqual(Kaku0)
  expect(demote(Hisha0)).toEqual(Hisha0)

  expect(demote(Fu1)).toEqual(Fu1)
  expect(demote(Kyou1)).toEqual(Kyou1)
  expect(demote(Kei1)).toEqual(Kei1)
  expect(demote(Gin1)).toEqual(Gin1)
  expect(demote(Kin1)).toEqual(Kin1)
  expect(demote(Kaku1)).toEqual(Kaku1)
  expect(demote(Hisha1)).toEqual(Hisha1)
})
