import { shallow } from 'enzyme'
import React from 'react'
import { Store } from '../../model/store/Store'
import { DefaultStore } from '../../store/Store'
import { Props as CapProps } from './Captures'
import LeftSide from './LeftSide'

it('レンダリングできる', async () => {
  const store: Store = new DefaultStore()
  const wrapper = shallow(<LeftSide store={store} />).dive()
  expect(wrapper.find('.LeftSide')).toHaveLength(1)
  const capProps = wrapper
    .find('inject-Captures-with-store')
    .props() as CapProps
  expect(capProps.isLeftSide).toBeTruthy()
  expect(capProps.isTurn).toBeFalsy()
  expect(capProps.captures).toEqual([0, 0, 0, 0, 0, 0, 0])
})

it('反転していてもレンダリングできる', async () => {
  const store: Store = new DefaultStore()
  store.gameState.reverse()
  const wrapper = shallow(<LeftSide store={store} />).dive()
  expect(wrapper.find('.LeftSide')).toHaveLength(1)
  const capProps = wrapper
    .find('inject-Captures-with-store')
    .props() as CapProps
  expect(capProps.isLeftSide).toBeTruthy()
  expect(capProps.isTurn).toBeTruthy()
  expect(capProps.captures).toEqual([0, 0, 0, 0, 0, 0, 0])
})
