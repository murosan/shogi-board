import React from 'react'
import shortid from 'shortid'
import { Info } from '../../../model/engine/Info'
import { MoveProps } from '../../../model/events/MoveProps'
import { Fu0 } from '../../../model/shogi/Piece'
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
  expect(wrapper.text()).toContain(score)
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

function info(moves: MoveProps[], score?: number): Info {
  return {
    id: shortid.generate(),
    values: new Map(),
    score: score || 100,
    moves,
  }
}
