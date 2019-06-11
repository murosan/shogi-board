import { Fu0, Fu1, Hisha0, Hisha1 } from '../../../model/shogi/Piece'
import Point from '../../../model/shogi/Point'
import { Position } from '../../../model/shogi/Position'
import emptyPosition from '../../../testutils/emptyPosition'
import newGameState from '../../../testutils/newGameState'
import hisha from './hisha'

describe('飛車の動き判定', () => {
  it('障害物がないとき、縦横に無限に移動できる', async () => {
    const pos: Position = emptyPosition()
    const expected: Point[] = [
      { row: 0, column: 4 },
      { row: 1, column: 4 },
      { row: 2, column: 4 },
      { row: 3, column: 4 },
      { row: 4, column: 0 },
      { row: 4, column: 1 },
      { row: 4, column: 2 },
      { row: 4, column: 3 },
      { row: 4, column: 5 },
      { row: 4, column: 6 },
      { row: 4, column: 7 },
      { row: 4, column: 8 },
      { row: 5, column: 4 },
      { row: 6, column: 4 },
      { row: 7, column: 4 },
      { row: 8, column: 4 },
    ]
    expect(hisha(pos, { row: 4, column: 4, piece: Hisha0 })).toEqual(expected)
    expect(hisha(pos, { row: 4, column: 4, piece: Hisha1 })).toEqual(expected)
  })

  it('味方の駒があるところには移動できない(先手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[4][4] = Hisha0 // 55
    pos.pos[2][4] = Fu0 // 53
    pos.pos[6][4] = Fu0 // 57
    pos.pos[4][2] = Fu0 // 35
    pos.pos[4][6] = Fu0 // 75
    const expected: Point[] = [
      { row: 3, column: 4 },
      { row: 4, column: 3 },
      { row: 4, column: 5 },
      { row: 5, column: 4 },
    ]
    expect(hisha(pos, { row: 4, column: 4, piece: Hisha0 })).toEqual(expected)
  })

  it('味方の駒があるところには移動できない(後手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[4][4] = Hisha1 // 55
    pos.pos[2][4] = Fu1 // 53
    pos.pos[6][4] = Fu1 // 57
    pos.pos[4][2] = Fu1 // 35
    pos.pos[4][6] = Fu1 // 75
    const expected: Point[] = [
      { row: 3, column: 4 },
      { row: 4, column: 3 },
      { row: 4, column: 5 },
      { row: 5, column: 4 },
    ]
    expect(hisha(pos, { row: 4, column: 4, piece: Hisha1 })).toEqual(expected)
  })

  it('相手の駒のある場所には移動できる(先手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[4][4] = Hisha0 // 55
    pos.pos[2][4] = Fu1 // 53
    pos.pos[6][4] = Fu1 // 57
    pos.pos[4][2] = Fu1 // 35
    pos.pos[4][6] = Fu1 // 75
    const expected: Point[] = [
      { row: 2, column: 4 },
      { row: 3, column: 4 },
      { row: 4, column: 2 },
      { row: 4, column: 3 },
      { row: 4, column: 5 },
      { row: 4, column: 6 },
      { row: 5, column: 4 },
      { row: 6, column: 4 },
    ]
    expect(hisha(pos, { row: 4, column: 4, piece: Hisha0 })).toEqual(expected)
  })

  it('相手の駒のある場所には移動できる(後手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[4][4] = Hisha1 // 55
    pos.pos[2][4] = Fu0 // 53
    pos.pos[6][4] = Fu0 // 57
    pos.pos[4][2] = Fu0 // 35
    pos.pos[4][6] = Fu0 // 75
    const expected: Point[] = [
      { row: 2, column: 4 },
      { row: 3, column: 4 },
      { row: 4, column: 2 },
      { row: 4, column: 3 },
      { row: 4, column: 5 },
      { row: 4, column: 6 },
      { row: 5, column: 4 },
      { row: 6, column: 4 },
    ]
    expect(hisha(pos, { row: 4, column: 4, piece: Hisha1 })).toEqual(expected)
  })

  it('持ち駒を全ての空白マスに置ける(先手)', async () => {
    const pos: Position = newGameState().pos // 初期局面
    const points: Point[] = hisha(pos, { row: -1, column: -1, piece: Hisha0 })
    expect(points).toHaveLength(41)
  })

  it('持ち駒を全ての空白マスに置ける2(先手)', async () => {
    const pos: Position = emptyPosition()
    const points: Point[] = hisha(pos, { row: -1, column: -1, piece: Hisha0 })
    expect(points).toHaveLength(81)
  })

  it('持ち駒を全ての空白マスに置ける(後手)', async () => {
    const pos: Position = newGameState().pos // 初期局面
    const points: Point[] = hisha(pos, { row: -1, column: -1, piece: Hisha1 })
    expect(points).toHaveLength(41)
  })

  it('持ち駒を全ての空白マスに置ける2(後手)', async () => {
    const pos: Position = emptyPosition()
    const points: Point[] = hisha(pos, { row: -1, column: -1, piece: Hisha1 })
    expect(points).toHaveLength(81)
  })

  it('飛車以外の駒を渡すとエラー', async () =>
    expect(() =>
      hisha(emptyPosition(), { row: 4, column: 4, piece: Fu0 })
    ).toThrow())
})
