import { shallow } from 'enzyme'
import React from 'react'
import GameStateStore from '../../store/GameStateStore'
import { Props as CapProps } from './Captures'
import RightSide from './RightSide'

it('レンダリングできる', async () => {
  const store: GameStateStore = new GameStateStore()
  const wrapper = shallow(<RightSide store={store} />).dive()
  expect(wrapper.find('.RightSide')).toHaveLength(1)
  const capProps = wrapper
    .find('inject-Captures-with-store')
    .props() as CapProps
  expect(capProps.isLeftSide).toBeFalsy()
  expect(capProps.isTurn).toBeTruthy()
  expect(capProps.captures).toEqual([0, 0, 0, 0, 0, 0, 0])
})

it('反転していてもレンダリングできる', async () => {
  const store: GameStateStore = new GameStateStore()
  store.reverse()
  const wrapper = shallow(<RightSide store={store} />).dive()
  expect(wrapper.find('.RightSide')).toHaveLength(1)
  const capProps = wrapper
    .find('inject-Captures-with-store')
    .props() as CapProps
  expect(capProps.isLeftSide).toBeFalsy()
  expect(capProps.isTurn).toBeFalsy()
  expect(capProps.captures).toEqual([0, 0, 0, 0, 0, 0, 0])
})
