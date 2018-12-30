import { mount } from 'enzyme'
import { Provider } from 'mobx-react'
import React from 'react'
import GameStateStore from '../../store/GameStateStore'
import Board from './Board'

it('レンダリングできる', async () => {
  const gs: GameStateStore = new GameStateStore()
  const wrapper = mount(
    <Provider gs={gs}>
      <Board />
    </Provider>
  )
  expect(wrapper.find('.BoardContainer')).toHaveLength(1)
  expect(wrapper.find('.Board')).toHaveLength(1)
  const cells = wrapper.find('Cell')
  expect(cells).toHaveLength(121)
  wrapper.unmount()
})
