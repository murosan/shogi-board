import React from 'react'
import { HandicapKinds } from '../../model/shogi/InitialPositions'
import { defaultStore, Store } from '../../store/Store'
import { shallow } from '../../testutils/component-helper'
import UserInfo from './UserInfo'

const name = 'なまえ'

it('プレーヤー名がなければ中身なし', async () => {
  const wrapper = shallow(() => <UserInfo isRightSide={true} />)
  expect(wrapper.find('.UserInfo')).toHaveLength(0)
})

it('反転していないとき、先手のプレーヤー名を表示できる', async () => {
  const store: Store = defaultStore()
  store.gameState.kifu.meta.player.sente = name
  const wrapper = shallow(() => <UserInfo isRightSide={true} />, store)
  expect(wrapper.find('.UserInfo')).toHaveLength(1)
  expect(wrapper.find('.UserNameBottom')).toHaveLength(1)
  expect(wrapper.text()).toContain('先手')
  expect(wrapper.text()).toContain(name)
})

it('反転しているとき、先手のプレーヤー名を表示できる', async () => {
  const store: Store = defaultStore()
  store.gameState.kifu.meta.player.sente = name
  store.gameState.reverse()
  const wrapper = shallow(() => <UserInfo isRightSide={false} />, store)
  expect(wrapper.find('.UserInfo')).toHaveLength(1)
  expect(wrapper.find('.UserNameTop')).toHaveLength(1)
  expect(wrapper.text()).toContain('先手')
  expect(wrapper.text()).toContain(name)
})

it('反転していないとき、後手のプレーヤー名を表示できる', async () => {
  const store: Store = defaultStore()
  store.gameState.kifu.meta.player.gote = name
  const wrapper = shallow(() => <UserInfo isRightSide={false} />, store)
  expect(wrapper.find('.UserInfo')).toHaveLength(1)
  expect(wrapper.find('.UserNameTop')).toHaveLength(1)
  expect(wrapper.text()).toContain('後手')
  expect(wrapper.text()).toContain(name)
})

it('反転しているとき、後手のプレーヤー名を表示できる', async () => {
  const store: Store = defaultStore()
  store.gameState.kifu.meta.player.gote = name
  store.gameState.reverse()
  const wrapper = shallow(() => <UserInfo isRightSide={true} />, store)
  expect(wrapper.find('.UserInfo')).toHaveLength(1)
  expect(wrapper.find('.UserNameBottom')).toHaveLength(1)
  expect(wrapper.text()).toContain('後手')
  expect(wrapper.text()).toContain(name)
})

it('下手のプレーヤー名を表示できる', async () => {
  const store: Store = defaultStore()
  store.gameState.kifu.meta.player.sente = name
  store.gameState.kifu.meta.handicap = HandicapKinds.kyouOti
  const wrapper = shallow(() => <UserInfo isRightSide={true} />, store)
  expect(wrapper.find('.UserInfo')).toHaveLength(1)
  expect(wrapper.find('.UserNameBottom')).toHaveLength(1)
  expect(wrapper.text()).toContain('下手')
  expect(wrapper.text()).toContain(name)
})

it('上手のプレーヤー名を表示できる', async () => {
  const store: Store = defaultStore()
  store.gameState.kifu.meta.player.gote = name
  store.gameState.kifu.meta.handicap = HandicapKinds.kyouOti
  const wrapper = shallow(() => <UserInfo isRightSide={false} />, store)
  expect(wrapper.find('.UserInfo')).toHaveLength(1)
  expect(wrapper.find('.UserNameTop')).toHaveLength(1)
  expect(wrapper.text()).toContain('上手')
  expect(wrapper.text()).toContain(name)
})
