import { shallow } from 'enzyme'
import React from 'react'
import { Store } from '../model/store/Store'
import { DefaultStore } from '../store/Store'
import App from './App'

it('レンダリングできる', () => {
  const store: Store = new DefaultStore()
  const wrapper = shallow(<App store={store} />).dive()
  expect(wrapper.find('.App')).toHaveLength(1)
  expect(wrapper.find('.App-BoardOnly')).toHaveLength(1)
})
