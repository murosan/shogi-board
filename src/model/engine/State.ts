// 将棋エンジンの状態を表すID
export type State = 0 | 1 | 2 | 3 | 4

// 接続前
export const NotConnected: State = 0

// 接続中・ローディング中のComponentを表示するため
export const Connecting: State = 1

// 接続済
export const Connected: State = 2

// 将棋エンジン、待機中(思考中ではない)
export const StandBy: State = 3

// 将棋エンジン思考中
export const Thinking: State = 4
