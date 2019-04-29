import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { Select as OptionSelect } from '../../../../model/engine/Optoin'
import { ShogiBoardClient } from '../../../../proto/factory'
import Select from './Select'
import './Selects.scss'

export interface Props {
  selects: Map<string, OptionSelect>
  sbclient: ShogiBoardClient
}

@observer
export default class Selects extends Component<Props> {
  render() {
    const values: OptionSelect[] = Array.from(this.props.selects.values())
    const selects: JSX.Element[] = values.map((option, key) => (
      <Select key={key} option={option} sbclient={this.props.sbclient} />
    ))
    return <div>{selects}</div>
  }
}
