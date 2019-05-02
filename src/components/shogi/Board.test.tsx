import { shallow } from 'enzyme'
import React from 'react'
import { Store } from '../../model/store/Store'
import { DefaultStore } from '../../store/Store'
import Board from './Board'
import { Props as CellProps } from './Cell'

it('レンダリングできる', async () => {
  const store: Store = new DefaultStore()
  const wrapper = shallow(<Board store={store} />).dive()
  expect(wrapper.find('.Board')).toHaveLength(1)
  const cells = wrapper.find('inject-Cell-with-store')
  expect(cells).toHaveLength(121)
  const cellProps = cells.first().props() as CellProps
  expect(cellProps.row).toEqual(-1)
  expect(cellProps.column).toEqual(9)
})

it('反転されていてもレンダリングできる', async () => {
  const store: Store = new DefaultStore()
  store.gameState.reverse()
  const wrapper = shallow(<Board store={store} />).dive()
  expect(wrapper.find('.Board')).toHaveLength(1)
  const cells = wrapper.find('inject-Cell-with-store')
  expect(cells).toHaveLength(121)
  const cellProps = cells.first().props() as CellProps
  expect(cellProps.row).toEqual(9)
  expect(cellProps.column).toEqual(-1)
})
