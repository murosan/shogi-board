import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { ShogiBoardClient } from '../../../../infrastructure/ShogiBoardClient'
import { Select as OptionSelect } from '../../../../model/engine/Optoin'
import Select from '../../../form/Select'

export interface Props {
  selects: Map<string, OptionSelect>
  sbclient: ShogiBoardClient
}

const Selects: FC<Props> = (props: Props) => {
  const selects = Array.from(props.selects)

  const elms: JSX.Element[] = selects.map(([name, option]) => {
    const onChange = (s: string) => {
      option.setValue(s)
      return props.sbclient.updateSelect(option)
    }

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

export default observer(Selects)
