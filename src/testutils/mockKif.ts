import Position from '../model/shogi/Position'
import { hirate } from '../model/shogi/PositionInit'

export function mockKif() {
  const mockPos: Position = hirate()
  return {
    meta: {
      version: '1',
      player: { sente: '', gote: '' },
      handicap: '平手',
      initPos: mockPos,
    },
    history: {
      moves: [
        { str: 'mock0', pos: mockPos },
        { str: 'mock1', pos: mockPos },
        { str: 'mock2', pos: mockPos },
        {
          branches: [
            {
              moves: [
                { str: 'mock_0', pos: mockPos },
                { str: 'mock_1', pos: mockPos },
              ],
              index: 0,
            },
            {
              moves: [
                { str: 'mock3', pos: mockPos },
                { str: 'mock4', pos: mockPos },
                { str: 'mock5', pos: mockPos },
              ],
              index: 2,
            },
            {
              moves: [
                { str: 'mock_2', pos: mockPos },
                { str: 'mock_3', pos: mockPos },
                { str: 'mock_4', pos: mockPos },
              ],
              index: 2,
            },
          ],
          index: 1,
        },
      ],
      index: 3,
    },
  }
}

// 分岐で先頭しかないやつ
export function mockKif2() {
  const mockPos: Position = hirate()
  return {
    meta: {
      version: '1',
      player: { sente: '', gote: '' },
      handicap: '平手',
      initPos: mockPos,
    },
    history: {
      moves: [
        { str: 'mock0', pos: mockPos },
        { str: 'mock1', pos: mockPos },
        { str: 'mock2', pos: mockPos },
        {
          branches: [
            {
              moves: [
                { str: 'mock_0', pos: mockPos },
                { str: 'mock_1', pos: mockPos },
              ],
              index: 0,
            },
            {
              moves: [{ str: 'mock3', pos: mockPos }],
              index: 0,
            },
          ],
          index: 1,
        },
      ],
      index: 3,
    },
  }
}
