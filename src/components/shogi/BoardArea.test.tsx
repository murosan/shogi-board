import { shallow } from 'enzyme'
import React from 'react'
import BoardArea from './BoardArea'

it('レンダリングできる', () => {
  const wrapper = shallow(<BoardArea />)
  expect(wrapper.find('.BoardArea')).toHaveLength(1)
  expect(wrapper.find('inject-LeftSide-with-store')).toHaveLength(1)
  expect(wrapper.find('inject-Board-with-store')).toHaveLength(1)
  expect(wrapper.find('inject-RightSide-with-store')).toHaveLength(1)
})
