import React from 'react'
import { shallow } from '../testutils/component-helper'
import App from './App'

it('レンダリングできる', () => {
  const wrapper = shallow(() => <App />)
  expect(wrapper.find('.App')).toHaveLength(1)
  expect(wrapper.find('.App-BoardOnly')).toHaveLength(1)
})
