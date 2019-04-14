import React, { Component } from 'react'
import { Select as OptionSelect } from '../../../../model/engine/Optoin'
import './Selects.scss'
import { observer } from 'mobx-react'
import { string } from 'prop-types'

export interface Props {
  selects: Map<string, OptionSelect>
  onChange: (name: string, val: string) => void
}

@observer
export default class Selects extends Component<Props> {
  render() {
    return <div>{this.renderSelects()}</div>
  }

  private renderSelects(): JSX.Element[] {
    const values = this.props.selects.values()
    return Array.from(values).map((option: OptionSelect, i: number) =>
      this.renderSelect(i, option)
    )
  }

  private renderSelect(key: number, option: OptionSelect): JSX.Element {
    const { name, val, vars } = option
    return (
      <div className="SelectContainer" key={key}>
        <label>{name}</label>
        <div className="OptionSelect SelectTriangle">
          <select
            onChange={e => option.setValue(e.target.value)}
            value={val}
            required
          >
            {this.renderOptions(vars)}
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
}
