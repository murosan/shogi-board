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
    const values: OptionRange[] = Array.from(this.props.ranges.values())
    const ranges: JSX.Element[] = values.map((option, key) => (
      <Range key={key} option={option} sbclient={this.props.sbclient} />
    ))
    return (
      <div className="OptionContainer">
        <h3 className="OptionType">Range</h3>
        <div>{ranges}</div>
      </div>
    )
  }
}
