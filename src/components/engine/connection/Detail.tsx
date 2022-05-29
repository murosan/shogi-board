import interval from 'interval-promise'
import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { Info } from '../../../model/engine/Info'
import { Thinking } from '../../../model/engine/State'
import { EngineState } from '../../../store/EngineState'
import { Store, StoreContext } from '../../../store/Store'
import './Detail.scss'
import Buttons from './form/Buttons'
import Checks from './form/Checks'
import Ranges from './form/Ranges'
import Selects from './form/Selects'
import Texts from './form/Texts'

const GET_RESULT_INTERVAL = 1000 // ms

const Detail: FC = () => {
  const { gameState, displayState, engineState }: Store =
    React.useContext(StoreContext)
  const { current, options, sbclient }: EngineState = engineState
  if (!current || !options) return <div />

  const { buttons, checks, ranges, selects, texts } = options

  const disconnect = () => engineState.disconnect()
  const start = () =>
    engineState
      .startThinking()
      .then(() => displayState.closeMockup())
      .then(fetchInterval)
      .catch(e => console.error(e))

  const disconnectBtn = (
    <button className="ButtonDisconnect" onClick={disconnect}>
      接続解除
    </button>
  )

  const startBtn = (
    <button className="ButtonStartThinking" onClick={start}>
      思考開始
    </button>
  )

  return (
    <div className="DetailContainer">
      <h1 className="EngineName">{current}</h1>
      {disconnectBtn}
      {startBtn}
      <h2 className="EngineOption">オプション</h2>
      <Buttons buttons={buttons} sbclient={sbclient} />
      <Checks checks={checks} sbclient={sbclient} />
      <Ranges ranges={ranges} sbclient={sbclient} />
      <Selects selects={selects} sbclient={sbclient} />
      <Texts texts={texts} sbclient={sbclient} />
      {disconnectBtn}
      {startBtn}
    </div>
  )

  function fetchInterval(): Promise<void> {
    // 思考を開始したら、思考結果を定期的に取得する
    return interval(async (_, stop) => {
      const { current, state, sbclient } = engineState
      if (!current || state !== Thinking) {
        stop()
        return
      }

      try {
        const result: Info[] = await sbclient.getResult(gameState.currentMove)
        await engineState.setResult(result)
      } catch (e) {
        console.error(e)
      }
    }, GET_RESULT_INTERVAL)
  }
}

export default observer(Detail)
