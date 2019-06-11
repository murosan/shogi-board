import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { ShogiBoardClient } from '../../../../infrastructure/ShogiBoardClient'
import { Text as OptionText } from '../../../../model/engine/Optoin'
import Text from './Text'
import './Text.scss'

export interface Props {
  texts: Map<string, OptionText>
  sbclient: ShogiBoardClient
}

@observer
export default class Texts extends Component<Props> {
  render() {
    const { texts, sbclient } = this.props

    const strElms: JSX.Element[] = Array.from(texts).map(([name, option]) => (
      <Text key={name} option={option} sbclient={sbclient} />
    ))

    return <div>{strElms}</div>
  }
}
