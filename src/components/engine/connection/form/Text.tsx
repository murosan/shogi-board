import { observer } from 'mobx-react'
import React, { Component } from 'react'
import {
  Filename as OptionFilename,
  Str as OptionStr,
  String as OptionString,
} from '../../../../model/engine/Optoin'
import { ShogiBoardClient } from '../../../../proto/factory'
import './Text.scss'

export interface Props {
  option: OptionStr
  sbclient: ShogiBoardClient
}

@observer
export default class Text extends Component<Props> {
  render(): JSX.Element {
    const { name, val } = this.props.option
    const className: string =
      val !== '' ? 'OptionTextInput' : 'OptionTextInput OptionTextInvalid'
    return (
      <div className="OptionText">
        <input
          className={className}
          type="text"
          value={val}
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
    if (option instanceof OptionFilename) sbclient.updateFilename(option)
    else if (option instanceof OptionString) sbclient.updateString(option)
  }
}
