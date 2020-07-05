import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { getAsString } from '../../lib/kif-handler/getAsString'
import {
  MockupEngineControl,
  MockupServerSetting,
  MockupSetting,
} from '../../model/display/MockupState'
import { Thinking } from '../../model/engine/State'
import { StoreContext } from '../../store/Store'
import './Buttons.scss'

const Buttons: FC = () => {
  const { gameState, displayState, engineState, config } = React.useContext(
    StoreContext
  )
  const { currentMove, kif } = gameState
  const i: number = currentMove.index

  const prevOne: number = i - 1 < 0 ? 0 : i - 1
  const nextOne: number = i + 1
  const prevFive: number = i - 5 < 0 ? 0 : i - 5
  const nextFive: number = i + 5
  const skipKif = gameState.clickKif

  const engineOnClick: () => Promise<void> = async () => {
    const { current, state } = engineState
    if (!current || state !== Thinking) return await connectToEngine()
    await engineState.stopThinking()
  }

  return (
    <div className="ButtonsContainer">
      <button className="PrevOne" onClick={() => skipKif(prevOne)}>
        ＜
      </button>
      <button className="NextOne" onClick={() => skipKif(nextOne)}>
        ＞
      </button>
      <button className="PrevFive" onClick={() => skipKif(prevFive)}>
        ＜ 5
      </button>
      <button className="NextFive" onClick={() => skipKif(nextFive)}>
        5 ＞
      </button>
      <button className="Reverse" onClick={() => gameState.reverse()}>
        盤面反転
      </button>
      <button className="Copy" data-clipboard-text={getAsString(kif)}>
        棋譜コピー
      </button>
      <button className="ConnectToEngine" onClick={engineOnClick}>
        {engineState.state === Thinking ? '思考停止' : '将棋エンジン'}
      </button>
      <button
        className="Configuration"
        onClick={() => displayState.setMockupState(MockupSetting)}
      >
        設定
      </button>
    </div>
  )

  async function connectToEngine() {
    // サーバー URL が設定されてなかったら、設定画面を出す
    if (config.serverURL === '') {
      console.log('here')
      return await displayState.setMockupState(MockupServerSetting)
    }

    await displayState.setMockupState(MockupEngineControl)
  }
}

export default observer(Buttons)
