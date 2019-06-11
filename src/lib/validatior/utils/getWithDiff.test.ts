import { Fu0, Fu1, Kyou0 } from '../../../model/shogi/Piece'
import Point from '../../../model/shogi/Point'
import emptyPosition from '../../../testutils/emptyPosition'
import getWithDiff from './getWithDiff'

describe('getWithDiff', () => {
  it('空白マスは追加される', async () => {
    const pos = emptyPosition().pos
    const res: Point[] = []
    getWithDiff(pos, 8, 4, Kyou0, res, -1, 0)
    expect(res).toHaveLength(9)
  })

  it('相手の駒があるところは含まれる', async () => {
    const pos = emptyPosition().pos
    pos[4][4] = Fu1
    const res: Point[] = []
    getWithDiff(pos, 8, 4, Kyou0, res, -1, 0)
    expect(res).toHaveLength(5)
  })

  it('味方の駒があるところは含まれない', async () => {
    const pos = emptyPosition().pos
    pos[4][4] = Fu0
    const res: Point[] = []
    getWithDiff(pos, 8, 4, Kyou0, res, -1, 0)
    expect(res).toHaveLength(4)
  })
})
