import { shallow } from 'enzyme'
import React from 'react'
import BoardArea from './BoardArea'

it('レンダリングできる', () => {
  const wrapper = shallow(<BoardArea />)
  expect(wrapper.find('.BoardArea')).toHaveLength(1)
  expect(wrapper.find('Memo(LeftSide)')).toHaveLength(1)
  expect(wrapper.find('Memo(Board)')).toHaveLength(1)
  expect(wrapper.find('Memo(RightSide)')).toHaveLength(1)
})
