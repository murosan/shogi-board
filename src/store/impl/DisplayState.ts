import { action, makeObservable, observable } from 'mobx'
import { MockupHidden, MockupState } from '../../model/display/MockupState'
import { DisplayState } from '../DisplayState'

export class DefaultDisplayState implements DisplayState {
  mockup: MockupState = MockupHidden
  resizing: boolean = false
  showCommentArea: boolean = false

  constructor() {
    makeObservable(this, {
      mockup: observable,
      resizing: observable,
      showCommentArea: observable,
      setMockupState: action,
      closeMockup: action,
      setResizing: action,
      setShowCommentArea: action,
    })
  }

  async setMockupState(state: MockupState): Promise<void> {
    this.mockup = state
  }

  async closeMockup(): Promise<void> {
    this.mockup = MockupHidden
  }

  async setShowCommentArea(show: boolean): Promise<void> {
    this.showCommentArea = show
  }

  setResizing(b: boolean): void {
    this.resizing = b
  }
}
