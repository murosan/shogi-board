import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { ShogiBoardClient } from '../../../../infrastructure/ShogiBoardClient'
import { Range as OptionRange } from '../../../../model/engine/Optoin'
import Range from './Range'

export interface Props {
  ranges: Map<string, OptionRange>
  sbclient: ShogiBoardClient
}

const Ranges: FC<Props> = (props: Props) => {
  const { ranges, sbclient } = props

  const elms: JSX.Element[] = Array.from(ranges).map(([name, option]) => (
    <Range key={name} option={option} sbclient={sbclient} />
  ))

  return <div>{elms}</div>
}

export default observer(Ranges)
