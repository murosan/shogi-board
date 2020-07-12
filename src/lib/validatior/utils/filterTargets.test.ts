import {
  Fu0,
  Fu1,
  Gyoku0,
  Gyoku1,
  Hisha0,
  Hisha1,
  Kei0,
  Kei1,
  Kin0,
  Kin1,
} from '../../../model/shogi/Piece'
import { emptyPosition } from '../../../testutils/emptyPosition'
import { getTargets } from '../getTargets'
import filterTargets from './filterTargets'

describe('filterTargets', () => {
  it('王手放置でも打ち歩詰めでもなければ弾かれない(先手)', async () => {
    const pos = emptyPosition()
    pos.pos[4][4] = Hisha0
    const point = { row: 4, column: 4, piece: Hisha0 }
    const targets = getTargets(pos, point)
    expect(filterTargets(pos, point, targets)).toEqual(targets)
  })

  it('王手放置でも打ち歩詰めでもなければ弾かれない(後手)', async () => {
    const pos = emptyPosition()
    pos.pos[4][4] = Hisha1
    const point = { row: 4, column: 4, piece: Hisha1 }
    const targets = getTargets(pos, point)
    expect(filterTargets(pos, point, targets)).toEqual(targets)
  })

  it('動かした結果王手放置になる場所ば弾かれる(先手)', async () => {
    const pos = emptyPosition()
    pos.pos[8][8] = Gyoku0
    pos.pos[8][4] = Hisha0
    pos.pos[8][0] = Hisha1
    const point = { row: 8, column: 4, piece: Hisha0 }
    const targets = getTargets(pos, point)
    const expected = targets.filter(t => t.row === 8)
    expect(filterTargets(pos, point, targets)).toEqual(expected)
  })

  it('動かした結果王手放置になる場所ば弾かれる(後手)', async () => {
    const pos = emptyPosition()
    pos.pos[0][8] = Gyoku1
    pos.pos[0][4] = Hisha1
    pos.pos[0][0] = Hisha0
    const point = { row: 0, column: 4, piece: Hisha1 }
    const targets = getTargets(pos, point)
    const expected = targets.filter(t => t.row === 0)
    expect(filterTargets(pos, point, targets)).toEqual(expected)
  })

  it('玉自身が動いて王手放置になる場所は弾かれる(先手)', async () => {
    const pos = emptyPosition()
    pos.pos[8][8] = Gyoku0
    pos.pos[0][7] = Hisha1
    const point = { row: 8, column: 8, piece: Gyoku0 }
    const targets = getTargets(pos, point)
    const expected = targets.filter(t => t.column !== 7)
    expect(filterTargets(pos, point, targets)).toEqual(expected)
  })

  it('玉自身が動いて王手放置になる場所は弾かれる(後手)', async () => {
    const pos = emptyPosition()
    pos.pos[0][8] = Gyoku1
    pos.pos[8][7] = Hisha0
    const point = { row: 0, column: 8, piece: Gyoku1 }
    const targets = getTargets(pos, point)
    const expected = targets.filter(t => t.column !== 7)
    expect(filterTargets(pos, point, targets)).toEqual(expected)
  })

  it('打ち歩詰めはできない(先手)', async () => {
    const pos = emptyPosition()
    pos.pos[0][0] = Gyoku1
    pos.pos[0][1] = Kei1
    pos.pos[2][1] = Kin0
    const point = { row: -1, column: -1, piece: Fu0 }
    const targets = getTargets(pos, point)
    const expected = targets.filter(t => !(t.row === 1 && t.column === 0))
    expect(filterTargets(pos, point, targets)).toEqual(expected)
  })

  it('打ち歩詰めはできない(後手)', async () => {
    const pos = emptyPosition()
    pos.pos[8][8] = Gyoku0
    pos.pos[8][7] = Kei0
    pos.pos[6][7] = Kin1
    const point = { row: -1, column: -1, piece: Fu1 }
    const targets = getTargets(pos, point)
    const expected = targets.filter(t => !(t.row === 7 && t.column === 8))
    expect(filterTargets(pos, point, targets)).toEqual(expected)
  })

  it('持ち駒の歩を打っても玉の逃げ道があれば弾かれない(先手)', async () => {
    const pos = emptyPosition()
    pos.pos[0][0] = Gyoku1
    pos.pos[2][1] = Kin0
    const point = { row: -1, column: -1, piece: Fu0 }
    const targets = getTargets(pos, point)
    expect(filterTargets(pos, point, targets)).toEqual(targets)
  })

  it('持ち駒の歩を打っても玉の逃げ道があれば弾かれない(後手)', async () => {
    const pos = emptyPosition()
    pos.pos[8][8] = Gyoku0
    pos.pos[6][7] = Kin1
    const point = { row: -1, column: -1, piece: Fu1 }
    const targets = getTargets(pos, point)
    expect(filterTargets(pos, point, targets)).toEqual(targets)
  })

  it('持ち駒の歩を打って王手でも打った歩が取られる位置ならば弾かれない(先手)', async () => {
    const pos = emptyPosition()
    pos.pos[0][0] = Gyoku1
    pos.pos[0][1] = Kin1
    pos.pos[2][1] = Kin0
    const point = { row: -1, column: -1, piece: Fu0 }
    const targets = getTargets(pos, point)
    expect(filterTargets(pos, point, targets)).toEqual(targets)
  })

  it('持ち駒の歩を打って王手でも打った歩が取られる位置ならば弾かれない(後手)', async () => {
    const pos = emptyPosition()
    pos.pos[8][8] = Gyoku0
    pos.pos[8][7] = Kin0
    pos.pos[6][7] = Kin1
    const point = { row: -1, column: -1, piece: Fu1 }
    const targets = getTargets(pos, point)
    expect(filterTargets(pos, point, targets)).toEqual(targets)
  })

  it('歩じゃない場合は打ち歩詰めで弾かれない', async () => {
    const pos = emptyPosition()
    pos.pos[0][8] = Gyoku1
    pos.pos[2][7] = Kin0
    pos.pos[2][8] = Kin0
    const point = { row: 2, column: 8, piece: Kin0 }
    const targets = getTargets(pos, point)
    expect(filterTargets(pos, point, targets)).toEqual(targets)
  })

  it('持ち駒の歩じゃない場合は打ち歩詰めで弾かれない', async () => {
    const pos = emptyPosition()
    pos.pos[0][8] = Gyoku1
    pos.pos[0][7] = Kei1
    pos.pos[2][7] = Kin0
    pos.pos[2][8] = Fu0
    const point = { row: 2, column: 8, piece: Fu0 }
    const targets = getTargets(pos, point)
    expect(filterTargets(pos, point, targets)).toEqual(targets)
  })

  it('駒IDがない時エラー', async () => {
    const pos = emptyPosition()
    pos.pos[4][4] = Hisha0
    const targets = getTargets(pos, { row: 4, column: 4, piece: Hisha0 })
    expect(() => filterTargets(pos, { row: 4, column: 4 }, targets)).toThrow()
  })
})
