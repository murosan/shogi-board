import { shallow } from 'enzyme'
import React from 'react'
import GameStateStore from '../../store/GameStateStore'
import Buttons from './Buttons'

it('レンダリングできる', async () => {
  const store: GameStateStore = new GameStateStore()
  const wrapper = shallow(<Buttons store={store} />).dive()
  expect(wrapper.find('.ButtonsContainer')).toHaveLength(1)
})
