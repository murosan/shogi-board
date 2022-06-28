import React from 'react'
import { defaultStore, Store } from '../../store/Store'
import { mount, shallow } from '../../testutils/component-helper'
import { flushPromises } from '../../testutils/flush-promises'
import KifuMockup from './KifuMockup'

jest.useFakeTimers()

beforeEach(() => {
  Object.assign(navigator, {
    clipboard: {
      writeText: () => {},
      readText: () => {},
    },
  })
})

it('閉じることができる', () => {
  const store: Store = defaultStore()
  store.displayState.closeMockup = jest.fn()
  const wrapper = shallow(() => <KifuMockup />, store)
  wrapper.find('CloseButton').simulate('click')
  expect(store.displayState.closeMockup).toHaveBeenCalled()
})

it('クリップボードにコピーできる', async () => {
  const store: Store = defaultStore()
  const wrapper = shallow(() => <KifuMockup />, store)
  jest.spyOn(navigator.clipboard, 'writeText')

  expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(0)
  wrapper.find('Memo(Button)').at(0).simulate('click')
  await flushPromises()
  expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1)
})

it('読み込める', async () => {
  const store: Store = defaultStore()
  store.gameState.setKifu = jest.fn()
  store.displayState.closeMockup = jest.fn()
  const text = '1 ７六歩(77)   ( 0:00/00:00:00)'
  const wrapper = mount(() => <KifuMockup />, store)
  wrapper.find('textarea').simulate('change', { target: { value: text } })

  wrapper.find('Memo(Button)').at(1).simulate('click')
  await flushPromises()

  expect(store.gameState.setKifu).toBeCalled()
  expect(store.displayState.closeMockup).toBeCalled()
})

it('入力がなかったらalertを出す', async () => {
  const store: Store = defaultStore()
  store.gameState.setKifu = jest.fn()
  store.displayState.closeMockup = jest.fn()
  const wrapper = mount(() => <KifuMockup />, store)

  wrapper.find('Memo(Button)').at(1).simulate('click')
  await flushPromises()

  expect(wrapper.text()).toContain('入力がありません')
  expect(store.gameState.setKifu).toBeCalledTimes(0)
  expect(store.displayState.closeMockup).toBeCalledTimes(0)
})

it('読み込むとき、棋譜のパースに失敗したらalertを出す', async () => {
  const store: Store = defaultStore()
  store.gameState.setKifu = jest.fn()
  store.displayState.closeMockup = jest.fn()
  const text = '棋譜ではないテキスト'
  const wrapper = mount(() => <KifuMockup />, store)
  wrapper.find('textarea').simulate('change', { target: { value: text } })

  wrapper.find('Memo(Button)').at(1).simulate('click')
  await flushPromises()

  expect(wrapper.text()).toContain('読み込みに失敗しました。')
  expect(store.gameState.setKifu).toBeCalledTimes(0)
  expect(store.displayState.closeMockup).toBeCalledTimes(0)
})
