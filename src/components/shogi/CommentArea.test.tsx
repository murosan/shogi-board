import React from 'react'
import getCurrent from '../../handler/kifu/getCurrent'
import { defaultStore, Store } from '../../store/Store'
import { mount } from '../../testutils/component-helper'
import { mockKifu } from '../../testutils/mockKifu'
import CommentArea from './CommentArea'

it('レンダリングできる', async () => {
  const store: Store = defaultStore()
  store.displayState.setShowCommentArea(true)

  const text = 'コメントテスト'
  const kifu = mockKifu()
  const current = getCurrent(kifu)
  current.comment = text
  store.gameState.setKifu(kifu)

  const wrapper = mount(() => <CommentArea />, store)
  expect(wrapper.find('.CommentArea')).toHaveLength(1)
  expect(wrapper.find('textarea').text()).toContain(text)
})

it('コメントがなくてもコメントエリアは表示されている', async () => {
  const store: Store = defaultStore()
  store.displayState.setShowCommentArea(true)

  const kifu = mockKifu()
  store.gameState.setKifu(kifu)

  const wrapper = mount(() => <CommentArea />, store)
  expect(wrapper.find('.CommentArea')).toHaveLength(1)
  expect(wrapper.find('textarea').text()).toEqual('')
})

it('showCommentAreaがfalseならコメントエリアは表示されない', async () => {
  const store: Store = defaultStore()
  const kifu = mockKifu()
  store.gameState.setKifu(kifu)

  const wrapper = mount(() => <CommentArea />, store)
  expect(wrapper.find('.CommentArea')).toHaveLength(0)
})
