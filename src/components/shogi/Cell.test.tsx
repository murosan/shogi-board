import React from 'react'
import {
  Empty,
  Fu0,
  Fu1,
  Kaku0,
  Kaku1,
  Kyou1,
  To0,
} from '../../model/shogi/Piece'
import { Store } from '../../store/Store'
import { defaultStore } from '../../store/Store'
import { mount, shallow } from '../../testutils/component-helper'
import Cell from './Cell'

it('正しいクラス名を付けられる', async () => {
  const store: Store = defaultStore()
  // 先手の駒
  const wrapper1 = shallow(() => <Cell row={6} column={1} />, store)
  const wrapper2 = shallow(() => <Cell row={7} column={7} />, store)
  const className1 = `Cell Piece Piece-Bordered Piece-${Fu0} Piece-Turn`
  const className2 = `Cell Piece Piece-Bordered Piece-${Kaku0} Piece-Turn`
  // 後手の駒
  const wrapper3 = shallow(() => <Cell row={2} column={7} />, store)
  const wrapper4 = shallow(() => <Cell row={1} column={1} />, store)
  const className3 = `Cell Piece Piece-Bordered Piece-${Fu1}`
  const className4 = `Cell Piece Piece-Bordered Piece-${Kaku1}`
  // 星
  const wrapper5 = shallow(() => <Cell row={2} column={6} />, store)
  const wrapper6 = shallow(() => <Cell row={2} column={3} />, store)
  const wrapper7 = shallow(() => <Cell row={5} column={6} />, store)
  const wrapper8 = shallow(() => <Cell row={5} column={3} />, store)
  const className5 = `Cell Piece Piece-Bordered Piece-${Fu1} Piece-Star`
  const className7 = `Cell Piece Piece-Bordered Piece-Star`
  // 駒の中で、最上段・一番左
  const wrapper9 = shallow(() => <Cell row={0} column={8} />, store)
  const className9 = `Cell Piece Piece-Bordered Piece-${Kyou1} Piece-Left Piece-Top`
  // EdgeText
  const wrapper10 = shallow(() => <Cell row={-1} column={0} />, store)
  const wrapper11 = shallow(() => <Cell row={0} column={-1} />, store)
  const className10 = `Cell Cell-Edge`

  expect(wrapper1.prop('className')).toBe(className1)
  expect(wrapper2.prop('className')).toBe(className2)
  expect(wrapper3.prop('className')).toBe(className3)
  expect(wrapper4.prop('className')).toBe(className4)
  expect(wrapper5.prop('className')).toBe(className5)
  expect(wrapper6.prop('className')).toBe(className5)
  expect(wrapper7.prop('className')).toBe(className7)
  expect(wrapper8.prop('className')).toBe(className7)
  expect(wrapper9.prop('className')).toBe(className9)
  expect(wrapper10.prop('className')).toBe(className10)
  expect(wrapper11.prop('className')).toBe(className10)
})

it('反転してる場合でも正しいクラス名を付けられる', async () => {
  const store: Store = defaultStore()
  store.gameState.reverse()
  // 先手の駒
  const wrapper1 = shallow(() => <Cell row={6} column={1} />, store)
  const wrapper2 = shallow(() => <Cell row={7} column={7} />, store)
  const className1 = `Cell Piece Piece-Bordered Piece-${Fu1} Piece-Turn`
  const className2 = `Cell Piece Piece-Bordered Piece-${Kaku1} Piece-Turn`
  // 後手の駒
  const wrapper3 = shallow(() => <Cell row={2} column={7} />, store)
  const wrapper4 = shallow(() => <Cell row={1} column={1} />, store)
  const className3 = `Cell Piece Piece-Bordered Piece-${Fu0}`
  const className4 = `Cell Piece Piece-Bordered Piece-${Kaku0}`
  // 星
  const wrapper5 = shallow(() => <Cell row={6} column={2} />, store)
  const wrapper6 = shallow(() => <Cell row={6} column={5} />, store)
  const wrapper7 = shallow(() => <Cell row={3} column={2} />, store)
  const wrapper8 = shallow(() => <Cell row={3} column={5} />, store)
  const className5 = `Cell Piece Piece-Bordered Piece-${Fu1} Piece-Turn Piece-Star`
  const className7 = `Cell Piece Piece-Bordered Piece-Star`
  // 駒の中で、最上段・一番左
  const wrapper9 = shallow(() => <Cell row={8} column={0} />, store)
  const className9 = `Cell Piece Piece-Bordered Piece-${Kyou1} Piece-Turn Piece-Left Piece-Top`
  // EdgeText
  const wrapper10 = shallow(() => <Cell row={-1} column={0} />, store)
  const wrapper11 = shallow(() => <Cell row={0} column={-1} />, store)
  const className10 = `Cell Cell-Edge`

  expect(wrapper1.prop('className')).toBe(className1)
  expect(wrapper2.prop('className')).toBe(className2)
  expect(wrapper3.prop('className')).toBe(className3)
  expect(wrapper4.prop('className')).toBe(className4)
  expect(wrapper5.prop('className')).toBe(className5)
  expect(wrapper6.prop('className')).toBe(className5)
  expect(wrapper7.prop('className')).toBe(className7)
  expect(wrapper8.prop('className')).toBe(className7)
  expect(wrapper9.prop('className')).toBe(className9)
  expect(wrapper10.prop('className')).toBe(className10)
  expect(wrapper11.prop('className')).toBe(className10)
})

it('手番の駒をクリックすると選択でき、Selectedクラスが付く', async () => {
  const store: Store = defaultStore()
  const wrapper = mount(() => <Cell row={6} column={1} />, store)
  const targeted = mount(() => <Cell row={5} column={1} />, store)
  wrapper.simulate('click')
  targeted.update()
  const className = `Cell Piece Piece-Bordered Piece-${Fu0} Piece-Turn Piece-Selected`
  expect(wrapper.find('.Cell').hasClass(className)).toBeTruthy()
  // 移動先も着色される
  const classNameTargeted = `Cell Piece Piece-Bordered Piece-Targeted`
  expect(targeted.find('.Cell').hasClass(classNameTargeted)).toBeTruthy()
})

it('Confirm 周り一連をちゃんとできる', async () => {
  const store: Store = defaultStore()
  store.gameState.currentMove.pos.pos[3][1] = Fu0
  store.gameState.currentMove.pos.pos[6][1] = Empty
  const wrapper1 = mount(() => <Cell row={3} column={1} />, store)
  const wrapper2 = mount(() => <Cell row={2} column={1} />, store)
  const wrapper3 = mount(() => <Cell row={4} column={4} />, store)
  wrapper1.simulate('click')
  wrapper2.simulate('click')
  wrapper1.update()
  wrapper3.update()
  const className1 = `Cell Piece Piece-Bordered Piece-Turn Piece-Selected`
  const className2 = `Cell Piece Piece-Bordered`
  const classNameConfirm = `Piece-Confirm Piece-Confirm0`
  const classNamePromote = `Piece-Confirm-Promote`
  const classNamePreserve = `Piece-Confirm-Preserve`
  expect(wrapper1.find('.Cell').hasClass(className1)).toBeTruthy()
  expect(wrapper2.find('.Cell').hasClass(className2)).toBeTruthy()
  const firstChild = wrapper2.find('.Cell').children()
  expect(firstChild.hasClass(classNameConfirm)).toBeTruthy()
  const confirmOpts = firstChild.children()
  expect(confirmOpts.first().hasClass(classNamePromote)).toBeTruthy()
  expect(confirmOpts.last().hasClass(classNamePreserve)).toBeTruthy()
  wrapper3.simulate('click') // Confirm 以外をクリックして何も起こらないことを確認
  expect(firstChild.hasClass(classNameConfirm)).toBeTruthy()
})

it('成れる', async () => {
  const store: Store = defaultStore()
  store.gameState.currentMove.pos.pos[3][1] = Fu0
  store.gameState.currentMove.pos.pos[6][1] = Empty
  const wrapper1 = mount(() => <Cell row={3} column={1} />, store)
  const wrapper2 = mount(() => <Cell row={2} column={1} />, store)
  wrapper1.simulate('click')
  wrapper2.simulate('click')
  wrapper2.find('.Piece-Confirm-Promote').simulate('click')
  const className2 = `Cell Piece Piece-Bordered Piece-${To0}`
  expect(wrapper2.childAt(0).hasClass(className2)).toBeTruthy()
})

it('不成もできる', async () => {
  const store: Store = defaultStore()
  store.gameState.currentMove.pos.pos[3][1] = Fu0
  store.gameState.currentMove.pos.pos[6][1] = Empty
  const wrapper1 = mount(() => <Cell row={3} column={1} />, store)
  const wrapper2 = mount(() => <Cell row={2} column={1} />, store)
  wrapper1.simulate('click')
  wrapper2.simulate('click')
  wrapper2.find('.Piece-Confirm-Preserve').simulate('click')
  const className2 = `Cell Piece Piece-Bordered Piece-${Fu0}`
  expect(wrapper2.find('.Cell').hasClass(className2)).toBeTruthy()
})

it('反転していても Confirm オブジェクトを表示できる', async () => {
  const store: Store = defaultStore()
  store.gameState.reverse()
  store.gameState.currentMove.pos.pos[3][1] = Fu0
  store.gameState.currentMove.pos.pos[6][1] = Empty
  const wrapper1 = mount(() => <Cell row={3} column={1} />, store)
  const wrapper2 = mount(() => <Cell row={2} column={1} />, store)
  wrapper1.simulate('click')
  wrapper2.simulate('click')
  wrapper1.update()
  const className1 = `Cell Piece Piece-Bordered Piece-Turn Piece-Selected`
  const className2 = `Cell Piece Piece-Bordered`
  const classNameConfirm = `Piece-Confirm Piece-Confirm1`
  const classNamePromote = `Piece-Confirm-Promote`
  const classNamePreserve = `Piece-Confirm-Preserve`
  expect(wrapper1.find('.Cell').hasClass(className1)).toBeTruthy()
  expect(wrapper2.find('.Cell').hasClass(className2)).toBeTruthy()
  const firstChild = wrapper2.childAt(0).childAt(0)
  expect(firstChild.hasClass(classNameConfirm)).toBeTruthy()
  const confirmOpts = firstChild.children()
  // CSS で上下反転してるので一緒。将来的には変えるかも
  expect(confirmOpts.first().hasClass(classNamePromote)).toBeTruthy()
  expect(confirmOpts.last().hasClass(classNamePreserve)).toBeTruthy()
})
