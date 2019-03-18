import React, { Component } from 'react'
import { Check as OptionCheck } from '../../../../model/engine/Optoin'
import './Checks.scss'

export interface Props {
  checks: Map<string, OptionCheck>
  onClick: (name: string, val: boolean) => void
}

export default class Checks extends Component<Props> {
  render() {
    return <div>{this.renderButtons()}</div>
  }

  renderButtons() {
    const elms: JSX.Element[] = []
    const values = this.props.checks.values()

    let { value } = values.next()
    let i = 0
    while (value) {
      const name: string = value.name
      const val: boolean = value.val
      const id: string = `OptionCheck${name}`

      elms.push(
        <div key={i} className="OptionCheck">
          <span>{name}</span>
          <div className="OptionCheckToggle">
            <input
              id={id}
              type="checkbox"
              onChange={e => this.props.onClick(name, e.target.checked)}
              checked={val}
            />
            <label htmlFor={id}>
              <div
                className="ToggleSwitch"
                data-checked="On"
                data-unchecked="Off"
              />
            </label>
          </div>
        </div>
      )

      i++
      value = values.next().value
    }

    return elms
  }
}
