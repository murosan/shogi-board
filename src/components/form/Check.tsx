import { observer } from 'mobx-react'
import React, { Component } from 'react'
import './Check.scss'

export interface Props {
  label: string
  value: boolean
  name: string
  onChange: (b: boolean) => Promise<void>
}

@observer
export default class Check extends Component<Props> {
  render() {
    const { label, value, name } = this.props
    const id = `FormCheck-${name}`

    return (
      <div className="FormCheck">
        <span>{label}</span>
        <div className="FormCheckToggle">
          <input
            id={id}
            name={id}
            type="checkbox"
            onChange={e => this.props.onChange(e.target.checked)}
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
}
