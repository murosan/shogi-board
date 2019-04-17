import { observer } from 'mobx-react'
import React, { Component } from 'react'
import {
  Filename as OptionFilename,
  Str,
  String as OptionString,
} from '../../../../model/engine/Optoin'
import './Text.scss'

export interface Props {
  strings: Map<string, OptionString>
  filenames: Map<string, OptionFilename>
}

@observer
export default class Text extends Component<Props> {
  render() {
    const stringValues = this.props.strings.values()
    const filenameValues = this.props.filenames.values()
    return (
      <div>
        {this.renderTexts(Array.from(stringValues))}
        {this.renderTexts(Array.from(filenameValues))}
      </div>
    )
  }

  private renderTexts(opts: Str[]): JSX.Element[] {
    return opts.map(this.renderText)
  }

  private renderText(option: Str, key: number): JSX.Element {
    const { name, val } = option
    const className: string =
      val !== '' ? 'OptionTextInput' : 'OptionTextInput OptionTextInvalid'
    return (
      <div className="OptionText" key={key}>
        <input
          className={className}
          type="text"
          value={val}
          placeholder=" "
          onChange={e => option.setValue(e.target.value)}
          required
        />
        <label>{name}</label>
      </div>
    )
  }
}
