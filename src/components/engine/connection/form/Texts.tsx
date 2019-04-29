import { observer } from 'mobx-react'
import React, { Component } from 'react'
import {
  Filename as OptionFilename,
  String as OptionString,
} from '../../../../model/engine/Optoin'
import { ShogiBoardClient } from '../../../../proto/factory'
import Text from './Text'
import './Text.scss'

export interface Props {
  strings: Map<string, OptionString>
  filenames: Map<string, OptionFilename>
  sbclient: ShogiBoardClient
}

@observer
export default class Texts extends Component<Props> {
  render() {
    const stringValues: OptionString[] = Array.from(this.props.strings.values())
    const filenameValues: OptionFilename[] = Array.from(
      this.props.filenames.values()
    )

    const strings: JSX.Element[] = stringValues.map((option, key) => (
      <Text key={key} option={option} sbclient={this.props.sbclient} />
    ))
    const filenames: JSX.Element[] = filenameValues.map((option, key) => (
      <Text key={key} option={option} sbclient={this.props.sbclient} />
    ))

    return (
      <div>
        <div className="OptionContainer">
          <h3 className="OptionType">String</h3>
          {strings}
        </div>
        <div className="OptionContainer">
          <h3 className="OptionType">Filename</h3>
          {filenames}
        </div>
      </div>
    )
  }
}
