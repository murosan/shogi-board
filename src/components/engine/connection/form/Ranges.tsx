import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { Spin as OptionRange } from '../../../../model/engine/Optoin'
import './Text.scss'

export interface Props {
  ranges: Map<string, OptionRange>
}

@observer
export default class Ranges extends Component<Props> {
  render() {
    return <div>{this.renderRanges()}</div>
  }

  private renderRanges(): JSX.Element[] {
    const values = this.props.ranges.values()
    return Array.from(values).map(this.renderRange)
  }

  private renderRange(option: OptionRange, key: number): JSX.Element {
    const { name, val, inputValue, min, max } = option
    // inputValue が Number && inRange のとき、 val に値をセットするようにしているため
    // val と inputValue が一致していれば正しい値
    const isValid: boolean = val.toString() === inputValue
    const className: string = isValid
      ? 'OptionTextInput'
      : 'OptionTextInput OptionTextInvalid'

    return (
      <div className="OptionText" key={key}>
        <input
          className={className}
          type="text"
          value={inputValue}
          placeholder=" "
          onChange={e => option.setValue(e.target.value)}
          required
          min={min}
          max={max}
        />
        <label>{`${name}(${min}~${max})`}</label>
      </div>
    )
  }
}
