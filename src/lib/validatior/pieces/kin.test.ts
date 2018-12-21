import { newGameState } from '../../../model/shogi/GameStateInit'
import { Fu0, Gin0, Gin1, Kin0, Kin1 } from '../../../model/shogi/Piece'
import Point from '../../../model/shogi/Point'
import Position from '../../../model/shogi/Position'
import emptyPosition from '../../../testutils/emptyPosition'
import kin from './kin'

describe('金の動き判定', async () => {
  it('駒のない場所に移動できる(先手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[4][4] = Kin0 // 55
    const expected: Set<Point> = new Set([
      { row: 3, column: 3 },
      { row: 3, column: 4 },
      { row: 3, column: 5 },
      { row: 4, column: 3 },
      { row: 4, column: 5 },
      { row: 5, column: 4 },
    ])
    const res: Point[] = kin(pos, { row: 4, column: 4, piece: Kin0 })
    expect(new Set(res)).toEqual(expected)
  })

  it('駒のない場所に移動できる(後手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[4][4] = Kin1 // 55
    const expected: Set<Point> = new Set([
      { row: 3, column: 4 },
      { row: 4, column: 3 },
      { row: 4, column: 5 },
      { row: 5, column: 3 },
      { row: 5, column: 4 },
      { row: 5, column: 5 },
    ])
    const res: Point[] = kin(pos, { row: 4, column: 4, piece: Kin1 })
    expect(new Set(res)).toEqual(expected)
  })

  it('味方の駒があるところには動けない(先手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[4][4] = Kin0 // 55
    pos.pos[3][3] = Gin0 // 44
    const expected: Set<Point> = new Set([
      { row: 3, column: 4 },
      { row: 3, column: 5 },
      { row: 4, column: 3 },
      { row: 4, column: 5 },
      { row: 5, column: 4 },
    ])
    const res: Point[] = kin(pos, { row: 4, column: 4, piece: Kin0 })
    expect(new Set(res)).toEqual(expected)
  })

  it('味方の駒があるところには動けない(後手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[4][4] = Kin1 // 55
    pos.pos[3][4] = Gin1 // 45
    const expected: Set<Point> = new Set([
      { row: 4, column: 3 },
      { row: 4, column: 5 },
      { row: 5, column: 3 },
      { row: 5, column: 4 },
      { row: 5, column: 5 },
    ])
    const res: Point[] = kin(pos, { row: 4, column: 4, piece: Kin1 })
    expect(new Set(res)).toEqual(expected)
  })

  it('相手の駒があるところには動ける(先手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[4][4] = Kin0 // 55
    pos.pos[3][3] = Gin1 // 44
    const expected: Set<Point> = new Set([
      { row: 3, column: 3 },
      { row: 3, column: 4 },
      { row: 3, column: 5 },
      { row: 4, column: 3 },
      { row: 4, column: 5 },
      { row: 5, column: 4 },
    ])
    const res: Point[] = kin(pos, { row: 4, column: 4, piece: Kin0 })
    expect(new Set(res)).toEqual(expected)
  })

  it('相手の駒があるところには動ける(後手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[4][4] = Kin1 // 55
    pos.pos[3][3] = Gin0 // 44
    const expected: Set<Point> = new Set([
      { row: 3, column: 4 },
      { row: 4, column: 3 },
      { row: 4, column: 5 },
      { row: 5, column: 3 },
      { row: 5, column: 4 },
      { row: 5, column: 5 },
    ])
    const res: Point[] = kin(pos, { row: 4, column: 4, piece: Kin1 })
    expect(new Set(res)).toEqual(expected)
  })

  it('盤外には動けない(先手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[0][0] = Kin0 // 11
    pos.pos[8][0] = Kin0 // 19
    pos.pos[0][8] = Kin0 // 91
    pos.pos[8][8] = Kin0 // 99
    const expected1: Set<Point> = new Set([
      { row: 0, column: 1 },
      { row: 1, column: 0 },
    ])
    const expected2: Set<Point> = new Set([
      { row: 7, column: 0 },
      { row: 7, column: 1 },
      { row: 8, column: 1 },
    ])
    const expected3: Set<Point> = new Set([
      { row: 0, column: 7 },
      { row: 1, column: 8 },
    ])
    const expected4: Set<Point> = new Set([
      { row: 7, column: 7 },
      { row: 7, column: 8 },
      { row: 8, column: 7 },
    ])
    const res1: Point[] = kin(pos, { row: 0, column: 0, piece: Kin0 })
    const res2: Point[] = kin(pos, { row: 8, column: 0, piece: Kin0 })
    const res3: Point[] = kin(pos, { row: 0, column: 8, piece: Kin0 })
    const res4: Point[] = kin(pos, { row: 8, column: 8, piece: Kin0 })
    expect(new Set(res1)).toEqual(expected1)
    expect(new Set(res2)).toEqual(expected2)
    expect(new Set(res3)).toEqual(expected3)
    expect(new Set(res4)).toEqual(expected4)
  })

  it('盤外には動けない(後手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[0][0] = Kin1 // 11
    pos.pos[8][0] = Kin1 // 19
    pos.pos[0][8] = Kin1 // 91
    pos.pos[8][8] = Kin1 // 99
    const expected1: Set<Point> = new Set([
      { row: 0, column: 1 },
      { row: 1, column: 0 },
      { row: 1, column: 1 },
    ])
    const expected2: Set<Point> = new Set([
      { row: 7, column: 0 },
      { row: 8, column: 1 },
    ])
    const expected3: Set<Point> = new Set([
      { row: 0, column: 7 },
      { row: 1, column: 7 },
      { row: 1, column: 8 },
    ])
    const expected4: Set<Point> = new Set([
      { row: 7, column: 8 },
      { row: 8, column: 7 },
    ])
    const res1: Point[] = kin(pos, { row: 0, column: 0, piece: Kin1 })
    const res2: Point[] = kin(pos, { row: 8, column: 0, piece: Kin1 })
    const res3: Point[] = kin(pos, { row: 0, column: 8, piece: Kin1 })
    const res4: Point[] = kin(pos, { row: 8, column: 8, piece: Kin1 })
    expect(new Set(res1)).toEqual(expected1)
    expect(new Set(res2)).toEqual(expected2)
    expect(new Set(res3)).toEqual(expected3)
    expect(new Set(res4)).toEqual(expected4)
  })

  it('持ち駒を全ての空白マスに置ける(先手)', async () => {
    const pos: Position = newGameState().pos // 初期局面
    const points: Point[] = kin(pos, { row: -1, column: -1, piece: Kin0 })
    expect(new Set(points).size).toEqual(41)
  })

  it('持ち駒を全ての空白マスに置ける2(先手)', async () => {
    const pos: Position = emptyPosition()
    const points: Point[] = kin(pos, { row: -1, column: -1, piece: Kin0 })
    expect(new Set(points).size).toEqual(81)
  })

  it('持ち駒を全ての空白マスに置ける(後手)', async () => {
    const pos: Position = newGameState().pos // 初期局面
    const points: Point[] = kin(pos, { row: -1, column: -1, piece: Kin1 })
    expect(new Set(points).size).toEqual(41)
  })

  it('持ち駒を全ての空白マスに置ける2(後手)', async () => {
    const pos: Position = emptyPosition()
    const points: Point[] = kin(pos, { row: -1, column: -1, piece: Kin1 })
    expect(new Set(points).size).toEqual(81)
  })

  it('金以外の駒を渡すとエラー', async () =>
    expect(() =>
      kin(emptyPosition(), { row: 4, column: 4, piece: Fu0 })
    ).toThrow())
})
