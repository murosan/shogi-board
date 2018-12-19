import { newGameState } from '../../../model/shogi/GameStateInit'
import { Fu0, Gin0, Gin1, Kin0, Kin1 } from '../../../model/shogi/Piece'
import Point from '../../../model/shogi/Point'
import Position from '../../../model/shogi/Position'
import emptyPosition from '../../../testutils/emptyPosition'
import gin from './gin'

describe('銀の動き判定', async () => {
  it('周りに駒がなければ5箇所に移動できる(先手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[4][4] = Gin0 // 55銀
    const expected: Point[] = [
      { row: 3, column: 3 },
      { row: 3, column: 4 },
      { row: 3, column: 5 },
      { row: 5, column: 3 },
      { row: 5, column: 5 },
    ]
    expect(gin(pos, { row: 4, column: 4, piece: Gin0 })).toEqual(expected)
  })

  it('周りに駒がなければ5箇所に移動できる(後手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[4][4] = Gin1 // 55銀
    const expected: Point[] = [
      { row: 3, column: 3 },
      { row: 3, column: 5 },
      { row: 5, column: 3 },
      { row: 5, column: 4 },
      { row: 5, column: 5 },
    ]
    expect(gin(pos, { row: 4, column: 4, piece: Gin1 })).toEqual(expected)
  })

  it('味方の駒があるところには動けない(先手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[4][4] = Gin0 // 55銀
    pos.pos[3][3] = Kin0 // 44金
    const expected: Point[] = [
      { row: 3, column: 4 },
      { row: 3, column: 5 },
      { row: 5, column: 3 },
      { row: 5, column: 5 },
    ]
    expect(gin(pos, { row: 4, column: 4, piece: Gin0 })).toEqual(expected)
  })

  it('味方の駒があるところには動けない(後手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[4][4] = Gin1 // 55銀
    pos.pos[3][3] = Kin1 // 44金
    const expected: Point[] = [
      { row: 3, column: 5 },
      { row: 5, column: 3 },
      { row: 5, column: 4 },
      { row: 5, column: 5 },
    ]
    expect(gin(pos, { row: 4, column: 4, piece: Gin1 })).toEqual(expected)
  })

  it('相手の駒があるところには動ける(先手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[4][4] = Gin0 // 55銀
    pos.pos[3][3] = Kin1 // 44金
    const expected: Point[] = [
      { row: 3, column: 3 },
      { row: 3, column: 4 },
      { row: 3, column: 5 },
      { row: 5, column: 3 },
      { row: 5, column: 5 },
    ]
    expect(gin(pos, { row: 4, column: 4, piece: Gin0 })).toEqual(expected)
  })

  it('相手の駒があるところには動ける(後手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[4][4] = Gin1 // 55銀
    pos.pos[3][3] = Kin0 // 44金
    const expected: Point[] = [
      { row: 3, column: 3 },
      { row: 3, column: 5 },
      { row: 5, column: 3 },
      { row: 5, column: 4 },
      { row: 5, column: 5 },
    ]
    expect(gin(pos, { row: 4, column: 4, piece: Gin1 })).toEqual(expected)
  })

  it('盤外には動けない(先手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[0][0] = Gin0 // 11銀
    pos.pos[8][0] = Gin0 // 19銀
    pos.pos[0][8] = Gin0 // 91銀
    pos.pos[8][8] = Gin0 // 99銀
    const expected1: Point[] = [{ row: 1, column: 1 }]
    const expected2: Point[] = [{ row: 7, column: 0 }, { row: 7, column: 1 }]
    const expected3: Point[] = [{ row: 1, column: 7 }]
    const expected4: Point[] = [{ row: 7, column: 7 }, { row: 7, column: 8 }]
    expect(gin(pos, { row: 0, column: 0, piece: Gin0 })).toEqual(expected1)
    expect(gin(pos, { row: 8, column: 0, piece: Gin0 })).toEqual(expected2)
    expect(gin(pos, { row: 0, column: 8, piece: Gin0 })).toEqual(expected3)
    expect(gin(pos, { row: 8, column: 8, piece: Gin0 })).toEqual(expected4)
  })

  it('盤外には動けない(後手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[0][0] = Gin1 // 11銀
    pos.pos[8][0] = Gin1 // 19銀
    pos.pos[0][8] = Gin1 // 91銀
    pos.pos[8][8] = Gin1 // 99銀
    const expected1: Point[] = [{ row: 1, column: 0 }, { row: 1, column: 1 }]
    const expected2: Point[] = [{ row: 7, column: 1 }]
    const expected3: Point[] = [{ row: 1, column: 7 }, { row: 1, column: 8 }]
    const expected4: Point[] = [{ row: 7, column: 7 }]
    expect(gin(pos, { row: 0, column: 0, piece: Gin1 })).toEqual(expected1)
    expect(gin(pos, { row: 8, column: 0, piece: Gin1 })).toEqual(expected2)
    expect(gin(pos, { row: 0, column: 8, piece: Gin1 })).toEqual(expected3)
    expect(gin(pos, { row: 8, column: 8, piece: Gin1 })).toEqual(expected4)
  })

  it('持ち駒を全ての空白マスに置ける(先手)', async () => {
    const pos: Position = newGameState().pos // 初期局面
    const s: Set<string> = new Set()
    const points: Point[] = gin(pos, { row: -1, column: -1, piece: Gin0 })
    points.forEach(p => s.add(`${p.row}${p.column}`))
    expect(points).toHaveLength(41)
    expect(s.size).toEqual(41)
  })

  it('持ち駒を全ての空白マスに置ける2(先手)', async () => {
    const pos: Position = emptyPosition()
    const s: Set<string> = new Set()
    const points: Point[] = gin(pos, { row: -1, column: -1, piece: Gin0 })
    points.forEach(p => s.add(`${p.row}${p.column}`))
    expect(points).toHaveLength(81)
    expect(s.size).toEqual(81)
  })

  it('持ち駒を全ての空白マスに置ける(後手)', async () => {
    const pos: Position = newGameState().pos // 初期局面
    const s: Set<string> = new Set()
    const points: Point[] = gin(pos, { row: -1, column: -1, piece: Gin1 })
    points.forEach(p => s.add(`${p.row}${p.column}`))
    expect(points).toHaveLength(41)
    expect(s.size).toEqual(41)
  })

  it('持ち駒を全ての空白マスに置ける2(後手)', async () => {
    const pos: Position = emptyPosition()
    const s: Set<string> = new Set()
    const points: Point[] = gin(pos, { row: -1, column: -1, piece: Gin1 })
    points.forEach(p => s.add(`${p.row}${p.column}`))
    expect(points).toHaveLength(81)
    expect(s.size).toEqual(81)
  })

  it('銀以外の駒を渡すとエラー', async () =>
    expect(() =>
      gin(emptyPosition(), { row: 4, column: 4, piece: Fu0 })
    ).toThrow())
})
