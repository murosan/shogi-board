import { observer } from 'mobx-react'
import React, { Component } from 'react'
import './Button.scss'

export interface Props {
  label: string
  onClick: () => Promise<void>
}

@observer
export default class Button extends Component<Props> {
  render() {
    const { label } = this.props
    return (
      <button className="FormButton" onClick={() => this.props.onClick()}>
        {label}
      </button>
    )
  }
}
