import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { ShogiBoardClient } from '../../../../infrastructure/ShogiBoardClient'
import { Text as OptionText } from '../../../../model/engine/Optoin'
import Text from '../../../form/Text'

export interface Props {
  texts: Map<string, OptionText>
  sbclient: ShogiBoardClient
}

const Texts: FC<Props> = (props: Props) => {
  const texts = Array.from(props.texts)

  const strElms: JSX.Element[] = texts.map(([name, option]) => {
    const onChange = (s: string) => {
      option.setValue(s)
      return props.sbclient.updateText(option)
    }

    return (
      <Text key={name} label={name} value={option.value} onChange={onChange} />
    )
  })

  return <div>{strElms}</div>
}

export default observer(Texts)
