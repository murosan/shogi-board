import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { Button as OptionButton } from '../../../../model/engine/Optoin'
import './Buttons.scss'

export interface Props {
  buttons: Map<string, OptionButton>
  onClick: (name: string) => void
}

@observer
export default class Buttons extends Component<Props> {
  render() {
    return <div className="OptionButton">{this.renderButtons()}</div>
  }

  private renderButtons(): JSX.Element[] {
    const values = this.props.buttons.values()
    return Array.from(values).map((option: OptionButton, i: number) =>
      this.renderButton(i, option)
    )
  }

  private renderButton(key: number, option: OptionButton): JSX.Element {
    const name: string = option.name
    return (
      <button
        key={key}
        className="ButtonApply"
        onClick={() => option.setValue(1)}
      >
        {name}
      </button>
    )
  }
}
