import { mount } from 'enzyme'
import React from 'react'
import App from './App'

it('renders without crashing', () => {
  const wrapper = mount(<App />)
  expect(wrapper.find('.App')).toHaveLength(1)
  expect(wrapper.find('.App-BoardOnly')).toHaveLength(1)
})
