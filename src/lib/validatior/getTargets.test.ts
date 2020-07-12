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
  NariGin0,
  NariGin1,
  NariKei0,
  NariKei1,
  NariKyou0,
  NariKyou1,
  Piece,
  Ryu0,
  Ryu1,
  To0,
  To1,
  Uma0,
  Uma1,
} from '../../model/shogi/Piece'
import Point from '../../model/shogi/Point'
import { Position } from '../../model/shogi/Position'
import { Sente } from '../../model/shogi/Turn'
import { getTargets } from './getTargets'
import fu from './pieces/fu'
import gin from './pieces/gin'
import gyoku from './pieces/gyoku'
import hisha from './pieces/hisha'
import kaku from './pieces/kaku'
import kei from './pieces/kei'
import kin from './pieces/kin'
import kyou from './pieces/kyou'
import ryu from './pieces/ryu'
import uma from './pieces/uma'
jest.mock('./pieces/fu.ts')
jest.mock('./pieces/kyou.ts')
jest.mock('./pieces/kei.ts')
jest.mock('./pieces/gin.ts')
jest.mock('./pieces/kin.ts')
jest.mock('./pieces/kaku.ts')
jest.mock('./pieces/hisha.ts')
jest.mock('./pieces/gyoku.ts')
jest.mock('./pieces/uma.ts')
jest.mock('./pieces/ryu.ts')

const mockPos: Position = {
  pos: [],
  cap0: [],
  cap1: [],
  turn: Sente,
  moveCount: 0,
}

describe('駒の動き判定の振り分け', () => {
  beforeEach(() => {
    // Editor の型チェックでエラーにならないように
    ;(fu as jest.Mock).mockClear()
    ;(kyou as jest.Mock).mockClear()
    ;(kei as jest.Mock).mockClear()
    ;(gin as jest.Mock).mockClear()
    ;(kin as jest.Mock).mockClear()
    ;(kaku as jest.Mock).mockClear()
    ;(hisha as jest.Mock).mockClear()
    ;(gyoku as jest.Mock).mockClear()
    ;(uma as jest.Mock).mockClear()
    ;(ryu as jest.Mock).mockClear()
  })

  it('歩を渡すと、歩の動き判定メソッドが実行される', async () => {
    getTargets(mockPos, genPoint(Fu0))
    getTargets(mockPos, genPoint(Fu1))
    expect(fu).toHaveBeenCalledTimes(2)
  })

  it('香を渡すと、香の動き判定メソッドが実行される', async () => {
    getTargets(mockPos, genPoint(Kyou0))
    getTargets(mockPos, genPoint(Kyou1))
    expect(kyou).toHaveBeenCalledTimes(2)
  })

  it('桂を渡すと、桂の動き判定メソッドが実行される', async () => {
    getTargets(mockPos, genPoint(Kei0))
    getTargets(mockPos, genPoint(Kei1))
    expect(kei).toHaveBeenCalledTimes(2)
  })

  it('銀を渡すと、銀の動き判定メソッドが実行される', async () => {
    getTargets(mockPos, genPoint(Gin0))
    getTargets(mockPos, genPoint(Gin1))
    expect(gin).toHaveBeenCalledTimes(2)
  })

  it('金を渡すと、金の動き判定メソッドが実行される', async () => {
    getTargets(mockPos, genPoint(Kin0))
    getTargets(mockPos, genPoint(Kin1))
    expect(kin).toHaveBeenCalledTimes(2)
  })

  it('角を渡すと、角の動き判定メソッドが実行される', async () => {
    getTargets(mockPos, genPoint(Kaku0))
    getTargets(mockPos, genPoint(Kaku1))
    expect(kaku).toHaveBeenCalledTimes(2)
  })

  it('飛車を渡すと、飛車の動き判定メソッドが実行される', async () => {
    getTargets(mockPos, genPoint(Hisha0))
    getTargets(mockPos, genPoint(Hisha1))
    expect(hisha).toHaveBeenCalledTimes(2)
  })

  it('玉を渡すと、玉の動き判定メソッドが実行される', async () => {
    getTargets(mockPos, genPoint(Gyoku0))
    getTargets(mockPos, genPoint(Gyoku1))
    expect(gyoku).toHaveBeenCalledTimes(2)
  })

  it('馬を渡すと、馬の動き判定メソッドが実行される', async () => {
    getTargets(mockPos, genPoint(Uma0))
    getTargets(mockPos, genPoint(Uma1))
    expect(uma).toHaveBeenCalledTimes(2)
  })

  it('龍を渡すと、龍の動き判定メソッドが実行される', async () => {
    getTargets(mockPos, genPoint(Ryu0))
    getTargets(mockPos, genPoint(Ryu1))
    expect(ryu).toHaveBeenCalledTimes(2)
  })

  it('と金を渡すと、金の動き判定メソッドが実行される', async () => {
    getTargets(mockPos, genPoint(To0))
    getTargets(mockPos, genPoint(To1))
    expect(kin).toHaveBeenCalledTimes(2)
  })

  it('成香を渡すと、金の動き判定メソッドが実行される', async () => {
    getTargets(mockPos, genPoint(NariKyou0))
    getTargets(mockPos, genPoint(NariKyou1))
    expect(kin).toHaveBeenCalledTimes(2)
  })

  it('成桂を渡すと、金の動き判定メソッドが実行される', async () => {
    getTargets(mockPos, genPoint(NariKei0))
    getTargets(mockPos, genPoint(NariKei1))
    expect(kin).toHaveBeenCalledTimes(2)
  })

  it('成銀を渡すと、金の動き判定メソッドが実行される', async () => {
    getTargets(mockPos, genPoint(NariGin0))
    getTargets(mockPos, genPoint(NariGin1))
    expect(kin).toHaveBeenCalledTimes(2)
  })

  it('空マスを指定するとエラー', async () =>
    expect(() => getTargets(mockPos, genPoint(Empty))).toThrow())

  it('不正な駒IDを指定するとエラー', async () =>
    expect(() => getTargets(mockPos, genPoint(100))).toThrow())
})

function genPoint(p: Piece): Point {
  return { row: 0, column: 0, piece: p }
}
