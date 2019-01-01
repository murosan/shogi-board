import * as PositionHandler from '../lib/game-handler/position'
import * as KifHandler from '../lib/kif-handler/genKifString'
import { Empty, Fu0, Fu1, Kei1, To0 } from '../model/shogi/Piece'
import { mockKif } from '../testutils/mockKif'
import GameStateStore from './GameStateStore'

describe('GameStateStore', async () => {
  it('手番側の駒を選択すると selected に情報が入る', async () => {
    const s = new GameStateStore()
    expect(s.selected).toBeUndefined()
    s.clickPiece({ clicked: Fu0, row: 6, column: 1 })
    expect(s.selected).not.toBeUndefined()
    expect(s.selected!!.row).toEqual(6)
    expect(s.selected!!.column).toEqual(1)
    expect(s.selected!!.piece).toEqual(Fu0)
  })

  it('2度同じ駒を選択すると解除される', async () => {
    const s = new GameStateStore()
    expect(s.selected).toBeUndefined()
    s.clickPiece({ clicked: Fu0, row: 6, column: 1 })
    s.clickPiece({ clicked: Fu0, row: 6, column: 1 })
    expect(s.selected).toBeUndefined()
  })

  it('選択なしの状態で手番ではない側の駒をクリックしても何もしない', async () => {
    const s = new GameStateStore()
    expect(s.selected).toBeUndefined()
    s.clickPiece({ clicked: Fu1, row: 6, column: 1 })
    expect(s.selected).toBeUndefined()
  })

  it('選択なしの状態で空白マスをクリックしても何もしない', async () => {
    const s = new GameStateStore()
    expect(s.selected).toBeUndefined()
    s.clickPiece({ clicked: Empty, row: 4, column: 4 })
    expect(s.selected).toBeUndefined()
  })

  it('選択ありで、動けない場所をクリックしたら何もしない', async () => {
    const phSpy = jest.spyOn(PositionHandler, 'move')
    const khSpy = jest.spyOn(KifHandler, 'genKifString')
    const s = new GameStateStore()
    expect(s.selected).toBeUndefined()
    s.clickPiece({ clicked: Fu0, row: 6, column: 1 })
    s.clickPiece({ clicked: Empty, row: 6, column: 2 })
    expect(s.selected).not.toBeUndefined()
    expect(s.selected!!.row).toEqual(6)
    expect(s.selected!!.column).toEqual(1)
    expect(s.selected!!.piece).toEqual(Fu0)
    expect(phSpy).toBeCalledTimes(0)
    expect(khSpy).toBeCalledTimes(0)
    phSpy.mockRestore()
    khSpy.mockRestore()
  })

  it('選択ありで、動ける場所がクリックされたら配置を更新できる', async () => {
    const phSpy = jest.spyOn(PositionHandler, 'move')
    const khSpy = jest.spyOn(KifHandler, 'genKifString')
    const s = new GameStateStore()
    expect(s.selected).toBeUndefined()
    s.clickPiece({ clicked: Fu0, row: 6, column: 1 })
    s.clickPiece({ clicked: Empty, row: 5, column: 1 })
    expect(s.selected).toBeUndefined()
    expect(phSpy).toBeCalledTimes(1)
    expect(khSpy).toBeCalledTimes(1)
    phSpy.mockRestore()
    khSpy.mockRestore()
  })

  it('選択ありで、成・不成を選択できる場所がクリックされたら Confirm オブジェクトがセットされる', async () => {
    const phSpy = jest.spyOn(PositionHandler, 'move')
    const khSpy = jest.spyOn(KifHandler, 'genKifString')
    const s = new GameStateStore()
    expect(s.selected).toBeUndefined()
    s.pos.pos[6][1] = Empty
    s.pos.pos[3][1] = Fu0
    s.clickPiece({ clicked: Fu0, row: 3, column: 1 })
    s.clickPiece({ clicked: Fu1, row: 2, column: 1 })
    expect(s.selected).not.toBeUndefined()
    expect(s.selected!!.row).toEqual(3)
    expect(s.selected!!.column).toEqual(1)
    expect(s.selected!!.piece).toEqual(Fu0)
    expect(s.confirm).not.toBeUndefined()
    expect(s.confirm!!.row).toEqual(2)
    expect(s.confirm!!.column).toEqual(1)
    expect(s.confirm!!.preserved).toEqual(Fu0)
    expect(s.confirm!!.promoted).toEqual(To0)
    expect(phSpy).toBeCalledTimes(0)
    expect(khSpy).toBeCalledTimes(0)
    phSpy.mockRestore()
    khSpy.mockRestore()
  })

  it('成・不成を選択できる画面で、Confirm オブジェクト以外がクリックされたら何もしない', async () => {
    const phSpy = jest.spyOn(PositionHandler, 'move')
    const khSpy = jest.spyOn(KifHandler, 'genKifString')
    const s = new GameStateStore()
    expect(s.selected).toBeUndefined()
    s.pos.pos[6][1] = Empty
    s.pos.pos[3][1] = Fu0
    s.clickPiece({ clicked: Fu0, row: 3, column: 1 })
    s.clickPiece({ clicked: Fu1, row: 2, column: 1 })
    s.clickPiece({ clicked: Empty, row: 4, column: 4 })
    expect(s.selected).not.toBeUndefined()
    expect(s.selected!!.row).toEqual(3)
    expect(s.selected!!.column).toEqual(1)
    expect(s.selected!!.piece).toEqual(Fu0)
    expect(s.confirm).not.toBeUndefined()
    expect(s.confirm!!.row).toEqual(2)
    expect(s.confirm!!.column).toEqual(1)
    expect(s.confirm!!.preserved).toEqual(Fu0)
    expect(s.confirm!!.promoted).toEqual(To0)
    expect(phSpy).toBeCalledTimes(0)
    expect(khSpy).toBeCalledTimes(0)
    phSpy.mockRestore()
    khSpy.mockRestore()
  })

  it('成・不成を選択できる画面で、成ボタンがクリックされたら成れる', async () => {
    const phSpy = jest.spyOn(PositionHandler, 'move')
    const khSpy = jest.spyOn(KifHandler, 'genKifString')
    const s = new GameStateStore()
    expect(s.selected).toBeUndefined()
    s.pos.pos[6][1] = Empty
    s.pos.pos[3][1] = Fu0
    s.clickPiece({ clicked: Fu0, row: 3, column: 1 })
    s.clickPiece({ clicked: Fu1, row: 2, column: 1 })
    s.clickPiece({
      clicked: { promoted: To0, preserved: Fu0, row: 2, column: 1 },
      row: 2,
      column: 1,
      promote: true,
    })
    expect(phSpy).toBeCalledTimes(1)
    expect(khSpy).toBeCalledTimes(1)
    expect(s.pos.pos[3][1]).toEqual(Empty)
    expect(s.pos.pos[2][1]).toEqual(To0)
    phSpy.mockRestore()
    khSpy.mockRestore()
  })

  it('成・不成を選択できる画面で、不成ボタンがクリックされたらそのまま', async () => {
    const phSpy = jest.spyOn(PositionHandler, 'move')
    const khSpy = jest.spyOn(KifHandler, 'genKifString')
    const s = new GameStateStore()
    expect(s.selected).toBeUndefined()
    s.pos.pos[6][1] = Empty
    s.pos.pos[3][1] = Fu0
    s.clickPiece({ clicked: Fu0, row: 3, column: 1 })
    s.clickPiece({ clicked: Fu1, row: 2, column: 1 })
    s.clickPiece({
      clicked: { promoted: To0, preserved: Fu0, row: 2, column: 1 },
      row: 2,
      column: 1,
    })
    expect(phSpy).toBeCalledTimes(1)
    expect(khSpy).toBeCalledTimes(1)
    expect(s.pos.pos[3][1]).toEqual(Empty)
    expect(s.pos.pos[2][1]).toEqual(Fu0)
    phSpy.mockRestore()
    khSpy.mockRestore()
  })

  it('選択ありで、強制的に成必要があれば Confirm オブジェクトは出ず自動で移動される', async () => {
    const phSpy = jest.spyOn(PositionHandler, 'move')
    const khSpy = jest.spyOn(KifHandler, 'genKifString')
    const s = new GameStateStore()
    expect(s.selected).toBeUndefined()
    s.pos.pos[6][1] = Empty
    s.pos.pos[1][1] = Fu0
    s.clickPiece({ clicked: Fu0, row: 1, column: 1 })
    s.clickPiece({ clicked: Kei1, row: 0, column: 1 })
    expect(s.selected).toBeUndefined()
    expect(s.confirm).toBeUndefined()
    expect(phSpy).toBeCalledTimes(1)
    expect(khSpy).toBeCalledTimes(1)
    expect(s.pos.pos[1][1]).toEqual(Empty)
    expect(s.pos.pos[0][1]).toEqual(To0)
    phSpy.mockRestore()
    khSpy.mockRestore()
  })

  it('indexes を反転できる', async () => {
    const s = new GameStateStore()
    expect(s.indexes).toEqual([-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    s.reverse()
    expect(s.indexes).toEqual([9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -1])
  })

  it('棋譜の表示局面のインデックスを取得できる', async () => {
    const s = new GameStateStore()
    expect(s.currentKifIndex).toEqual(0)
    s.kif = mockKif()
    expect(s.currentKifIndex).toEqual(5)
  })
})
