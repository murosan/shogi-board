import React from 'react'
import { shallow } from '../../../testutils/component-helper'
import SideInfo from './SideInfo'

it('思考結果が空なら表示なし', async () => {
  const wrapper = shallow(() => <SideInfo />)
  expect(wrapper.find('.EngineSideInfo')).toHaveLength(1)
  expect(wrapper.find('.EngineSideInfoContainer')).toHaveLength(1)
  expect(wrapper.find('Columns')).toHaveLength(1)
})
