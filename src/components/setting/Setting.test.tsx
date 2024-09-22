import React from 'react'
import { Store } from '../../store/Store'
import { defaultStore } from '../../store/Store'
import { mount, shallow } from '../../testutils/component-helper'
import Setting from './Setting'

it('閉じることができる', () => {
  const store: Store = defaultStore()
  store.displayState.closeMockup = jest.fn()
  const wrapper = shallow(() => <Setting />, store)
  wrapper.find('CloseButton').simulate('click')
  expect(store.displayState.closeMockup).toHaveBeenCalled()
})

it('serverURL を表示 & 更新できる', () => {
  const store: Store = defaultStore()
  const { config } = store
  const url = 'http://localhost/test/serverURL'
  config.setServerURL(url)
  config.setServerURL = jest.fn()
  const wrapper = shallow(() => <Setting />, store)

  const input = wrapper.find('Memo(Text)').dive().find('.FormTextInput')
  expect(input.prop('value')).toEqual(url)

  const updatedURL = `${url}/after`
  input.simulate('change', { target: { value: updatedURL } })
  expect(input.prop('value')).toEqual(url)
  expect(config.setServerURL).toBeCalledWith(updatedURL)
})

it('着色設定のチェックを切り替えることができる', () => {
  const store: Store = defaultStore()
  const { config } = store
  const wrapper = mount(() => <Setting />, store)
  const checkbox = () => wrapper.find('Memo(Check)').at(0)
  expect(checkbox().prop('value')).toBeTruthy()
  expect(config.paintTargets).toBeTruthy()
  wrapper
    .find('#FormCheck-PaintTargets')
    .simulate('change', { target: { checked: false } })
  expect(config.paintTargets).toBeFalsy()
  expect(checkbox().prop('value')).toBeFalsy()
})

it('ボードエリアの幅を記憶するチェックを切り替えることができる', () => {
  const store: Store = defaultStore()
  const { config } = store
  const wrapper = mount(() => <Setting />, store)
  const checkbox = () => wrapper.find('Memo(Check)').at(2)
  expect(checkbox().prop('value')).toBeFalsy()
  expect(config.boardWidth.save).toBeFalsy()
  wrapper
    .find('#FormCheck-SaveBoardWidth')
    .simulate('change', { target: { checked: true } })
  wrapper.update()
  expect(config.boardWidth.save).toBeTruthy()
  expect(checkbox().prop('value')).toBeTruthy()
})
