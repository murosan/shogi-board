import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { Store } from '../../../model/store/Store'
import { ShogiBoardClient } from '../../../proto/factory'
import './Detail.scss'
import Buttons from './form/Buttons'
import Checks from './form/Checks'
import Ranges from './form/Ranges'
import Selects from './form/Selects'
import Texts from './form/Texts'

export interface Props {
  store?: Store
}

@inject('store')
@observer
export default class Detail extends Component<Props> {
  render() {
    const { current, options } = this.props.store!.engineState
    if (!current || !options) return <div />

    const sbclient: ShogiBoardClient = new ShogiBoardClient(current)
    const { buttons, checks, spins, selects, strings, filenames } = options
    return (
      <div className="DetailContainer">
        <h1 className="EngineName">{current}</h1>
        {this.renderDisconnectButton()}
        {this.renderStartButton()}
        <h2 className="EngineOption">オプション</h2>
        <Buttons buttons={buttons} sbclient={sbclient} />
        <Checks checks={checks} sbclient={sbclient} />
        <Ranges ranges={spins} sbclient={sbclient} />
        <Selects selects={selects} sbclient={sbclient} />
        <Texts strings={strings} filenames={filenames} sbclient={sbclient} />
        {this.renderDisconnectButton()}
        {this.renderStartButton()}
      </div>
    )
  }

  private renderDisconnectButton() {
    const onClick = () => {
      console.log('disconnect')
      this.props.store!.engineState.disconnect()
    }
    return (
      <button className="ButtonDisconnect" onClick={onClick}>
        接続解除
      </button>
    )
  }

  private renderStartButton() {
    return (
      <button
        className="ButtonStartThinking"
        onClick={() => this.props.store!.engineState.startThinking()}
      >
        思考開始
      </button>
    )
  }
}
