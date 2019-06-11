import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { ShogiBoardClient } from '../../../../infrastructure/ShogiBoardClient'
import { Check as OptionCheck } from '../../../../model/engine/Optoin'
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

    const elms: JSX.Element[] = Array.from(checks).map(([name, option]) => (
      <Check key={name} option={option} sbclient={sbclient} />
    ))

    return <div>{elms}</div>
  }
}
