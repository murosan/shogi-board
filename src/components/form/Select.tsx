import { observer } from 'mobx-react-lite'
import React, { ChangeEvent, FC } from 'react'
import './Select.scss'

export interface Props {
  label: string
  value: string
  options: string[]
  onChange: (s: string) => Promise<void>
}

const Select: FC<Props> = (props: Props) => {
  const { label, value, options } = props
  const opts = options.map((value: string, i: number) => (
    <option key={i} value={value}>
      {value}
    </option>
  ))

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    props.onChange(e.target.value)
  }

  return (
    <div className="FormSelectContainer">
      <label>{label}</label>
      <div className="FormSelect SelectTriangle">
        <select onChange={onChange} value={value} required>
          {opts}
        </select>
      </div>
    </div>
  )
}

export default observer(Select)
