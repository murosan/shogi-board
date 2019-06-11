import { hirate } from '../../../model/shogi/PositionInit'
import getEmpties from './getEmpties'

describe('getEmpties', () => {
  it('空白マスを全て取得できる', async () => {
    const pos = hirate().pos
    expect(getEmpties(pos)).toHaveLength(41)
  })

  it('invalidRows に設定された行は取得できない', async () => {
    const pos = hirate().pos
    expect(getEmpties(pos, [4])).toHaveLength(32)
  })

  it('invalidColumns に設定された行は取得できない', async () => {
    const pos = hirate().pos
    expect(getEmpties(pos, undefined, [4])).toHaveLength(36)
  })

  it('両方設定できる', async () => {
    const pos = hirate().pos
    expect(getEmpties(pos, [4], [4])).toHaveLength(28)
  })

  it('複数設定できる', async () => {
    const pos = hirate().pos
    expect(getEmpties(pos, [3, 4, 5], [0, 8])).toHaveLength(10)
  })
})
