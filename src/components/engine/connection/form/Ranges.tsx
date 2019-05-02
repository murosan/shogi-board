import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { Spin as OptionRange } from '../../../../model/engine/Optoin'
import { ShogiBoardClient } from '../../../../proto/factory'
import Range from './Range'
import './Text.scss'

export interface Props {
  ranges: Map<string, OptionRange>
  sbclient: ShogiBoardClient
}

@observer
export default class Ranges extends Component<Props> {
  render() {
    const { ranges, sbclient } = this.props
    const values: OptionRange[] = Array.from(ranges.values())

    const elms: JSX.Element[] = values.map((option, key) => (
      <Range key={key} option={option} sbclient={sbclient} />
    ))

    return <div>{elms}</div>
  }
}
