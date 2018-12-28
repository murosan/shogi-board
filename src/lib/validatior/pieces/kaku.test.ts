import { Fu0, Fu1, Kaku0, Kaku1 } from '../../../model/shogi/Piece'
import Point from '../../../model/shogi/Point'
import Position from '../../../model/shogi/Position'
import emptyPosition from '../../../testutils/emptyPosition'
import newGameState from '../../../testutils/newGameState'
import kaku from './kaku'

describe('角の動き判定', async () => {
  it('障害物がないとき、斜めに無限に移動できる', async () => {
    const pos: Position = emptyPosition()
    const expected: Point[] = [
      { row: 3, column: 3 },
      { row: 2, column: 2 },
      { row: 1, column: 1 },
      { row: 0, column: 0 },
      { row: 3, column: 5 },
      { row: 2, column: 6 },
      { row: 1, column: 7 },
      { row: 0, column: 8 },
      { row: 5, column: 3 },
      { row: 6, column: 2 },
      { row: 7, column: 1 },
      { row: 8, column: 0 },
      { row: 5, column: 5 },
      { row: 6, column: 6 },
      { row: 7, column: 7 },
      { row: 8, column: 8 },
    ]
    expect(kaku(pos, { row: 4, column: 4, piece: Kaku0 })).toEqual(expected)
    expect(kaku(pos, { row: 4, column: 4, piece: Kaku1 })).toEqual(expected)
  })

  it('味方の駒があるところには移動できない(先手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[2][2] = Fu0 // 33
    pos.pos[2][6] = Fu0 // 73
    pos.pos[6][2] = Fu0 // 37
    pos.pos[6][6] = Fu0 // 77
    const expected: Point[] = [
      { row: 3, column: 3 },
      { row: 3, column: 5 },
      { row: 5, column: 3 },
      { row: 5, column: 5 },
    ]
    expect(kaku(pos, { row: 4, column: 4, piece: Kaku0 })).toEqual(expected)
  })

  it('味方の駒があるところには移動できない(後手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[2][2] = Fu1 // 33
    pos.pos[2][6] = Fu1 // 73
    pos.pos[6][2] = Fu1 // 37
    pos.pos[6][6] = Fu1 // 77
    const expected: Point[] = [
      { row: 3, column: 3 },
      { row: 3, column: 5 },
      { row: 5, column: 3 },
      { row: 5, column: 5 },
    ]
    expect(kaku(pos, { row: 4, column: 4, piece: Kaku1 })).toEqual(expected)
  })

  it('相手の駒のある場所には移動できる(先手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[2][2] = Fu1 // 33
    pos.pos[2][6] = Fu1 // 73
    pos.pos[6][2] = Fu1 // 37
    pos.pos[6][6] = Fu1 // 77
    const expected: Point[] = [
      { row: 3, column: 3 },
      { row: 2, column: 2 },
      { row: 3, column: 5 },
      { row: 2, column: 6 },
      { row: 5, column: 3 },
      { row: 6, column: 2 },
      { row: 5, column: 5 },
      { row: 6, column: 6 },
    ]
    expect(kaku(pos, { row: 4, column: 4, piece: Kaku0 })).toEqual(expected)
  })

  it('相手の駒のある場所には移動できる(後手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[2][2] = Fu0 // 33
    pos.pos[2][6] = Fu0 // 73
    pos.pos[6][2] = Fu0 // 37
    pos.pos[6][6] = Fu0 // 77
    const expected: Point[] = [
      { row: 3, column: 3 },
      { row: 2, column: 2 },
      { row: 3, column: 5 },
      { row: 2, column: 6 },
      { row: 5, column: 3 },
      { row: 6, column: 2 },
      { row: 5, column: 5 },
      { row: 6, column: 6 },
    ]
    expect(kaku(pos, { row: 4, column: 4, piece: Kaku1 })).toEqual(expected)
  })

  it('持ち駒を全ての空白マスに置ける(先手)', async () => {
    const pos: Position = newGameState().pos // 初期局面
    const points: Point[] = kaku(pos, { row: -1, column: -1, piece: Kaku0 })
    expect(points).toHaveLength(41)
  })

  it('持ち駒を全ての空白マスに置ける2(先手)', async () => {
    const pos: Position = emptyPosition()
    const points: Point[] = kaku(pos, { row: -1, column: -1, piece: Kaku0 })
    expect(points).toHaveLength(81)
  })

  it('持ち駒を全ての空白マスに置ける(後手)', async () => {
    const pos: Position = newGameState().pos // 初期局面
    const points: Point[] = kaku(pos, { row: -1, column: -1, piece: Kaku1 })
    expect(points).toHaveLength(41)
  })

  it('持ち駒を全ての空白マスに置ける2(後手)', async () => {
    const pos: Position = emptyPosition()
    const points: Point[] = kaku(pos, { row: -1, column: -1, piece: Kaku1 })
    expect(points).toHaveLength(81)
  })

  it('角以外の駒を渡すとエラー', async () =>
    expect(() =>
      kaku(emptyPosition(), { row: 4, column: 4, piece: Fu0 })
    ).toThrow())
})
