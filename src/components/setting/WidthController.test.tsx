import React from 'react'
import { Store } from '../../model/store/Store'
import { DefaultStore } from '../../store/Store'
import { mount } from '../../testutils/component-helper'
import WidthController from './WidthController'

const getSelection = jest.fn()
window.getSelection = jest.fn()

let eventMap: any = {}

const getElementById = jest.fn()
const mockRootDom = { clientWidth: 1000 }

beforeEach(() => {
  getSelection.mockClear()
  getElementById.mockClear()
  eventMap = {}
  window.document.addEventListener = jest.fn(
    (event, cb) => (eventMap[event] = cb)
  )
  window.document.getElementById = getElementById
  getElementById.mockImplementation(id => mockRootDom)
})

it('ボードエリアの幅を変更できる', () => {
  const store: Store = new DefaultStore()
  const { config, displayState } = store
  const wrapper = mount(() => <WidthController />, store)
  expect(config.appWidth).toBeNull()

  const moveTo = (n: number) => {
    wrapper
      .find('.WidthController')
      .simulate('mouseDown', { clientX: 300, clientY: 300 })
    expect(displayState.resizing).toBeTruthy()
    eventMap['mousemove']({ clientX: n })
    eventMap['mouseup']()
    expect(displayState.resizing).toBeFalsy()
  }

  moveTo(900) // 100px 左に動かした
  expect(config.appWidth).toEqual(800)

  moveTo(950) // 50px 右に動かした
  expect(config.appWidth).toEqual(900)

  moveTo(1000) // 50px 右に動かし、一番右に戻した
  expect(config.appWidth).toBeNull()

  moveTo(1200) // 右側を突き抜けることはできない
  expect(config.appWidth).toBeNull()

  // mouseDown せずに mouseMove しても動かない
  eventMap['mousemove']({ clientX: 800 })
  eventMap['mouseup']()
  expect(config.appWidth).toBeNull()
})
