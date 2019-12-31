import { Fu0, Fu1 } from '../../../model/shogi/Piece'
import { hirate } from '../../../model/shogi/PositionInit'
import getFromNexts from './getFromNexts'

describe('getFromNexts', () => {
  it('nexts で指定された場所が空白マスなら追加される', async () => {
    const pos = hirate().pos
    const nexts = [
      [4, 4],
      [0, 4],
      [7, 4],
      [4, 1],
      [4, 7],
    ]
    expect(getFromNexts(pos, nexts, Fu0)).toHaveLength(nexts.length)
  })

  it('nexts で指定された場所が相手の駒なら追加される(先手)', async () => {
    const pos = hirate().pos
    const nexts = [
      [2, 1],
      [0, 4],
      [0, 1],
    ]
    expect(getFromNexts(pos, nexts, Fu0)).toHaveLength(nexts.length)
  })

  it('nexts で指定された場所が相手の駒なら追加される(後手)', async () => {
    const pos = hirate().pos
    const nexts = [
      [6, 7],
      [8, 4],
      [8, 7],
    ]
    expect(getFromNexts(pos, nexts, Fu1)).toHaveLength(nexts.length)
  })

  it('nexts で指定された場所が自分の駒なら追加されない(先手)', async () => {
    const pos = hirate().pos
    const nexts = [
      [6, 7],
      [8, 4],
      [8, 7],
    ]
    expect(getFromNexts(pos, nexts, Fu0)).toHaveLength(0)
  })

  it('nexts で指定された場所が自分の駒なら追加されない(後手)', async () => {
    const pos = hirate().pos
    const nexts = [
      [2, 1],
      [0, 4],
      [0, 1],
    ]
    expect(getFromNexts(pos, nexts, Fu1)).toHaveLength(0)
  })

  it('盤外なら追加されない', async () => {
    const pos = hirate().pos
    const nexts = [
      [9, 9],
      [-1, -1],
      [-1, 9],
      [9, 5],
      [-1, 7],
      [4, -1],
      [3, 9],
    ]
    expect(getFromNexts(pos, nexts, Fu0)).toHaveLength(0)
  })
})
