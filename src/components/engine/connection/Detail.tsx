import interval from 'interval-promise'
import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { Info } from '../../../model/engine/Info'
import { Thinking } from '../../../model/engine/State'
import { Store } from '../../../model/store/Store'
import './Detail.scss'
import Buttons from './form/Buttons'
import Checks from './form/Checks'
import Ranges from './form/Ranges'
import Selects from './form/Selects'
import Texts from './form/Texts'

const GET_RESULT_INTERVAL = 1000 // ms

export interface Props {
  store?: Store
}

@inject('store')
@observer
export default class Detail extends Component<Props> {
  render() {
    const { current, options, sbclient } = this.props.store!.engineState
    if (!current || !options) return <div />

    const { buttons, checks, ranges, selects, texts } = options

    const disconnectBtn = (
      <button className="ButtonDisconnect" onClick={this.disconnect}>
        接続解除
      </button>
    )

    const startBtn = (
      <button className="ButtonStartThinking" onClick={this.start}>
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
  }

  private disconnect = () => this.props.store!.engineState.disconnect()
  private start = () => {
    const { engineState, displayState } = this.props.store!
    engineState
      .startThinking()
      .then(() => displayState.closeMockup())
      .then(this.fetchInterval)
      .catch(e => console.error(e))
  }

  private fetchInterval = async () => {
    // 思考を開始したら、思考結果を定期的に取得する
    interval(async (_, stop) => {
      const { gameState, engineState } = this.props.store!
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
