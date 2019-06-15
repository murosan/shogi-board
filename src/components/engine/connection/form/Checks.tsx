import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { ShogiBoardClient } from '../../../../infrastructure/ShogiBoardClient'
import { Check as OptionCheck } from '../../../../model/engine/Optoin'
import Check from '../../../form/Check'

export interface Props {
  checks: Map<string, OptionCheck>
  sbclient: ShogiBoardClient
}

@observer
export default class Checks extends Component<Props> {
  render() {
    const { checks } = this.props

    const elms: JSX.Element[] = Array.from(checks).map(([name, option]) => {
      const onChange = this.getOnChange(option)
      return (
        <Check
          key={name}
          label={name}
          name={name}
          value={option.value}
          onChange={onChange}
        />
      )
    })

    return <div>{elms}</div>
  }

  getOnChange = (option: OptionCheck) => async (b: boolean) => {
    const { sbclient } = this.props
    option.setValue(b)
    sbclient.updateCheck(option)
  }
}
