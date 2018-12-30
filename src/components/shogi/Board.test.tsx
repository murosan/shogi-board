import { shallow } from 'enzyme'
import React from 'react'
import GameStateStore from '../../store/GameStateStore'
import Board from './Board'
import { Props as CellProps } from './Cell'

it('レンダリングできる', async () => {
  const gs: GameStateStore = new GameStateStore()
  const wrapper = shallow(<Board gs={gs} />).dive()
  expect(wrapper.find('.Board')).toHaveLength(1)
  const cells = wrapper.find('inject-Cell-with-gs')
  expect(cells).toHaveLength(121)
  const cellProps = cells.first().props() as CellProps
  expect(cellProps.row).toEqual(-1)
  expect(cellProps.column).toEqual(9)
})

it('反転されていてもレンダリングできる', async () => {
  const gs: GameStateStore = new GameStateStore()
  gs.reverse()
  const wrapper = shallow(<Board gs={gs} />).dive()
  expect(wrapper.find('.Board')).toHaveLength(1)
  const cells = wrapper.find('inject-Cell-with-gs')
  expect(cells).toHaveLength(121)
  const cellProps = cells.first().props() as CellProps
  expect(cellProps.row).toEqual(9)
  expect(cellProps.column).toEqual(-1)
})