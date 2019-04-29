import { observer } from 'mobx-react'
import React, { Component } from 'react'
import {
  Filename as OptionFilename,
  Str,
  String as OptionString,
} from '../../../../model/engine/Optoin'
import { ShogiBoardClient } from '../../../../proto/factory'
import './Text.scss'
import Text from './Text'

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
        {strings}
        {filenames}
      </div>
    )
  }
}
