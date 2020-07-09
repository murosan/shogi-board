import React from 'react'
import { Store } from '../../model/store/Store'
import { DefaultStore } from '../../store/Store'
import { shallow } from '../../testutils/component-helper'
import { mockKif } from '../../testutils/mockKif'
import Buttons from './Buttons'

it('レンダリングできる', async () => {
  const wrapper = shallow(() => <Buttons />)
  expect(wrapper.find('.ButtonsContainer')).toHaveLength(1)
})

it('盤面反転ボタンを押すと store の reverse が実行される', async () => {
  const store: Store = new DefaultStore()
  store.gameState.reverse = jest.fn()
  const wrapper = shallow(() => <Buttons />, store)

  expect(store.gameState.reverse).toBeCalledTimes(0)
  wrapper.find('.Reverse').simulate('click')
  expect(store.gameState.reverse).toBeCalledTimes(1)
})

it('一手前に変更ボタンを押すと store の clickKif が実行される', async () => {
  const store: Store = new DefaultStore()
  store.gameState.clickKif = jest.fn()
  const wrapper = shallow(() => <Buttons />, store)

  expect(store.gameState.clickKif).toBeCalledTimes(0)
  wrapper.find('.PrevOne').simulate('click')
  expect(store.gameState.clickKif).toBeCalledTimes(1)
  expect(store.gameState.clickKif).toBeCalledWith(0)
})

it('一手前に変更ボタンを押してもエラーにならない', async () => {
  const store: Store = new DefaultStore()
  const wrapper = shallow(() => <Buttons />, store)
  wrapper.find('.PrevOne').simulate('click')
})

it('一手前に変更ボタンを押すと store の clickKif が実行される2', async () => {
  const store: Store = new DefaultStore()
  store.gameState.kif = mockKif()
  store.gameState.clickKif = jest.fn()
  const wrapper = shallow(() => <Buttons />, store)

  expect(store.gameState.clickKif).toBeCalledTimes(0)
  wrapper.find('.PrevOne').simulate('click')
  expect(store.gameState.clickKif).toBeCalledTimes(1)
  expect(store.gameState.clickKif).toBeCalledWith(4)
})

it('一手後に変更ボタンを押すと store の clickKif が実行される', async () => {
  const store: Store = new DefaultStore()
  store.gameState.clickKif = jest.fn()
  const wrapper = shallow(() => <Buttons />, store)

  expect(store.gameState.clickKif).toBeCalledTimes(0)
  wrapper.find('.NextOne').simulate('click')
  expect(store.gameState.clickKif).toBeCalledTimes(1)
  expect(store.gameState.clickKif).toBeCalledWith(1)
})

it('五手前に変更ボタンを押すと store の clickKif が実行される', async () => {
  const store: Store = new DefaultStore()
  store.gameState.clickKif = jest.fn()
  const wrapper = shallow(() => <Buttons />, store)

  expect(store.gameState.clickKif).toBeCalledTimes(0)
  wrapper.find('.PrevFive').simulate('click')
  expect(store.gameState.clickKif).toBeCalledTimes(1)
  expect(store.gameState.clickKif).toBeCalledWith(0)
})

it('五手前に変更ボタンを押すと store の clickKif が実行される2', async () => {
  const store: Store = new DefaultStore()
  store.gameState.kif = mockKif()
  store.gameState.clickKif = jest.fn()
  const wrapper = shallow(() => <Buttons />, store)

  expect(store.gameState.clickKif).toBeCalledTimes(0)
  wrapper.find('.PrevFive').simulate('click')
  expect(store.gameState.clickKif).toBeCalledTimes(1)
  expect(store.gameState.clickKif).toBeCalledWith(0)
})

it('五手後に変更ボタンを押すと store の clickKif が実行される', async () => {
  const store: Store = new DefaultStore()
  store.gameState.kif = mockKif()
  store.gameState.clickKif = jest.fn()
  const wrapper = shallow(() => <Buttons />, store)

  expect(store.gameState.clickKif).toBeCalledTimes(0)
  wrapper.find('.NextFive').simulate('click')
  expect(store.gameState.clickKif).toBeCalledTimes(1)
  expect(store.gameState.clickKif).toBeCalledWith(10)
})

// clipboard.js の仕事なのでカバーだけしておく
it('棋譜コピーボタンを押せる', async () => {
  const wrapper = shallow(() => <Buttons />)
  wrapper.find('.Copy').simulate('click')
})
