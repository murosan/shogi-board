import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { Select as OptionSelect } from '../../../../model/engine/Optoin'
import { ShogiBoardClient } from '../../../../proto/factory'
import './Selects.scss'

export interface Props {
  option: OptionSelect
  sbclient: ShogiBoardClient
}

@observer
export default class Select extends Component<Props> {
  constructor(props: Props) {
    super(props)
    this.update = this.update.bind(this)
  }

  render(): JSX.Element {
    const { name, val, vars } = this.props.option
    return (
      <div className="SelectContainer">
        <label>{name}</label>
        <div className="OptionSelect SelectTriangle">
          <select onChange={this.update} value={val} required>
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

  update(e: React.ChangeEvent<HTMLSelectElement>): void {
    const { option, sbclient } = this.props
    option.setValue(e.target.value)
    sbclient.updateSelect(option)
  }
}
