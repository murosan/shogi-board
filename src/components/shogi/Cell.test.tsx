import { shallow } from 'enzyme'
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
import { Store } from '../../model/store/Store'
import { DefaultStore } from '../../store/Store'
import Cell from './Cell'

it('正しいクラス名を付けられる', async () => {
  const store: Store = new DefaultStore()
  // 先手の駒
  const wrapper1 = shallow(<Cell store={store} row={6} column={1} />).dive()
  const wrapper2 = shallow(<Cell store={store} row={7} column={7} />).dive()
  const className1 = `Cell Piece Piece-Bordered Piece-${Fu0} Piece-Turn`
  const className2 = `Cell Piece Piece-Bordered Piece-${Kaku0} Piece-Turn`
  // 後手の駒
  const wrapper3 = shallow(<Cell store={store} row={2} column={7} />).dive()
  const wrapper4 = shallow(<Cell store={store} row={1} column={1} />).dive()
  const className3 = `Cell Piece Piece-Bordered Piece-${Fu1}`
  const className4 = `Cell Piece Piece-Bordered Piece-${Kaku1}`
  // 星
  const wrapper5 = shallow(<Cell store={store} row={2} column={6} />).dive()
  const wrapper6 = shallow(<Cell store={store} row={2} column={3} />).dive()
  const wrapper7 = shallow(<Cell store={store} row={5} column={6} />).dive()
  const wrapper8 = shallow(<Cell store={store} row={5} column={3} />).dive()
  const className5 = `Cell Piece Piece-Bordered Piece-${Fu1} Piece-Star`
  const className7 = `Cell Piece Piece-Bordered Piece-Star`
  // 駒の中で、最上段・一番左
  const wrapper9 = shallow(<Cell store={store} row={0} column={8} />).dive()
  const className9 = `Cell Piece Piece-Bordered Piece-${Kyou1} Piece-Left Piece-Top`
  // EdgeText
  const wrapper10 = shallow(<Cell store={store} row={-1} column={0} />).dive()
  const wrapper11 = shallow(<Cell store={store} row={0} column={-1} />).dive()
  const className10 = `Cell Cell-EdgeText`

  expect(wrapper1.hasClass(className1)).toBeTruthy()
  expect(wrapper2.hasClass(className2)).toBeTruthy()
  expect(wrapper3.hasClass(className3)).toBeTruthy()
  expect(wrapper4.hasClass(className4)).toBeTruthy()
  expect(wrapper5.hasClass(className5)).toBeTruthy()
  expect(wrapper6.hasClass(className5)).toBeTruthy()
  expect(wrapper7.hasClass(className7)).toBeTruthy()
  expect(wrapper8.hasClass(className7)).toBeTruthy()
  expect(wrapper9.hasClass(className9)).toBeTruthy()
  expect(wrapper10.hasClass(className10)).toBeTruthy()
  expect(wrapper11.hasClass(className10)).toBeTruthy()
})

it('反転してる場合でも正しいクラス名を付けられる', async () => {
  const store: Store = new DefaultStore()
  store.gameState.reverse()
  // 先手の駒
  const wrapper1 = shallow(<Cell store={store} row={6} column={1} />).dive()
  const wrapper2 = shallow(<Cell store={store} row={7} column={7} />).dive()
  const className1 = `Cell Piece Piece-Bordered Piece-${Fu1} Piece-Turn`
  const className2 = `Cell Piece Piece-Bordered Piece-${Kaku1} Piece-Turn`
  // 後手の駒
  const wrapper3 = shallow(<Cell store={store} row={2} column={7} />).dive()
  const wrapper4 = shallow(<Cell store={store} row={1} column={1} />).dive()
  const className3 = `Cell Piece Piece-Bordered Piece-${Fu0}`
  const className4 = `Cell Piece Piece-Bordered Piece-${Kaku0}`
  // 星
  const wrapper5 = shallow(<Cell store={store} row={6} column={2} />).dive()
  const wrapper6 = shallow(<Cell store={store} row={6} column={5} />).dive()
  const wrapper7 = shallow(<Cell store={store} row={3} column={2} />).dive()
  const wrapper8 = shallow(<Cell store={store} row={3} column={5} />).dive()
  const className5 = `Cell Piece Piece-Bordered Piece-${Fu1} Piece-Turn Piece-Star`
  const className7 = `Cell Piece Piece-Bordered Piece-Star`
  // 駒の中で、最上段・一番左
  const wrapper9 = shallow(<Cell store={store} row={8} column={0} />).dive()
  const className9 = `Cell Piece Piece-Bordered Piece-${Kyou1} Piece-Turn Piece-Left Piece-Top`
  // EdgeText
  const wrapper10 = shallow(<Cell store={store} row={-1} column={0} />).dive()
  const wrapper11 = shallow(<Cell store={store} row={0} column={-1} />).dive()
  const className10 = `Cell Cell-EdgeText`

  expect(wrapper1.hasClass(className1)).toBeTruthy()
  expect(wrapper2.hasClass(className2)).toBeTruthy()
  expect(wrapper3.hasClass(className3)).toBeTruthy()
  expect(wrapper4.hasClass(className4)).toBeTruthy()
  expect(wrapper5.hasClass(className5)).toBeTruthy()
  expect(wrapper6.hasClass(className5)).toBeTruthy()
  expect(wrapper7.hasClass(className7)).toBeTruthy()
  expect(wrapper8.hasClass(className7)).toBeTruthy()
  expect(wrapper9.hasClass(className9)).toBeTruthy()
  expect(wrapper10.hasClass(className10)).toBeTruthy()
  expect(wrapper11.hasClass(className10)).toBeTruthy()
})

it('手番の駒をクリックすると選択でき、Selectedクラスが付く', async () => {
  const store: Store = new DefaultStore()
  const wrapper = shallow(<Cell store={store} row={6} column={1} />).dive()
  const targeted = shallow(<Cell store={store} row={5} column={1} />).dive()
  wrapper.simulate('click')
  const className = `Cell Piece Piece-Bordered Piece-${Fu0} Piece-Turn Piece-Selected`
  expect(wrapper.hasClass(className)).toBeTruthy()
  // 移動先も着色される
  const classNameTargeted = `Cell Piece Piece-Bordered Piece-Targeted`
  expect(targeted.hasClass(classNameTargeted)).toBeTruthy()
})

it('Confirm 周り一連をちゃんとできる', async () => {
  const store: Store = new DefaultStore()
  store.gameState.currentMove.pos.pos[3][1] = Fu0
  store.gameState.currentMove.pos.pos[6][1] = Empty
  const wrapper1 = shallow(<Cell store={store} row={3} column={1} />).dive()
  const wrapper2 = shallow(<Cell store={store} row={2} column={1} />).dive()
  const wrapper3 = shallow(<Cell store={store} row={4} column={4} />).dive()
  wrapper1.simulate('click')
  wrapper2.simulate('click')
  const className1 = `Cell Piece Piece-Bordered Piece-Turn Piece-Selected`
  const className2 = `Cell Piece Piece-Bordered`
  const classNameConfirm = `Piece-Confirm Piece-Confirm0`
  const classNamePromote = `Piece-Confirm-Promote`
  const classNamePreserve = `Piece-Confirm-Preserve`
  expect(wrapper1.hasClass(className1)).toBeTruthy()
  expect(wrapper2.hasClass(className2)).toBeTruthy()
  const firstChild = wrapper2.children()
  expect(firstChild.hasClass(classNameConfirm)).toBeTruthy()
  const confirmOpts = firstChild.children()
  expect(confirmOpts.first().hasClass(classNamePromote)).toBeTruthy()
  expect(confirmOpts.last().hasClass(classNamePreserve)).toBeTruthy()
  wrapper3.simulate('click') // Confirm 以外をクリックして何も起こらないことを確認
  expect(firstChild.hasClass(classNameConfirm)).toBeTruthy()
})

it('成れる', async () => {
  const store: Store = new DefaultStore()
  store.gameState.currentMove.pos.pos[3][1] = Fu0
  store.gameState.currentMove.pos.pos[6][1] = Empty
  const wrapper1 = shallow(<Cell store={store} row={3} column={1} />).dive()
  const wrapper2 = shallow(<Cell store={store} row={2} column={1} />).dive()
  wrapper1.simulate('click')
  wrapper2.simulate('click')
  wrapper2
    .children()
    .children()
    .first()
    .simulate('click')
  const className2 = `Cell Piece Piece-Bordered Piece-${To0}`
  expect(wrapper2.hasClass(className2)).toBeTruthy()
})

it('不成もできる', async () => {
  const store: Store = new DefaultStore()
  store.gameState.currentMove.pos.pos[3][1] = Fu0
  store.gameState.currentMove.pos.pos[6][1] = Empty
  const wrapper1 = shallow(<Cell store={store} row={3} column={1} />).dive()
  const wrapper2 = shallow(<Cell store={store} row={2} column={1} />).dive()
  wrapper1.simulate('click')
  wrapper2.simulate('click')
  wrapper2
    .children()
    .children()
    .last()
    .simulate('click')
  const className2 = `Cell Piece Piece-Bordered Piece-${Fu0}`
  expect(wrapper2.hasClass(className2)).toBeTruthy()
})

it('反転していても Confirm オブジェクトを表示できる', async () => {
  const store: Store = new DefaultStore()
  store.gameState.reverse()
  store.gameState.currentMove.pos.pos[3][1] = Fu0
  store.gameState.currentMove.pos.pos[6][1] = Empty
  const wrapper1 = shallow(<Cell store={store} row={3} column={1} />).dive()
  const wrapper2 = shallow(<Cell store={store} row={2} column={1} />).dive()
  wrapper1.simulate('click')
  wrapper2.simulate('click')
  const className1 = `Cell Piece Piece-Bordered Piece-Turn Piece-Selected`
  const className2 = `Cell Piece Piece-Bordered`
  const classNameConfirm = `Piece-Confirm Piece-Confirm1`
  const classNamePromote = `Piece-Confirm-Promote`
  const classNamePreserve = `Piece-Confirm-Preserve`
  expect(wrapper1.hasClass(className1)).toBeTruthy()
  expect(wrapper2.hasClass(className2)).toBeTruthy()
  const firstChild = wrapper2.children()
  expect(firstChild.hasClass(classNameConfirm)).toBeTruthy()
  const confirmOpts = firstChild.children()
  // CSS で上下反転してるので一緒。将来的には変えるかも
  expect(confirmOpts.first().hasClass(classNamePromote)).toBeTruthy()
  expect(confirmOpts.last().hasClass(classNamePreserve)).toBeTruthy()
})
