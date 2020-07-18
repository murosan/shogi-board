import React from 'react'
import { Thinking } from '../model/engine/State'
import { defaultStore, Store } from '../store/Store'
import { shallow } from '../testutils/component-helper'
import App from './App'

it('レンダリングできる', () => {
  const wrapper = shallow(() => <App />)
  expect(wrapper.find('.App')).toHaveLength(1)
  expect(wrapper.find('.App-BoardOnly')).toHaveLength(1)
  expect(wrapper.find('.App-SideInfo')).toHaveLength(0)
  expect(wrapper.find('SideInfo')).toHaveLength(0)
  expect(wrapper.find('.AppContainer').html()).toContain('style="width:100%"')
})

it('将棋エンジンが思考中なら、SideInfo を表示する', async () => {
  const store: Store = defaultStore()
  await store.engineState.setState(Thinking)
  const wrapper = shallow(() => <App />, store)
  expect(wrapper.find('.App')).toHaveLength(1)
  expect(wrapper.find('.App-BoardOnly')).toHaveLength(0)
  expect(wrapper.find('.App-SideInfo')).toHaveLength(1)
  expect(wrapper.find('SideInfo')).toHaveLength(1)
})

it('ボードエリアの幅が指定されていたら style をつける', async () => {
  const store: Store = defaultStore()
  await store.config.setAppWidth(800)
  const wrapper = shallow(() => <App />, store)
  expect(wrapper.find('.App')).toHaveLength(1)
  expect(wrapper.find('.App-BoardOnly')).toHaveLength(1)
  expect(wrapper.find('SideInfo')).toHaveLength(0)
  expect(wrapper.find('.AppContainer').html()).toContain('style="width:800px"')
})

it('ボードエリアの幅によって Border-i クラスをつける', async () => {
  // isThinking, appWidth, BorderWidth
  type Case = [boolean, number | null, number]
  const cases: Case[] = [
    [false, null, 0],
    [false, 1500, 3],
    [false, 800, 2],
    [false, 700, 1],
    [true, null, 0],
    [true, 1000, 3],
    [true, 534, 2],
    [true, 533, 1],
  ]

  for (let [isThinking, appWidth, borderwidth] of cases) {
    const store: Store = defaultStore()
    if (isThinking) await store.engineState.setState(Thinking)
    if (appWidth) await store.config.setAppWidth(appWidth)
    const wrapper = shallow(() => <App />, store)
    expect(wrapper.find('.App')).toHaveLength(1)
    if (appWidth) expect(wrapper.find(`.Border-${borderwidth}`)).toHaveLength(1)
    else expect(wrapper.find(`.Border-${borderwidth}`)).toHaveLength(0)
  }
})
