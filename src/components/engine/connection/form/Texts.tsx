import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { ShogiBoardClient } from '../../../../infrastructure/ShogiBoardClient'
import { Text as OptionText } from '../../../../model/engine/Optoin'
import Text from '../../../form/Text'

export interface Props {
  texts: Map<string, OptionText>
  sbclient: ShogiBoardClient
}

@observer
export default class Texts extends Component<Props> {
  render() {
    const { texts } = this.props

    const strElms: JSX.Element[] = Array.from(texts).map(([name, option]) => {
      const onChange = this.getOnChange(option)
      return (
        <Text
          key={name}
          label={name}
          value={option.value}
          onChange={onChange}
        />
      )
    })

    return <div>{strElms}</div>
  }

  getOnChange = (option: OptionText) => async (s: string) => {
    const { sbclient } = this.props
    option.setValue(s)
    sbclient.updateText(option)
  }
}
