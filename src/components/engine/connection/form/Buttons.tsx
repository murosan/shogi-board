import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { ShogiBoardClient } from '../../../../infrastructure/ShogiBoardClient'
import { Button as OptionButton } from '../../../../model/engine/Optoin'
import Button from '../../../form/Button'
import './Buttons.scss'

export interface Props {
  buttons: Map<string, OptionButton>
  sbclient: ShogiBoardClient
}

const Buttons: FC<Props> = (props: Props) => {
  const buttons = Array.from(props.buttons)
  const elms: JSX.Element[] = buttons.map(([name, option]) => {
    const onClick = () => props.sbclient.updateButton(option)
    return <Button key={name} label={name} onClick={onClick} />
  })

  return <div className="OptionButton">{elms}</div>
}

export default observer(Buttons)
