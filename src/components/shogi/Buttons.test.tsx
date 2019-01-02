import { shallow } from 'enzyme'
import React from 'react'
import GameStateStore from '../../store/GameStateStore'
import Buttons from './Buttons'

it('レンダリングできる', async () => {
  const store: GameStateStore = new GameStateStore()
  const wrapper = shallow(<Buttons store={store} />).dive()
  expect(wrapper.find('.ButtonsContainer')).toHaveLength(1)
})

it('盤面反転ボタンを押すと store の reverse が実行される', async () => {
  const store: GameStateStore = new GameStateStore()
  store.reverse = jest.fn()
  const wrapper = shallow(<Buttons store={store} />).dive()

  expect(store.reverse).toBeCalledTimes(0)
  const rev = wrapper.find('.Reverse').simulate('click')
  expect(store.reverse).toBeCalledTimes(1)
})
