import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { ShogiBoardClient } from '../../../../infrastructure/ShogiBoardClient'
import { Select as OptionSelect } from '../../../../model/engine/Optoin'
import Select from '../../../form/Select'

export interface Props {
  selects: Map<string, OptionSelect>
  sbclient: ShogiBoardClient
}

@observer
export default class Selects extends Component<Props> {
  render() {
    const { selects } = this.props

    const elms: JSX.Element[] = Array.from(selects).map(([name, option]) => {
      const onChange = this.getOnChange(option)
      return (
        <Select
          key={name}
          label={name}
          value={option.value}
          options={option.vars}
          onChange={onChange}
        />
      )
    })

    return <div>{elms}</div>
  }

  getOnChange = (option: OptionSelect) => async (s: string) => {
    const { sbclient } = this.props
    option.setValue(s)
    sbclient.updateSelect(option)
  }
}
