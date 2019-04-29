import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { Button as OptionButton } from '../../../../model/engine/Optoin'
import { ShogiBoardClient } from '../../../../proto/factory'

export interface Props {
  option: OptionButton
  sbclient: ShogiBoardClient
}

@observer
export default class Button extends Component<Props> {
  constructor(props: Props) {
    super(props)
    this.update = this.update.bind(this)
  }

  render() {
    const name: string = this.props.option.name
    return (
      <button className="ButtonApply" onClick={this.update}>
        {name}
      </button>
    )
  }

  private update(): void {
    const { option, sbclient } = this.props
    option.setValue(1)
    sbclient.updateButton(option)
  }
}
