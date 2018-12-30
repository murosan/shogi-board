import { mount } from 'enzyme'
import { Provider } from 'mobx-react'
import React from 'react'
import GameStateStore from '../../store/GameStateStore'
import { Props as CapProps } from './Captures'
import RightSide from './RightSide'

it('レンダリングできる', async () => {
  const gs: GameStateStore = new GameStateStore()
  const wrapper = mount(
    <Provider gs={gs}>
      <RightSide />
    </Provider>
  )
  expect(wrapper.find('.RightSide')).toHaveLength(1)
  const capProps = wrapper.find('Captures').props() as CapProps
  expect(capProps.isLeftSide).toBeFalsy()
  expect(capProps.isTurn).toBeTruthy()
  expect(capProps.captures).toEqual([0, 0, 0, 0, 0, 0, 0])
})

it('反転していてもレンダリングできる', async () => {
  const gs: GameStateStore = new GameStateStore()
  gs.reverse()
  const wrapper = mount(
    <Provider gs={gs}>
      <RightSide />
    </Provider>
  )
  expect(wrapper.find('.RightSide')).toHaveLength(1)
  const capProps = wrapper.find('Captures').props() as CapProps
  expect(capProps.isLeftSide).toBeFalsy()
  expect(capProps.isTurn).toBeFalsy()
  expect(capProps.captures).toEqual([0, 0, 0, 0, 0, 0, 0])
})
