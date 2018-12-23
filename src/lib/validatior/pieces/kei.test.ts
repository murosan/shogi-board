import { Fu0, Kei0, Kei1, Kin0, Kin1 } from '../../../model/shogi/Piece'
import Point from '../../../model/shogi/Point'
import Position from '../../../model/shogi/Position'
import emptyPosition from '../../../testutils/emptyPosition'
import kei from './kei'

describe('桂の動き判定', async () => {
  it('空白マスに移動できる(先手)', async () => {
    const pos: Position = emptyPosition()
    const expected: Point[] = [{ row: 2, column: 3 }, { row: 2, column: 5 }]
    expect(kei(pos, { row: 4, column: 4, piece: Kei0 })).toEqual(expected)
  })

  it('空白マスに移動できる(後手)', async () => {
    const pos: Position = emptyPosition()
    const expected: Point[] = [{ row: 6, column: 3 }, { row: 6, column: 5 }]
    expect(kei(pos, { row: 4, column: 4, piece: Kei1 })).toEqual(expected)
  })

  it('味方の駒があるところには動けない(先手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[2][3] = Kin0 // 43
    const expected: Point[] = [{ row: 2, column: 5 }]
    expect(kei(pos, { row: 4, column: 4, piece: Kei0 })).toEqual(expected)
  })

  it('味方の駒があるところには動けない(後手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[6][3] = Kin1 // 47
    const expected: Point[] = [{ row: 6, column: 5 }]
    expect(kei(pos, { row: 4, column: 4, piece: Kei1 })).toEqual(expected)
  })

  it('相手の駒があるところには動ける(先手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[2][3] = Kin1 // 43
    const expected: Point[] = [{ row: 2, column: 3 }, { row: 2, column: 5 }]
    expect(kei(pos, { row: 4, column: 4, piece: Kei0 })).toEqual(expected)
  })

  it('相手の駒があるところには動ける(後手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[6][3] = Kin0 // 47
    const expected: Point[] = [{ row: 6, column: 3 }, { row: 6, column: 5 }]
    expect(kei(pos, { row: 4, column: 4, piece: Kei1 })).toEqual(expected)
  })

  it('他の駒があっても飛び越えて動ける(先手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[3][3] = Kin0 // 44
    pos.pos[3][4] = Kin0 // 54
    pos.pos[3][5] = Kin0 // 64
    const expected: Point[] = [{ row: 2, column: 3 }, { row: 2, column: 5 }]
    expect(kei(pos, { row: 4, column: 4, piece: Kei0 })).toEqual(expected)
  })

  it('他の駒があっても飛び越えて動ける(後手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[5][3] = Kin1 // 46
    pos.pos[5][4] = Kin1 // 56
    pos.pos[5][5] = Kin1 // 66
    const expected: Point[] = [{ row: 6, column: 3 }, { row: 6, column: 5 }]
    expect(kei(pos, { row: 4, column: 4, piece: Kei1 })).toEqual(expected)
  })

  it('盤外には動けない(先手)', async () => {
    const pos: Position = emptyPosition()
    const expected1: Point[] = []
    const expected2: Point[] = [{ row: 6, column: 1 }]
    const expected3: Point[] = []
    const expected4: Point[] = [{ row: 6, column: 7 }]
    expect(kei(pos, { row: 0, column: 0, piece: Kei0 })).toEqual(expected1)
    expect(kei(pos, { row: 8, column: 0, piece: Kei0 })).toEqual(expected2)
    expect(kei(pos, { row: 0, column: 8, piece: Kei0 })).toEqual(expected3)
    expect(kei(pos, { row: 8, column: 8, piece: Kei0 })).toEqual(expected4)
  })

  it('盤外には動けない(後手)', async () => {
    const pos: Position = emptyPosition()
    const expected1: Point[] = [{ row: 2, column: 1 }]
    const expected2: Point[] = []
    const expected3: Point[] = [{ row: 2, column: 7 }]
    const expected4: Point[] = []
    expect(kei(pos, { row: 0, column: 0, piece: Kei1 })).toEqual(expected1)
    expect(kei(pos, { row: 8, column: 0, piece: Kei1 })).toEqual(expected2)
    expect(kei(pos, { row: 0, column: 8, piece: Kei1 })).toEqual(expected3)
    expect(kei(pos, { row: 8, column: 8, piece: Kei1 })).toEqual(expected4)
  })

  it('持ち駒を敵陣3段目から手前の全ての空白マスに置ける(先手)', async () => {
    const pos: Position = emptyPosition()
    const points: Point[] = kei(pos, { row: -1, column: -1, piece: Kei0 })
    expect(points).toHaveLength(63)
  })

  it('持ち駒を敵陣3段目から手前の空白マスに置ける(後手)', async () => {
    const pos: Position = emptyPosition()
    const points: Point[] = kei(pos, { row: -1, column: -1, piece: Kei1 })
    expect(points).toHaveLength(63)
  })

  it('桂以外の駒を渡すとエラー', async () =>
    expect(() =>
      kei(emptyPosition(), { row: 4, column: 4, piece: Fu0 })
    ).toThrow())
})
