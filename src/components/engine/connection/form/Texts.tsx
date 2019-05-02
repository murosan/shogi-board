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
    const { strings, filenames, sbclient } = this.props

    const stringValues: OptionString[] = Array.from(strings.values())
    const filenameValues: OptionFilename[] = Array.from(filenames.values())

    const strElms: JSX.Element[] = stringValues.map((option, key) => (
      <Text key={key} option={option} sbclient={sbclient} />
    ))
    const fnElms: JSX.Element[] = filenameValues.map((option, key) => (
      <Text key={key} option={option} sbclient={sbclient} />
    ))

    return (
      <div>
        {strElms}
        {fnElms}
      </div>
    )
  }
}
