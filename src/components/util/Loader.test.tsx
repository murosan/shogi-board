import { shallow } from 'enzyme'
import React from 'react'
import Loader from './Loader'

it('レンダリングできる', () => {
  const wrapper = shallow(<Loader />)
  expect(wrapper.find('.Loader')).toHaveLength(1)
  expect(wrapper.find('.sk-circle')).toHaveLength(12)
})
