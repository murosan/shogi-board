import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { ShogiBoardClient } from '../../../../infrastructure/ShogiBoardClient'
import { Select as OptionSelect } from '../../../../model/engine/Optoin'
import './Selects.scss'

export interface Props {
  option: OptionSelect
  sbclient: ShogiBoardClient
}

@observer
export default class Select extends Component<Props> {
  render(): JSX.Element {
    const { name, value, vars } = this.props.option
    const options = this.renderOptions(vars)
    return (
      <div className="SelectContainer">
        <label>{name}</label>
        <div className="OptionSelect SelectTriangle">
          <select onChange={this.update} value={value} required>
            {options}
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
    const { option, sbclient } = this.props
    option.setValue(e.target.value)
    sbclient.updateSelect(option)
  }
}
