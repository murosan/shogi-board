import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { Check as OptionCheck } from '../../../../model/engine/Optoin'
import './Checks.scss'

export interface Props {
  checks: Map<string, OptionCheck>
}

@observer
export default class Checks extends Component<Props> {
  render() {
    return <div>{this.renderChecks()}</div>
  }

  private renderChecks(): JSX.Element[] {
    const values = this.props.checks.values()
    return Array.from(values).map(this.renderCheck)
  }

  private renderCheck(option: OptionCheck, key: number): JSX.Element {
    const { name, val } = option
    const id: string = `OptionCheck${name}`
    return (
      <div key={key} className="OptionCheck">
        <span>{name}</span>
        <div className="OptionCheckToggle">
          <input
            id={id}
            name={id}
            type="checkbox"
            onChange={e => option.setValue(e.target.checked)}
            checked={val}
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
}
