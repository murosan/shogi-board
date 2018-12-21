import { Kyou0, Kyou1, Fu0 } from '../../../model/shogi/Piece'
import emptyPosition from '../../../testutils/emptyPosition'
import Point from '../../../model/shogi/Point'
import kyou from './kyou'
import Position from '../../../model/shogi/Position'

describe('香の動き判定', async () => {
  it('障害物がない場合、縦に好きなだけ移動できる(先手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[4][4] = Kyou0 // 55
    pos.pos[8][0] = Kyou0 // 19
    pos.pos[0][8] = Kyou0 // 91
    const expected1: Set<Point> = new Set([
      { row: 3, column: 4 },
      { row: 2, column: 4 },
      { row: 1, column: 4 },
      { row: 0, column: 4 },
    ])
    const expected2: Set<Point> = new Set([
      { row: 7, column: 0 },
      { row: 6, column: 0 },
      { row: 5, column: 0 },
      { row: 4, column: 0 },
      { row: 3, column: 0 },
      { row: 2, column: 0 },
      { row: 1, column: 0 },
      { row: 0, column: 0 },
    ])
    const expected3: Set<Point> = new Set() // 念の為
    const res1: Point[] = kyou(pos, { row: 4, column: 4, piece: Kyou0 })
    const res2: Point[] = kyou(pos, { row: 8, column: 0, piece: Kyou0 })
    const res3: Point[] = kyou(pos, { row: 0, column: 8, piece: Kyou0 })
    expect(new Set(res1)).toEqual(expected1)
    expect(new Set(res2)).toEqual(expected2)
    expect(new Set(res3)).toEqual(expected3)
  })

  it('障害物がない場合、縦に好きなだけ移動できる(後手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[4][4] = Kyou1 // 55
    pos.pos[0][8] = Kyou1 // 91
    pos.pos[8][0] = Kyou1 // 19
    const expected1: Set<Point> = new Set([
      { row: 5, column: 4 },
      { row: 6, column: 4 },
      { row: 7, column: 4 },
      { row: 8, column: 4 },
    ])
    const expected2: Set<Point> = new Set([
      { row: 8, column: 8 },
      { row: 7, column: 8 },
      { row: 6, column: 8 },
      { row: 5, column: 8 },
      { row: 4, column: 8 },
      { row: 3, column: 8 },
      { row: 2, column: 8 },
      { row: 1, column: 8 },
    ])
    const expected3: Set<Point> = new Set() // 念の為
    const res1: Point[] = kyou(pos, { row: 4, column: 4, piece: Kyou1 })
    const res2: Point[] = kyou(pos, { row: 0, column: 8, piece: Kyou1 })
    const res3: Point[] = kyou(pos, { row: 8, column: 0, piece: Kyou1 })
    expect(new Set(res1)).toEqual(expected1)
    expect(new Set(res2)).toEqual(expected2)
    expect(new Set(res3)).toEqual(expected3)
  })

  it('味方の駒があるところには移動できない(先手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[4][4] = Kyou0 // 55
    pos.pos[1][4] = Kyou0 // 52
    const expected: Set<Point> = new Set([
      { row: 3, column: 4 },
      { row: 2, column: 4 },
    ])
    const res: Point[] = kyou(pos, { row: 4, column: 4, piece: Kyou0 })
    expect(new Set(res)).toEqual(expected)
  })

  it('味方の駒があるところには移動できない(後手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[4][4] = Kyou1 // 55
    pos.pos[7][4] = Kyou1 // 58
    const expected: Set<Point> = new Set([
      { row: 5, column: 4 },
      { row: 6, column: 4 },
    ])
    const res: Point[] = kyou(pos, { row: 4, column: 4, piece: Kyou1 })
    expect(new Set(res)).toEqual(expected)
  })

  it('相手の駒があるところまで移動できる(先手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[4][4] = Kyou0 // 55
    pos.pos[2][4] = Kyou1 // 53
    const expected: Set<Point> = new Set([
      { row: 3, column: 4 },
      { row: 2, column: 4 },
    ])
    const res: Point[] = kyou(pos, { row: 4, column: 4, piece: Kyou0 })
    expect(new Set(res)).toEqual(expected)
  })

  it('相手の駒があるところまで移動できる(後手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[4][4] = Kyou1 // 55
    pos.pos[6][4] = Kyou0 // 57
    const expected: Set<Point> = new Set([
      { row: 5, column: 4 },
      { row: 6, column: 4 },
    ])
    const res: Point[] = kyou(pos, { row: 4, column: 4, piece: Kyou1 })
    expect(new Set(res)).toEqual(expected)
  })

  it('持ち駒を敵陣最奥以外の空白マスに置ける(先手)', async () => {
    const pos: Position = emptyPosition()
    const res: Point[] = kyou(pos, { row: -1, column: -1, piece: Kyou0 })
    expect(new Set(res).size).toEqual(72)
    expect(res.every(p => p.row !== 0)).toBeTruthy()
  })

  it('持ち駒を敵陣最奥以外の空白マスに置ける(後手)', async () => {
    const pos: Position = emptyPosition()
    const res: Point[] = kyou(pos, { row: -1, column: -1, piece: Kyou1 })
    expect(new Set(res).size).toEqual(72)
    expect(res.every(p => p.row !== 8)).toBeTruthy()
  })

  it('香以外の駒を渡すとエラー', async () =>
    expect(() =>
      kyou(emptyPosition(), { row: -1, column: -1, piece: Fu0 })
    ).toThrow())
})
