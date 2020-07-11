import {
  MockupEngineControl,
  MockupHidden,
} from '../../model/display/MockupState'
import { DisplayState } from '../DisplayState'
import { DefaultDisplayState } from './DisplayState'

it('mockup state を変更できる', () => {
  const state: DisplayState = new DefaultDisplayState()
  expect(state.mockup).toBe(MockupHidden)
  state.setMockupState(MockupEngineControl)
  expect(state.mockup).toBe(MockupEngineControl)
  state.closeMockup()
  expect(state.mockup).toBe(MockupHidden)
})

it('resizing', () => {
  const state: DisplayState = new DefaultDisplayState()
  expect(state.resizing).toBeFalsy()
  state.setResizing(true)
  expect(state.resizing).toBeTruthy()
})
