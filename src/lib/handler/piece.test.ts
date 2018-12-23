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
import { demote, canPromote } from './piece'

describe('demote', async () => {
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
})

describe('canPromote', async () => {
  it('成れる駒を敵陣に動かすと true', async () => {
    expect(canPromote({ sourceRow: 3, destRow: 2, piece: Fu0 })).toBeTruthy()
    expect(canPromote({ sourceRow: 8, destRow: 0, piece: Kyou0 })).toBeTruthy()
    expect(canPromote({ sourceRow: 4, destRow: 2, piece: Kei0 })).toBeTruthy()
    expect(canPromote({ sourceRow: 3, destRow: 2, piece: Gin0 })).toBeTruthy()
    expect(canPromote({ sourceRow: 8, destRow: 0, piece: Kaku0 })).toBeTruthy()
    expect(canPromote({ sourceRow: 5, destRow: 1, piece: Hisha0 })).toBeTruthy()

    expect(canPromote({ sourceRow: 5, destRow: 6, piece: Fu1 })).toBeTruthy()
    expect(canPromote({ sourceRow: 0, destRow: 8, piece: Kyou1 })).toBeTruthy()
    expect(canPromote({ sourceRow: 4, destRow: 6, piece: Kei1 })).toBeTruthy()
    expect(canPromote({ sourceRow: 6, destRow: 7, piece: Gin1 })).toBeTruthy()
    expect(canPromote({ sourceRow: 0, destRow: 8, piece: Kaku1 })).toBeTruthy()
    expect(canPromote({ sourceRow: 5, destRow: 7, piece: Hisha1 })).toBeTruthy()
  })

  it('成れる駒を敵陣から自陣に動かすと true', async () => {
    expect(canPromote({ sourceRow: 0, destRow: 2, piece: Fu0 })).toBeTruthy()
    expect(canPromote({ sourceRow: 1, destRow: 0, piece: Kyou0 })).toBeTruthy()
    expect(canPromote({ sourceRow: 1, destRow: 2, piece: Kei0 })).toBeTruthy()
    expect(canPromote({ sourceRow: 1, destRow: 2, piece: Gin0 })).toBeTruthy()
    expect(canPromote({ sourceRow: 2, destRow: 0, piece: Kaku0 })).toBeTruthy()
    expect(canPromote({ sourceRow: 2, destRow: 1, piece: Hisha0 })).toBeTruthy()

    expect(canPromote({ sourceRow: 8, destRow: 6, piece: Fu1 })).toBeTruthy()
    expect(canPromote({ sourceRow: 7, destRow: 8, piece: Kyou1 })).toBeTruthy()
    expect(canPromote({ sourceRow: 8, destRow: 6, piece: Kei1 })).toBeTruthy()
    expect(canPromote({ sourceRow: 6, destRow: 5, piece: Gin1 })).toBeTruthy()
    expect(canPromote({ sourceRow: 7, destRow: 2, piece: Kaku1 })).toBeTruthy()
    expect(canPromote({ sourceRow: 6, destRow: 1, piece: Hisha1 })).toBeTruthy()
  })

  it('成れない駒を動かすと false', async () => {
    expect(canPromote({ sourceRow: 0, destRow: 2, piece: Empty })).toBeFalsy()
    expect(canPromote({ sourceRow: 0, destRow: 2, piece: Kin0 })).toBeFalsy()
    expect(canPromote({ sourceRow: 0, destRow: 2, piece: To0 })).toBeFalsy()
    expect(
      canPromote({ sourceRow: 0, destRow: 2, piece: NariKyou0 })
    ).toBeFalsy()
    expect(
      canPromote({ sourceRow: 0, destRow: 2, piece: NariKei0 })
    ).toBeFalsy()
    expect(
      canPromote({ sourceRow: 0, destRow: 2, piece: NariGin0 })
    ).toBeFalsy()
    expect(canPromote({ sourceRow: 0, destRow: 2, piece: Uma0 })).toBeFalsy()
    expect(canPromote({ sourceRow: 0, destRow: 2, piece: Ryu0 })).toBeFalsy()

    expect(canPromote({ sourceRow: 8, destRow: 7, piece: Kin1 })).toBeFalsy()
    expect(canPromote({ sourceRow: 8, destRow: 7, piece: To1 })).toBeFalsy()
    expect(
      canPromote({ sourceRow: 5, destRow: 8, piece: NariKyou1 })
    ).toBeFalsy()
    expect(
      canPromote({ sourceRow: 6, destRow: 8, piece: NariKei1 })
    ).toBeFalsy()
    expect(
      canPromote({ sourceRow: 8, destRow: 7, piece: NariGin1 })
    ).toBeFalsy()
    expect(canPromote({ sourceRow: 8, destRow: 5, piece: Uma1 })).toBeFalsy()
    expect(canPromote({ sourceRow: 8, destRow: 5, piece: Ryu1 })).toBeFalsy()
  })

  it('敵陣にいないとき false', async () => {
    expect(canPromote({ sourceRow: 6, destRow: 5, piece: Fu0 })).toBeFalsy()
    expect(canPromote({ sourceRow: 2, destRow: 3, piece: Fu1 })).toBeFalsy()
  })
})
