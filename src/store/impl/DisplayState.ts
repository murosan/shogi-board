import { action, observable } from 'mobx'
import { DisplayState } from '../DisplayState'
import { MockupHidden, MockupState } from '../../model/display/MockupState'

export class DefaultDisplayState implements DisplayState {
  @observable mockup: MockupState = MockupHidden
  @observable resizing: boolean = false

  @action
  async setMockupState(state: MockupState): Promise<void> {
    this.mockup = state
  }

  @action
  async closeMockup(): Promise<void> {
    this.mockup = MockupHidden
  }

  @action
  setResizing(b: boolean): void {
    this.resizing = b
  }
}
