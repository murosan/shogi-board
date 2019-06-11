import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { ShogiBoardClient } from '../../../../infrastructure/ShogiBoardClient'
import { Check as OptionCheck } from '../../../../model/engine/Optoin'

export interface Props {
  option: OptionCheck
  sbclient: ShogiBoardClient
}

@observer
export default class Check extends Component<Props> {
  render() {
    const { name, value } = this.props.option
    const id: string = `OptionCheck${name}`
    return (
      <div className="OptionCheck">
        <span>{name}</span>
        <div className="OptionCheckToggle">
          <input
            id={id}
            name={id}
            type="checkbox"
            onChange={this.update}
            checked={value}
          />
          <label htmlFor={id}>
            <div
              className="ToggleSwitch"
              data-checked="ON"
              data-unchecked="OFF"
            />
          </label>
        </div>
      </div>
    )
  }

  private update = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { option, sbclient } = this.props
    option.setValue(e.target.checked)
    sbclient.updateCheck(option)
  }
}
