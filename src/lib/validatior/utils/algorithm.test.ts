import Point from '../../../model/shogi/Point'
import { comp, find } from './algorithm'

describe('comp', () => {
  it('row が a < b ならマイナスの値が返る', async () => {
    const a: Point = { row: 0, column: 4 }
    const b: Point = { row: 1, column: 4 }
    expect(comp(a, b)).toBeLessThan(0)
  })

  it('column が a < b ならマイナスの値が返る', async () => {
    const a: Point = { row: 0, column: 2 }
    const b: Point = { row: 0, column: 4 }
    expect(comp(a, b)).toBeLessThan(0)
  })

  it('row が a > b ならプラスの値が返る', async () => {
    const a: Point = { row: 1, column: 4 }
    const b: Point = { row: 0, column: 4 }
    expect(comp(a, b)).toBeGreaterThan(0)
  })

  it('column が a > b ならプラスの値が返る', async () => {
    const a: Point = { row: 0, column: 4 }
    const b: Point = { row: 0, column: 2 }
    expect(comp(a, b)).toBeGreaterThan(0)
  })

  it('row と column が a === b なら 0 が返る', async () => {
    const a: Point = { row: 4, column: 4 }
    const b: Point = { row: 4, column: 4 }
    expect(comp(a, b)).toEqual(0)
  })
})

describe('find', () => {
  it('位置が一致するインデックスを返せる', async () => {
    const pts: Point[] = [
      { row: 0, column: 0 },
      { row: 0, column: 8 },
      { row: 1, column: 1 },
      { row: 1, column: 7 },
      { row: 2, column: 2 },
      { row: 2, column: 6 },
      { row: 3, column: 3 },
      { row: 3, column: 4 },
      { row: 3, column: 5 },
      { row: 4, column: 3 },
      { row: 4, column: 5 },
      { row: 5, column: 3 },
      { row: 5, column: 4 },
      { row: 5, column: 5 },
      { row: 6, column: 2 },
      { row: 6, column: 6 },
      { row: 7, column: 1 },
      { row: 7, column: 7 },
      { row: 8, column: 0 },
      { row: 8, column: 8 },
    ]
    expect(find(pts, { row: 7, column: 1 })).toEqual(16)
    expect(find(pts, { row: 0, column: 0 })).toEqual(0)
    expect(find(pts, { row: 2, column: 6 })).toEqual(5)
    expect(find(pts, { row: 3, column: 4 })).toEqual(7)
    expect(find(pts, { row: 4, column: 5 })).toEqual(10)
    expect(find(pts, { row: 5, column: 5 })).toEqual(13)
    expect(find(pts, { row: 6, column: 6 })).toEqual(15)
    expect(find(pts, { row: 7, column: 1 })).toEqual(16)
    expect(find(pts, { row: 8, column: 8 })).toEqual(19)
  })

  it('数が少ない場合でも正しい値を返せる', async () => {
    const pts1: Point[] = [
      { row: 0, column: 0 },
      { row: 0, column: 8 },
    ]
    const pts2: Point[] = [{ row: 0, column: 0 }]
    expect(find(pts1, { row: 0, column: 0 })).toEqual(0)
    expect(find(pts1, { row: 0, column: 8 })).toEqual(1)
    expect(find(pts2, { row: 0, column: 0 })).toEqual(0)
  })

  it('見つからない場合は -1 が返る', async () => {
    const pts: Point[] = [{ row: 0, column: 0 }]
    expect(find(pts, { row: 1, column: 1 })).toEqual(-1)
  })

  it('空の配列を渡すと -1 が返る', async () => {
    const pts: Point[] = []
    expect(find(pts, { row: 1, column: 1 })).toEqual(-1)
  })
})
