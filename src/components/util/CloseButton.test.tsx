import React from 'react'
import { shallow } from '../../testutils/component-helper'
import CloseButton from './CloseButton'

it('閉じるボタンを押すと onClick に渡した関数が実行される', () => {
  let clicked: boolean = false
  const onClick: () => Promise<void> = () => {
    clicked = true
    return Promise.resolve()
  }
  const wrapper = shallow(() => <CloseButton onClick={onClick} />)
  wrapper.simulate('click')
  expect(clicked).toBeTruthy()
})
