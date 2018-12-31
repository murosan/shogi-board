import { shallow } from 'enzyme'
import React from 'react'
import GameStateStore, { Store } from '../../store/GameStateStore'
import { mockKif, mockKif2 } from '../../testutils/mockKif'
import Kif from './Kif'

it('棋譜をレンダリングできる', async () => {
  const store: Store = new GameStateStore()
  store.kif = mockKif() // 分岐ありの棋譜
  const wrapper = shallow(<Kif store={store} />).dive()
  expect(wrapper.find('.KifContainer')).toHaveLength(1)
  expect(wrapper.find('.Move')).toHaveLength(6)
  expect(wrapper.find('.Branch')).toHaveLength(2)
})

it('分岐で先頭の Move しかなくてもクラッシュしない', async () => {
  const store: Store = new GameStateStore()
  store.kif = mockKif2()
  const wrapper = shallow(<Kif store={store} />).dive()
  expect(wrapper.find('.KifContainer')).toHaveLength(1)
  expect(wrapper.find('.Move')).toHaveLength(4)
  expect(wrapper.find('.Branch')).toHaveLength(1)
})
