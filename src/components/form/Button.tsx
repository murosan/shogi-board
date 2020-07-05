import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import './Button.scss'

export interface Props {
  label: string
  onClick: () => Promise<void>
}

const Button: FC<Props> = (props: Props) => {
  return (
    <button className="FormButton" onClick={() => props.onClick()}>
      {props.label}
    </button>
  )
}

export default observer(Button)
