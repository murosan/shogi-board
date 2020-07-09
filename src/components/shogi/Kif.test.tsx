import React from 'react'
import pushMove from '../../lib/kif-handler/pushMove'
import { hirate } from '../../model/shogi/PositionInit'
import { Store } from '../../store/Store'
import { defaultStore } from '../../store/Store'
import { mount, shallow } from '../../testutils/component-helper'
import { mockKif, mockKif2 } from '../../testutils/mockKif'
import Kif from './Kif'

it('棋譜をレンダリングできる', async () => {
  const store: Store = defaultStore()
  store.gameState.kif = mockKif() // 分岐ありの棋譜
  const wrapper = shallow(() => <Kif />, store)
  expect(wrapper.find('.KifContainer')).toHaveLength(1)
  expect(wrapper.find('.Move')).toHaveLength(6)
  expect(wrapper.find('.Branch')).toHaveLength(2)
})

it('分岐で先頭の Move しかなくてもクラッシュしない', async () => {
  const store: Store = defaultStore()
  store.gameState.kif = mockKif2()
  const wrapper = shallow(() => <Kif />, store)
  expect(wrapper.find('.KifContainer')).toHaveLength(1)
  expect(wrapper.find('.Move')).toHaveLength(4)
  expect(wrapper.find('.Branch')).toHaveLength(1)
})

it('棋譜をクリックすると Store のメソッドが呼ばれる', async () => {
  const store: Store = defaultStore()
  store.gameState.clickKif = jest.fn()
  store.gameState.kif = mockKif() // 分岐ありの棋譜
  const wrapper = shallow(() => <Kif />, store)
  expect(store.gameState.clickKif).toBeCalledTimes(0)
  wrapper.find('.Move').first().simulate('click')
  expect(store.gameState.clickKif).toBeCalledTimes(1)
  expect(store.gameState.clickKif).toBeCalledWith(0)
})

it('分岐をクリックすると Store のメソッドが呼ばれる', async () => {
  const store: Store = defaultStore()
  store.gameState.clickKif = jest.fn()
  store.gameState.kif = mockKif() // 分岐ありの棋譜
  const wrapper = shallow(() => <Kif />, store)
  expect(store.gameState.clickKif).toBeCalledTimes(0)
  wrapper.find('.Branch').at(1).simulate('click')
  expect(store.gameState.clickKif).toBeCalledTimes(1)
  expect(store.gameState.clickKif).toBeCalledWith(3, 2)
})

// FIXME: カバレッジの変化で呼ばれたことを確認しただけ
it('更新が入ると componentDidUpdate が呼ばれる', async () => {
  const store: Store = defaultStore()
  const wrapper = mount(() => <Kif />, store)
  expect(wrapper.find('.Move')).toHaveLength(1)
  store.gameState.kif = pushMove(store.gameState.kif, {
    index: 1,
    str: 'mock',
    pos: hirate(),
    piece: 0,
    source: { row: 0, column: 0 },
    dest: { row: 0, column: 0 },
  })
  wrapper.update() // なんかうまく更新されなかったので、強制更新
  expect(wrapper.find('.KifContainer')).toHaveLength(1)
  expect(wrapper.find('.Move')).toHaveLength(2) // 棋譜は増えている
})
