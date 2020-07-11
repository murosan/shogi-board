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
