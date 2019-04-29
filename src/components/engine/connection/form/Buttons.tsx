import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { Button as OptionButton } from '../../../../model/engine/Optoin'
import { ShogiBoardClient } from '../../../../proto/factory'
import Button from './Button'
import './Buttons.scss'

export interface Props {
  buttons: Map<string, OptionButton>
  sbclient: ShogiBoardClient
}

@observer
export default class Buttons extends Component<Props> {
  render() {
    const values: OptionButton[] = Array.from(this.props.buttons.values())
    const buttons: JSX.Element[] = values.map((option, key) => (
      <Button key={key} option={option} sbclient={this.props.sbclient} />
    ))

    return <div className="OptionButton">{buttons}</div>
  }
}
