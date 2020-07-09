import React from 'react'
import { MockupHidden } from '../../model/display/MockupState'
import { Store } from '../../store/Store'
import { defaultStore } from '../../store/Store'
import { mount, shallow } from '../../testutils/component-helper'
import Setting from './Setting'

it('閉じることができる', () => {
  const store: Store = defaultStore()
  store.displayState.setMockupState = jest.fn()
  const wrapper = shallow(() => <Setting />, store)
  wrapper.find('CloseButton').simulate('click')
  expect(store.displayState.setMockupState).toHaveBeenCalledWith(MockupHidden)
})

it('serverURL を表示 & 更新できる', () => {
  const store: Store = defaultStore()
  const { config } = store
  const url = 'http://localhost/test/serverURL'
  config.serverURL = url
  config.setServerURL = jest.fn()
  const wrapper = shallow(() => <Setting />, store)

  const input = wrapper.find('Text').dive().find('.FormTextInput')
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
  const checkbox = () => wrapper.find('Check').at(0)
  expect(checkbox().prop('value')).toBeTruthy()
  expect(config.paintTargets).toBeTruthy()
  wrapper
    .find('#FormCheck-PaintTargets')
    .simulate('change', { target: { checked: false } })
  expect(config.paintTargets).toBeFalsy()
  expect(checkbox().prop('value')).toBeFalsy()
})

it('設定を保存するチェックを切り替えることができる', () => {
  const store: Store = defaultStore()
  const { config } = store
  const wrapper = mount(() => <Setting />, store)
  const checkbox = () => wrapper.find('Check').at(1)
  expect(checkbox().prop('value')).toBeFalsy()
  expect(config.saveToLocalStorage).toBeFalsy()
  wrapper
    .find('#FormCheck-SaveToLocalStorage')
    .simulate('change', { target: { checked: true } })
  wrapper.update()
  expect(config.saveToLocalStorage).toBeTruthy()
  expect(checkbox().prop('value')).toBeTruthy()
})

it('ボードエリアの幅を記憶するチェックを切り替えることができる', () => {
  const store: Store = defaultStore()
  const { config } = store
  const wrapper = mount(() => <Setting />, store)
  const checkbox = () => wrapper.find('Check').at(2)
  expect(checkbox().prop('value')).toBeFalsy()
  expect(config.saveBoardWidth).toBeFalsy()
  wrapper
    .find('#FormCheck-SaveBoardWidth')
    .simulate('change', { target: { checked: true } })
  wrapper.update()
  expect(config.saveBoardWidth).toBeTruthy()
  expect(checkbox().prop('value')).toBeTruthy()
})
