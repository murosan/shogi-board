import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { EngineState } from '../../../model/engine/EngineState'
import { ShogiBoardClient } from '../../../proto/factory'
import { Store } from '../../../store/GameStateStore'
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
    const { current, options }: EngineState = this.props.store!.engineState
    if (!current || !options) return <div />

    const sbclient: ShogiBoardClient = new ShogiBoardClient(current)
    const { buttons, checks, spins, selects, strings, filenames } = options
    return (
      <div className="DetailContainer">
        <h1 className="EngineName">{current}</h1>
        <div>
          <button
            className="ButtonDisconnect"
            onClick={() => this.disconnect()}
          >
            接続解除
          </button>
        </div>
        <div className="OptionContainer">
          <h3 className="OptionType">Button</h3>
          <Buttons buttons={buttons} sbclient={sbclient} />
        </div>
        <div className="OptionContainer">
          <h3 className="OptionType">Check</h3>
          <Checks checks={checks} sbclient={sbclient} />
        </div>
        <div className="OptionContainer">
          <h3 className="OptionType">Range</h3>
          <Ranges ranges={spins} sbclient={sbclient} />
        </div>
        <div className="OptionContainer">
          <h3 className="OptionType">Select</h3>
          <Selects selects={selects} sbclient={sbclient} />
        </div>
        <div className="OptionContainer">
          <h3 className="OptionType">String・Filename</h3>
          <Texts strings={strings} filenames={filenames} sbclient={sbclient} />
        </div>
      </div>
    )
  }

  disconnect() {
    console.log('disconnect')
  }
}
