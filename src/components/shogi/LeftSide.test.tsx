import { mount } from 'enzyme'
import { Provider } from 'mobx-react'
import React from 'react'
import GameStateStore from '../../store/GameStateStore'
import { Props as CapProps } from './Captures'
import LeftSide from './LeftSide'

it('レンダリングできる', async () => {
  const gs: GameStateStore = new GameStateStore()
  const wrapper = mount(
    <Provider gs={gs}>
      <LeftSide />
    </Provider>
  )
  expect(wrapper.find('.LeftSide')).toHaveLength(1)
  const capProps = wrapper.find('Captures').props() as CapProps
  expect(capProps.isLeftSide).toBeTruthy()
  expect(capProps.isTurn).toBeFalsy()
  expect(capProps.captures).toEqual([0, 0, 0, 0, 0, 0, 0])
  wrapper.unmount()
})

it('反転していてもレンダリングできる', async () => {
  const gs: GameStateStore = new GameStateStore()
  gs.reverse()
  const wrapper = mount(
    <Provider gs={gs}>
      <LeftSide />
    </Provider>
  )
  expect(wrapper.find('.LeftSide')).toHaveLength(1)
  const capProps = wrapper.find('Captures').props() as CapProps
  expect(capProps.isLeftSide).toBeTruthy()
  expect(capProps.isTurn).toBeTruthy()
  expect(capProps.captures).toEqual([0, 0, 0, 0, 0, 0, 0])
  wrapper.unmount()
})
