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
    const { buttons, sbclient } = this.props
    const values: OptionButton[] = Array.from(buttons.values())

    const elms: JSX.Element[] = values.map((option, key) => (
      <Button key={key} option={option} sbclient={sbclient} />
    ))

    return <div className="OptionButton">{elms}</div>
  }
}
