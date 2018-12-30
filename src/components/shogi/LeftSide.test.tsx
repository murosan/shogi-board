import { shallow } from 'enzyme'
import React from 'react'
import GameStateStore from '../../store/GameStateStore'
import { Props as CapProps } from './Captures'
import LeftSide from './LeftSide'

it('レンダリングできる', async () => {
  const gs: GameStateStore = new GameStateStore()
  const wrapper = shallow(<LeftSide gs={gs} />).dive()
  expect(wrapper.find('.LeftSide')).toHaveLength(1)
  const capProps = wrapper.find('inject-Captures-with-gs').props() as CapProps
  expect(capProps.isLeftSide).toBeTruthy()
  expect(capProps.isTurn).toBeFalsy()
  expect(capProps.captures).toEqual([0, 0, 0, 0, 0, 0, 0])
})

it('反転していてもレンダリングできる', async () => {
  const gs: GameStateStore = new GameStateStore()
  gs.reverse()
  const wrapper = shallow(<LeftSide gs={gs} />).dive()
  expect(wrapper.find('.LeftSide')).toHaveLength(1)
  const capProps = wrapper.find('inject-Captures-with-gs').props() as CapProps
  expect(capProps.isLeftSide).toBeTruthy()
  expect(capProps.isTurn).toBeTruthy()
  expect(capProps.captures).toEqual([0, 0, 0, 0, 0, 0, 0])
})
