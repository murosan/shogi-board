import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { ShogiBoardClient } from '../../../../infrastructure/ShogiBoardClient'
import { Button as OptionButton } from '../../../../model/engine/Optoin'
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

    const elms: JSX.Element[] = Array.from(buttons).map(([name, option]) => (
      <Button key={name} option={option} sbclient={sbclient} />
    ))

    return <div className="OptionButton">{elms}</div>
  }
}
