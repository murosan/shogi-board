import { action, observable } from 'mobx'
import { DisplayState } from '../model/display/DisplayState'
import { MockupHidden, MockupState } from '../model/display/MockupState'

export class DefaultDisplayState implements DisplayState {
  @observable mockup: MockupState = MockupHidden

  @action
  async setMockupState(state: MockupState): Promise<void> {
    this.mockup = state
  }

  @action
  async closeMockup(): Promise<void> {
    this.mockup = MockupHidden
  }
}
