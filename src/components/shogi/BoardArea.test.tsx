import { shallow } from 'enzyme'
import React from 'react'
import BoardArea from './BoardArea'

it('レンダリングできる', () => {
  const wrapper = shallow(<BoardArea />)
  expect(wrapper.find('.BoardArea')).toHaveLength(1)
})
