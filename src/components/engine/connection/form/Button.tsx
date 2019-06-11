import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { ShogiBoardClient } from '../../../../infrastructure/ShogiBoardClient'
import { Button as OptionButton } from '../../../../model/engine/Optoin'

export interface Props {
  option: OptionButton
  sbclient: ShogiBoardClient
}

@observer
export default class Button extends Component<Props> {
  render() {
    const name: string = this.props.option.name
    return (
      <button className="ButtonApply" onClick={this.update}>
        {name}
      </button>
    )
  }

  private update: () => void = () => {
    const { option, sbclient } = this.props
    option.setValue(1)
    sbclient.updateButton(option)
  }
}
