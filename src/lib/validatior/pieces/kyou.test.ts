import { Fu0, Kyou0, Kyou1 } from '../../../model/shogi/Piece'
import Point from '../../../model/shogi/Point'
import { Position } from '../../../model/shogi/Position'
import emptyPosition from '../../../testutils/emptyPosition'
import kyou from './kyou'

describe('香の動き判定', () => {
  it('障害物がない場合、縦に好きなだけ移動できる(先手)', async () => {
    const pos: Position = emptyPosition()
    const expected1: Point[] = [
      { row: 0, column: 4 },
      { row: 1, column: 4 },
      { row: 2, column: 4 },
      { row: 3, column: 4 },
    ]
    const expected2: Point[] = [
      { row: 0, column: 0 },
      { row: 1, column: 0 },
      { row: 2, column: 0 },
      { row: 3, column: 0 },
      { row: 4, column: 0 },
      { row: 5, column: 0 },
      { row: 6, column: 0 },
      { row: 7, column: 0 },
    ]
    expect(kyou(pos, { row: 4, column: 4, piece: Kyou0 })).toEqual(expected1)
    expect(kyou(pos, { row: 8, column: 0, piece: Kyou0 })).toEqual(expected2)
    expect(kyou(pos, { row: 0, column: 8, piece: Kyou0 })).toEqual([])
  })

  it('障害物がない場合、縦に好きなだけ移動できる(後手)', async () => {
    const pos: Position = emptyPosition()
    const expected1: Point[] = [
      { row: 5, column: 4 },
      { row: 6, column: 4 },
      { row: 7, column: 4 },
      { row: 8, column: 4 },
    ]
    const expected2: Point[] = [
      { row: 1, column: 8 },
      { row: 2, column: 8 },
      { row: 3, column: 8 },
      { row: 4, column: 8 },
      { row: 5, column: 8 },
      { row: 6, column: 8 },
      { row: 7, column: 8 },
      { row: 8, column: 8 },
    ]
    expect(kyou(pos, { row: 4, column: 4, piece: Kyou1 })).toEqual(expected1)
    expect(kyou(pos, { row: 0, column: 8, piece: Kyou1 })).toEqual(expected2)
    expect(kyou(pos, { row: 8, column: 0, piece: Kyou1 })).toEqual([])
  })

  it('味方の駒があるところには移動できない(先手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[1][4] = Kyou0 // 52
    const expected: Point[] = [
      { row: 2, column: 4 },
      { row: 3, column: 4 },
    ]
    expect(kyou(pos, { row: 4, column: 4, piece: Kyou0 })).toEqual(expected)
  })

  it('味方の駒があるところには移動できない(後手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[7][4] = Kyou1 // 58
    const expected: Point[] = [
      { row: 5, column: 4 },
      { row: 6, column: 4 },
    ]
    expect(kyou(pos, { row: 4, column: 4, piece: Kyou1 })).toEqual(expected)
  })

  it('相手の駒があるところまで移動できる(先手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[2][4] = Kyou1 // 53
    const expected: Point[] = [
      { row: 2, column: 4 },
      { row: 3, column: 4 },
    ]
    expect(kyou(pos, { row: 4, column: 4, piece: Kyou0 })).toEqual(expected)
  })

  it('相手の駒があるところまで移動できる(後手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[6][4] = Kyou0 // 57
    const expected: Point[] = [
      { row: 5, column: 4 },
      { row: 6, column: 4 },
    ]
    expect(kyou(pos, { row: 4, column: 4, piece: Kyou1 })).toEqual(expected)
  })

  it('持ち駒を敵陣最奥以外の空白マスに置ける(先手)', async () => {
    const pos: Position = emptyPosition()
    const res: Point[] = kyou(pos, { row: -1, column: -1, piece: Kyou0 })
    expect(res).toHaveLength(72)
    expect(res.every(p => p.row !== 0)).toBeTruthy()
  })

  it('持ち駒を敵陣最奥以外の空白マスに置ける(後手)', async () => {
    const pos: Position = emptyPosition()
    const res: Point[] = kyou(pos, { row: -1, column: -1, piece: Kyou1 })
    expect(res).toHaveLength(72)
    expect(res.every(p => p.row !== 8)).toBeTruthy()
  })

  it('香以外の駒を渡すとエラー', async () =>
    expect(() =>
      kyou(emptyPosition(), { row: -1, column: -1, piece: Fu0 })
    ).toThrow())
})
