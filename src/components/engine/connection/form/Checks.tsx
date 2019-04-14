import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { Check as OptionCheck } from '../../../../model/engine/Optoin'
import './Checks.scss'

export interface Props {
  checks: Map<string, OptionCheck>
  onClick: (name: string, val: boolean) => void
}

@observer
export default class Checks extends Component<Props> {
  render() {
    return <div>{this.renderChecks()}</div>
  }

  private renderChecks(): JSX.Element[] {
    const values = this.props.checks.values()
    return Array.from(values).map((option: OptionCheck, i: number) => {
      const id: string = `OptionCheck${option.name}`
      return this.renderCheck(i, id, option)
    })
  }

  private renderCheck(i: number, id: string, option: OptionCheck): JSX.Element {
    const { name, val } = option
    return (
      <div key={i} className="OptionCheck">
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
