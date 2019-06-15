import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { ShogiBoardClient } from '../../../../infrastructure/ShogiBoardClient'
import { Range as OptionRange } from '../../../../model/engine/Optoin'
import Range from './Range'

export interface Props {
  ranges: Map<string, OptionRange>
  sbclient: ShogiBoardClient
}

@observer
export default class Ranges extends Component<Props> {
  render() {
    const { ranges, sbclient } = this.props

    const elms: JSX.Element[] = Array.from(ranges).map(([name, option]) => (
      <Range key={name} option={option} sbclient={sbclient} />
    ))

    return <div>{elms}</div>
  }
}
