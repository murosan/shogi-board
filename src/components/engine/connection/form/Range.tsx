import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { Spin as OptionRange } from '../../../../model/engine/Optoin'
import { ShogiBoardClient } from '../../../../proto/factory'
import './Text.scss'

export interface Props {
  option: OptionRange
  sbclient: ShogiBoardClient
}

@observer
export default class Range extends Component<Props> {
  render(): JSX.Element {
    const { name, val, inputValue, min, max } = this.props.option
    // inputValue が Number && inRange のとき、 val に値をセットするようにしているため
    // val と inputValue が一致していれば正しい値
    const isValid: boolean = val.toString() === inputValue
    const className: string = isValid
      ? 'OptionTextInput'
      : 'OptionTextInput OptionTextInvalid'
    const labelText: string = `${name}(${min}~${max})`

    return (
      <div className="OptionText">
        <input
          className={className}
          type="text"
          value={inputValue}
          placeholder=" "
          onChange={this.update}
          required
          min={min}
          max={max}
        />
        <label>{labelText}</label>
      </div>
    )
  }

  private update = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { option, sbclient } = this.props
    option.setValue(e.target.value)
    sbclient.updateSpin(option)
  }
}
