import React, { Component } from 'react'
import { Button as OptionButton } from '../../../../model/engine/Optoin'
import './Buttons.scss'

export interface Props {
  buttons: Map<string, OptionButton>
  onClick: (name: string) => void
}

export default class Buttons extends Component<Props> {
  render() {
    return <div className="OptionButton">{this.renderButtons()}</div>
  }

  renderButtons() {
    const elms: JSX.Element[] = []
    const values = this.props.buttons.values()

    let { value } = values.next()
    let i = 0
    while (value) {
      const name: string = value.name
      elms.push(
        <button
          key={i}
          className="ButtonApply"
          onClick={() => this.props.onClick(name)}
        >
          {name}
        </button>
      )

      i++
      value = values.next().value
    }

    return elms
  }
}
