import React, { Component } from 'react'
import { Select as OptionSelect } from '../../../../model/engine/Optoin'
import './Selects.scss'

export interface Props {
  selects: Map<string, OptionSelect>
  onChange: (name: string, val: string) => void
}

export default class Selects extends Component<Props> {
  render() {
    return <div>{this.renderSelects()}</div>
  }

  renderSelects() {
    const elms: JSX.Element[] = []
    const values = this.props.selects.values()

    let { value } = values.next()
    let i = 0
    while (value) {
      const { name, val, vars } = value
      const selectOpts: JSX.Element[] = vars.map((v, j) => (
        <option key={`o${j}`} value={v}>
          {v}
        </option>
      ))

      elms.push(
        <div className="SelectContainer" key={i}>
          <label>{name}</label>
          <div className="OptionSelect SelectTriangle">
            <select
              onChange={e => this.props.onChange(name, e.target.value)}
              value={val}
              required
            >
              {selectOpts}
            </select>
          </div>
        </div>
      )

      i++
      value = values.next().value
    }

    return elms
  }
}
