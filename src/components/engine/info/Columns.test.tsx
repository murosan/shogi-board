import React from 'react'
import shortid from 'shortid'
import { Info } from '../../../model/engine/Info'
import { MoveProps } from '../../../model/events/MoveProps'
import { newKifu } from '../../../model/kifu/Kifu'
import { Move } from '../../../model/kifu/Move'
import { hirate } from '../../../model/shogi/InitialPositions'
import { Empty, Fu0, Fu1 } from '../../../model/shogi/Piece'
import { Gote } from '../../../model/shogi/Turn'
import { defaultStore } from '../../../store/Store'
import { shallow } from '../../../testutils/component-helper'
import Columns from './Columns'

it('思考結果が空なら表示なし', async () => {
  const store = defaultStore()
  const wrapper = shallow(() => <Columns />, store)
  expect(wrapper.find('.EngineInfoColumn')).toHaveLength(0)
})

it('評価値だけでも表示できる', async () => {
  const store = defaultStore()
  const score = -50000
  store.engineState.result = [info([], score)]
  const wrapper = shallow(() => <Columns />, store)
  expect(wrapper.find('.EngineInfoColumn')).toHaveLength(1)
  expect(wrapper.find('.EngineInfoRow')).toHaveLength(2)
  expect(wrapper.find('.EngineInfoRowLabel')).toHaveLength(2)
  expect(wrapper.find('.EngineInfoRowContent')).toHaveLength(1)
  expect(wrapper.text()).toContain(`${score}`)
  expect(wrapper.text()).toContain('読み')
})

it('思考結果も表示できる', async () => {
  const store = defaultStore()
  store.engineState.result = [
    info([
      {
        pos: store.gameState.currentMove.pos,
        source: { column: 6, row: 6 },
        dest: { column: 6, row: 5 },
        piece: Fu0,
      },
    ]),
  ]
  const wrapper = shallow(() => <Columns />, store)
  expect(wrapper.find('.EngineInfoColumn')).toHaveLength(1)
  expect(wrapper.find('.EngineInfoRow')).toHaveLength(2)
  expect(wrapper.find('.EngineInfoRowLabel')).toHaveLength(2)
  expect(wrapper.find('.EngineInfoRowContent')).toHaveLength(2)
  expect(wrapper.text()).toContain('読み')
  expect(wrapper.text()).toContain('７六歩')
})

it('`同　歩`のように3文字以上で表記される', async () => {
  const store = defaultStore()
  const pos = hirate()
  pos.pos[6][1] = Empty
  pos.pos[3][1] = Fu0 // 24に歩を置く
  pos.turn = Gote
  const move: Move = {
    index: 0,
    str: '24歩が置かれた局面',
    pos: pos,
    source: { row: 6, column: 1 }, // 盤上に存在しない場所にしておく
    dest: { row: 3, column: 1 },
    piece: 0,
  }
  const kifu = newKifu()
  kifu.history.moves[0] = move
  store.gameState.setKifu(kifu)
  store.engineState.result = [
    info([
      {
        pos: store.gameState.currentMove.pos,
        source: { column: 1, row: 2 },
        dest: { column: 1, row: 3 },
        piece: Fu1,
      },
    ]),
  ]
  const wrapper = shallow(() => <Columns />, store)
  expect(wrapper.find('.EngineInfoColumn')).toHaveLength(1)
  expect(wrapper.find('.EngineInfoRow')).toHaveLength(2)
  expect(wrapper.find('.EngineInfoRowLabel')).toHaveLength(2)
  expect(wrapper.find('.EngineInfoRowContent')).toHaveLength(2)
  expect(wrapper.text()).toContain('読み')
  expect(wrapper.text()).toContain('同　歩')
})

function info(moves: MoveProps[], score?: number): Info {
  return {
    id: shortid.generate(),
    values: new Map(),
    score: score || 100,
    moves,
  }
}
