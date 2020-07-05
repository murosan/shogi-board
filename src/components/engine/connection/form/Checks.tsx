import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { ShogiBoardClient } from '../../../../infrastructure/ShogiBoardClient'
import { Check as OptionCheck } from '../../../../model/engine/Optoin'
import Check from '../../../form/Check'

export interface Props {
  checks: Map<string, OptionCheck>
  sbclient: ShogiBoardClient
}

const Checks: FC<Props> = (props: Props) => {
  const checks = Array.from(props.checks)
  const elms: JSX.Element[] = checks.map(([name, option]) => {
    const onChange = (b: boolean) => {
      option.setValue(b)
      return props.sbclient.updateCheck(option)
    }

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

export default observer(Checks)
