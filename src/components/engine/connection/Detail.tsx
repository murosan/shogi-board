import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { EngineState } from '../../../model/engine/EngineState'
import { Store } from '../../../store/GameStateStore'
import './Detail.scss'
import Buttons from './form/Buttons'
import Checks from './form/Checks'
import Ranges from './form/Ranges'

export interface Props {
  store?: Store
}

@inject('store')
@observer
export default class Detail extends Component<Props> {
  render() {
    const { current, options }: EngineState = this.props.store!.engineState
    if (!current || !options) return <div />

    const { buttons, checks, spins, selects, strings, filenames } = options
    // TODO
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
          <Buttons
            buttons={buttons}
            onClick={name => this.updateButton(name)}
          />
        </div>
        <div className="OptionContainer">
          <h3 className="OptionType">Check</h3>
          <Checks
            checks={checks}
            onClick={(name: string, val: boolean) =>
              this.updateCheck(name, val)
            }
          />
        </div>
        <div className="OptionContainer">
          <h3 className="OptionType">Range</h3>
          <Ranges
            ranges={spins}
            onChange={(name: string, val: number) =>
              this.updateRange(name, val)
            }
          />
        </div>
        <div className="OptionContainer">
          <h3 className="OptionType">Select</h3>
        </div>
        <div className="OptionContainer">
          <h3 className="OptionType">String</h3>
        </div>
      </div>
    )
  }

  disconnect() {
    console.log('disconnect')
  }

  updateButton(name: string) {
    console.log('update button', name)
  }

  updateCheck(name: string, val: boolean) {
    console.log('update check', name, val)
  }

  updateRange(name: string, val: number) {
    console.log('update range', name, val)
  }

  updateString(name: string, val: string) {
    console.log('update string', name, val)
  }

  updateFilename(name: string, val: string) {
    console.log('update filename', name, val)
  }
}
