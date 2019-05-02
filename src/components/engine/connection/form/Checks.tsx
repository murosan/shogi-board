import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { Check as OptionCheck } from '../../../../model/engine/Optoin'
import { ShogiBoardClient } from '../../../../proto/factory'
import Check from './Check'
import './Checks.scss'

export interface Props {
  checks: Map<string, OptionCheck>
  sbclient: ShogiBoardClient
}

@observer
export default class Checks extends Component<Props> {
  render() {
    const { checks, sbclient } = this.props
    const values: OptionCheck[] = Array.from(checks.values())

    const elms: JSX.Element[] = values.map((option, key) => (
      <Check key={key} option={option} sbclient={sbclient} />
    ))

    return <div>{elms}</div>
  }
}
