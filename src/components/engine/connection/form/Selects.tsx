import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { ShogiBoardClient } from '../../../../infrastructure/ShogiBoardClient'
import { Select as OptionSelect } from '../../../../model/engine/Optoin'
import Select from './Select'
import './Selects.scss'

export interface Props {
  selects: Map<string, OptionSelect>
  sbclient: ShogiBoardClient
}

@observer
export default class Selects extends Component<Props> {
  render() {
    const { selects, sbclient } = this.props

    const elms: JSX.Element[] = Array.from(selects).map(([name, option]) => (
      <Select key={name} option={option} sbclient={sbclient} />
    ))

    return <div>{elms}</div>
  }
}
