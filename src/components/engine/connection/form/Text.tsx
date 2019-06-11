import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { ShogiBoardClient } from '../../../../infrastructure/ShogiBoardClient'
import { Text as OptionText } from '../../../../model/engine/Optoin'
import './Text.scss'

export interface Props {
  option: OptionText
  sbclient: ShogiBoardClient
}

@observer
export default class Text extends Component<Props> {
  render(): JSX.Element {
    const { name, value } = this.props.option
    const className: string =
      value !== '' ? 'OptionTextInput' : 'OptionTextInput OptionTextInvalid'
    return (
      <div className="OptionText">
        <input
          className={className}
          type="text"
          value={value}
          placeholder=" "
          onChange={this.update}
          required
        />
        <label>{name}</label>
      </div>
    )
  }

  private update = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { option, sbclient } = this.props
    option.setValue(e.target.value)
    sbclient.updateText(option)
  }
}
