import {
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
} from '../model/shogi/Piece'
import { pieceString } from './strings'

it('pieceStringが正しく動く', async () => {
  expect(pieceString(Fu0)).toEqual('歩')
  expect(pieceString(Kyou0)).toEqual('香')
  expect(pieceString(Kei0)).toEqual('桂')
  expect(pieceString(Gin0)).toEqual('銀')
  expect(pieceString(Kin0)).toEqual('金')
  expect(pieceString(Kaku0)).toEqual('角')
  expect(pieceString(Hisha0)).toEqual('飛')
  expect(pieceString(Gyoku0)).toEqual('玉')
  expect(pieceString(To0)).toEqual('と')
  expect(pieceString(NariKyou0)).toEqual('成香')
  expect(pieceString(NariKei0)).toEqual('成桂')
  expect(pieceString(NariGin0)).toEqual('成銀')
  expect(pieceString(Uma0)).toEqual('馬')
  expect(pieceString(Ryu0)).toEqual('龍')

  expect(pieceString(Fu1)).toEqual('歩')
  expect(pieceString(Kyou1)).toEqual('香')
  expect(pieceString(Kei1)).toEqual('桂')
  expect(pieceString(Gin1)).toEqual('銀')
  expect(pieceString(Kin1)).toEqual('金')
  expect(pieceString(Kaku1)).toEqual('角')
  expect(pieceString(Hisha1)).toEqual('飛')
  expect(pieceString(Gyoku1)).toEqual('玉')
  expect(pieceString(To1)).toEqual('と')
  expect(pieceString(NariKyou1)).toEqual('成香')
  expect(pieceString(NariKei1)).toEqual('成桂')
  expect(pieceString(NariGin1)).toEqual('成銀')
  expect(pieceString(Uma1)).toEqual('馬')
  expect(pieceString(Ryu1)).toEqual('龍')

  expect(() => pieceString(100)).toThrow()
})
