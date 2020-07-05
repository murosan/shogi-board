import React from 'react'
import { Store } from '../../model/store/Store'
import { DefaultStore } from '../../store/Store'
import { shallow } from '../../testutils/component-helper'
import { Props as CapProps } from './Captures'
import LeftSide from './LeftSide'

it('レンダリングできる', async () => {
  const wrapper = shallow(() => <LeftSide />)
  expect(wrapper.find('.LeftSide')).toHaveLength(1)
  const capProps = wrapper.find('Captures').props() as CapProps
  expect(capProps.isLeftSide).toBeTruthy()
  expect(capProps.isTurn).toBeFalsy()
  expect(capProps.captures).toEqual([0, 0, 0, 0, 0, 0, 0])
})

it('反転していてもレンダリングできる', async () => {
  const store: Store = new DefaultStore()
  store.gameState.reverse()
  const wrapper = shallow(() => <LeftSide />, store)
  expect(wrapper.find('.LeftSide')).toHaveLength(1)
  const capProps = wrapper.find('Captures').props() as CapProps
  expect(capProps.isLeftSide).toBeTruthy()
  expect(capProps.isTurn).toBeTruthy()
  expect(capProps.captures).toEqual([0, 0, 0, 0, 0, 0, 0])
})
