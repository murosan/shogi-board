import { observer } from 'mobx-react'
import React, { Component } from 'react'
import './Select.scss'

export interface Props {
  label: string
  value: string
  options: string[]
  onChange: (s: string) => Promise<void>
}

@observer
export default class Select extends Component<Props> {
  render(): JSX.Element {
    const { label, value, options } = this.props
    const opts = this.renderOptions(options)

    return (
      <div className="FormSelectContainer">
        <label>{label}</label>
        <div className="FormSelect SelectTriangle">
          <select onChange={this.update} value={value} required>
            {opts}
          </select>
        </div>
      </div>
    )
  }

  private renderOptions(vars: string[]): JSX.Element[] {
    return vars.map((value: string, i: number) => (
      <option key={i} value={value}>
        {value}
      </option>
    ))
  }

  private update = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.onChange(e.target.value)
  }
}
