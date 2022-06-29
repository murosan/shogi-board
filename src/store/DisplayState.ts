import { MockupState } from '../model/display/MockupState'

/**
 * 画面表示に関する State
 */
export interface DisplayState {
  // モックアップ画面の現在の状態
  mockup: MockupState

  // ボードエリアをリサイズ中かどうか
  resizing: boolean

  // コメントを表示するか
  showCommentArea: boolean

  // MockupState を更新する
  setMockupState(state: MockupState): Promise<void>

  // モックアップを閉じる
  closeMockup(): Promise<void>

  setShowCommentArea(show: boolean): Promise<void>

  setResizing(b: boolean): void
}
