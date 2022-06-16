import React from 'react'
import { Store } from '../../store/Store'
import { defaultStore } from '../../store/Store'
import { shallow } from '../../testutils/component-helper'
import { Props as CapProps } from './Captures'
import RightSide from './RightSide'

it('レンダリングできる', async () => {
  const wrapper = shallow(() => <RightSide />)
  expect(wrapper.find('.RightSide')).toHaveLength(1)
  const capProps = wrapper.find('Memo(Captures)').props() as CapProps
  expect(capProps.isLeftSide).toBeFalsy()
  expect(capProps.isTurn).toBeTruthy()
  expect(capProps.captures).toEqual([0, 0, 0, 0, 0, 0, 0])
})

it('反転していてもレンダリングできる', async () => {
  const store: Store = defaultStore()
  store.gameState.reverse()
  const wrapper = shallow(() => <RightSide />, store)
  expect(wrapper.find('.RightSide')).toHaveLength(1)
  const capProps = wrapper.find('Memo(Captures)').props() as CapProps
  expect(capProps.isLeftSide).toBeFalsy()
  expect(capProps.isTurn).toBeFalsy()
  expect(capProps.captures).toEqual([0, 0, 0, 0, 0, 0, 0])
})
