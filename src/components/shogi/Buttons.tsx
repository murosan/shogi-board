import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import ConfigurationImg from '../../img/components/buttons/configuration.svg'
import ConnectToEngineImg from '../../img/components/buttons/connect-to-engine.svg'
import CopyKifImg from '../../img/components/buttons/copy-kif.svg'
import NextFiveImg from '../../img/components/buttons/next-five.svg'
import NextOneImg from '../../img/components/buttons/next-one.svg'
import PrevFiveImg from '../../img/components/buttons/prev-five.svg'
import PrevOneImg from '../../img/components/buttons/prev-one.svg'
import ReverseImg from '../../img/components/buttons/reverse.svg'
import StopEngineImg from '../../img/components/buttons/stop-engine.svg'
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
  const skipKif = (i: number) => gameState.clickKif(i)

  const engineOnClick: () => Promise<void> = async () => {
    const { current, state } = engineState
    if (!current || state !== Thinking) return await connectToEngine()
    await engineState.stopThinking()
  }

  const bgImg = (url: string) => ({ backgroundImage: `url(${url})` })

  return (
    <div className="ButtonsContainer">
      <button
        className="PrevOne"
        onClick={() => skipKif(prevOne)}
        style={bgImg(PrevOneImg)}
      />
      <button
        className="NextOne"
        onClick={() => skipKif(nextOne)}
        style={bgImg(NextOneImg)}
      />
      <button
        className="PrevFive"
        onClick={() => skipKif(prevFive)}
        style={bgImg(PrevFiveImg)}
      />
      <button
        className="NextFive"
        onClick={() => skipKif(nextFive)}
        style={bgImg(NextFiveImg)}
      />
      <button
        className="Reverse"
        onClick={() => gameState.reverse()}
        style={bgImg(ReverseImg)}
      />
      <button
        className="Copy"
        data-clipboard-text={getAsString(kif)}
        style={bgImg(CopyKifImg)}
      />
      <button
        className="ConnectToEngine"
        onClick={engineOnClick}
        style={
          engineState.state === Thinking
            ? bgImg(StopEngineImg)
            : bgImg(ConnectToEngineImg)
        }
      />
      <button
        className="Configuration"
        onClick={() => displayState.setMockupState(MockupSetting)}
        style={bgImg(ConfigurationImg)}
      />
    </div>
  )

  async function connectToEngine() {
    // サーバー URL が設定されてなかったら、設定画面を出す
    if (config.serverURL === '')
      return await displayState.setMockupState(MockupServerSetting)

    await displayState.setMockupState(MockupEngineControl)
  }
}

export default observer(Buttons)
