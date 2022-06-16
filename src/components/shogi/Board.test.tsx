import React from 'react'
import { clearTimers } from 'mobx-react-lite'
import { defaultStore, Store } from '../../store/Store'
import { shallow } from '../../testutils/component-helper'
import Board from './Board'
import { Props as CellProps } from './Cell'

afterEach(() => clearTimers())

it('レンダリングできる', async () => {
  const wrapper = shallow(() => <Board />)
  expect(wrapper.find('.Board')).toHaveLength(1)
  const cells = wrapper.find('Memo(Cell)')
  expect(cells).toHaveLength(121)
  const cellProps = cells.first().props() as CellProps
  expect(cellProps.row).toEqual(-1)
  expect(cellProps.column).toEqual(9)
})

it('反転されていてもレンダリングできる', async () => {
  const store: Store = defaultStore()
  store.gameState.reverse()
  const wrapper = shallow(() => <Board />, store)
  expect(wrapper.find('.Board')).toHaveLength(1)
  const cells = wrapper.find('Memo(Cell)')
  expect(cells).toHaveLength(121)
  const cellProps = cells.first().props() as CellProps
  expect(cellProps.row).toEqual(9)
  expect(cellProps.column).toEqual(-1)
})
