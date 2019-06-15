import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { ShogiBoardClient } from '../../../../infrastructure/ShogiBoardClient'
import { Button as OptionButton } from '../../../../model/engine/Optoin'
import Button from '../../../form/Button'
import './Buttons.scss'

export interface Props {
  buttons: Map<string, OptionButton>
  sbclient: ShogiBoardClient
}

@observer
export default class Buttons extends Component<Props> {
  render() {
    const { buttons } = this.props

    const elms: JSX.Element[] = Array.from(buttons).map(([name, option]) => {
      const onClick = this.getOnClick(option)
      return <Button key={name} label={name} onClick={onClick} />
    })

    return <div className="OptionButton">{elms}</div>
  }

  getOnClick = (option: OptionButton) => async () => {
    const { sbclient } = this.props
    sbclient.updateButton(option)
  }
}
