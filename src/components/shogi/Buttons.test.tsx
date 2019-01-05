import { shallow } from 'enzyme'
import React from 'react'
import GameStateStore from '../../store/GameStateStore'
import { mockKif } from '../../testutils/mockKif'
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
  wrapper.find('.Reverse').simulate('click')
  expect(store.reverse).toBeCalledTimes(1)
})

it('一手前に変更ボタンを押すと store の clickKif が実行される', async () => {
  const store: GameStateStore = new GameStateStore()
  store.clickKif = jest.fn()
  const wrapper = shallow(<Buttons store={store} />).dive()

  expect(store.clickKif).toBeCalledTimes(0)
  wrapper.find('.PrevOne').simulate('click')
  expect(store.clickKif).toBeCalledTimes(1)
  expect(store.clickKif).toBeCalledWith(0)
})

it('一手前に変更ボタンを押すと store の clickKif が実行される2', async () => {
  const store: GameStateStore = new GameStateStore()
  store.kif = mockKif()
  store.clickKif = jest.fn()
  const wrapper = shallow(<Buttons store={store} />).dive()

  expect(store.clickKif).toBeCalledTimes(0)
  wrapper.find('.PrevOne').simulate('click')
  expect(store.clickKif).toBeCalledTimes(1)
  expect(store.clickKif).toBeCalledWith(4)
})

it('一手後に変更ボタンを押すと store の clickKif が実行される', async () => {
  const store: GameStateStore = new GameStateStore()
  store.clickKif = jest.fn()
  const wrapper = shallow(<Buttons store={store} />).dive()

  expect(store.clickKif).toBeCalledTimes(0)
  wrapper.find('.NextOne').simulate('click')
  expect(store.clickKif).toBeCalledTimes(1)
  expect(store.clickKif).toBeCalledWith(1)
})

it('五手前に変更ボタンを押すと store の clickKif が実行される', async () => {
  const store: GameStateStore = new GameStateStore()
  store.clickKif = jest.fn()
  const wrapper = shallow(<Buttons store={store} />).dive()

  expect(store.clickKif).toBeCalledTimes(0)
  wrapper.find('.PrevFive').simulate('click')
  expect(store.clickKif).toBeCalledTimes(1)
  expect(store.clickKif).toBeCalledWith(0)
})

it('五手前に変更ボタンを押すと store の clickKif が実行される2', async () => {
  const store: GameStateStore = new GameStateStore()
  store.kif = mockKif()
  store.clickKif = jest.fn()
  const wrapper = shallow(<Buttons store={store} />).dive()

  expect(store.clickKif).toBeCalledTimes(0)
  wrapper.find('.PrevFive').simulate('click')
  expect(store.clickKif).toBeCalledTimes(1)
  expect(store.clickKif).toBeCalledWith(0)
})

it('五手後に変更ボタンを押すと store の clickKif が実行される', async () => {
  const store: GameStateStore = new GameStateStore()
  store.kif = mockKif()
  store.clickKif = jest.fn()
  const wrapper = shallow(<Buttons store={store} />).dive()

  expect(store.clickKif).toBeCalledTimes(0)
  wrapper.find('.NextFive').simulate('click')
  expect(store.clickKif).toBeCalledTimes(1)
  expect(store.clickKif).toBeCalledWith(10)
})

it('先頭に変更ボタンを押すと store の clickKif が実行される', async () => {
  const store: GameStateStore = new GameStateStore()
  store.kif = mockKif()
  store.clickKif = jest.fn()
  const wrapper = shallow(<Buttons store={store} />).dive()

  expect(store.clickKif).toBeCalledTimes(0)
  wrapper.find('.ToHead').simulate('click')
  expect(store.clickKif).toBeCalledTimes(1)
  expect(store.clickKif).toBeCalledWith(0)
})

it('最後に変更ボタンを押すと store の clickKif が実行される', async () => {
  const store: GameStateStore = new GameStateStore()
  store.kif = mockKif()
  store.clickKif = jest.fn()
  const wrapper = shallow(<Buttons store={store} />).dive()

  expect(store.clickKif).toBeCalledTimes(0)
  wrapper.find('.ToLast').simulate('click')
  expect(store.clickKif).toBeCalledTimes(1)
  expect(store.clickKif).toBeCalledWith(100000)
})

// clipboard.js の仕事なのでカバーだけしておく
it('棋譜コピーボタンを押せる', async () => {
  const store: GameStateStore = new GameStateStore()
  const wrapper = shallow(<Buttons store={store} />).dive()
  wrapper.find('.Copy').simulate('click')
})
