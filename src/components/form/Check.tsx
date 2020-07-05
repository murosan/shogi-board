import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import './Check.scss'

export interface Props {
  label: string
  value: boolean
  name: string
  onChange: (b: boolean) => Promise<void>
}

const Check: FC<Props> = (props: Props) => {
  const { label, value, name } = props
  const id = `FormCheck-${name}`

  return (
    <div className="FormCheck">
      <span>{label}</span>
      <div className="FormCheckToggle">
        <input
          id={id}
          name={id}
          type="checkbox"
          onChange={e => props.onChange(e.target.checked)}
          checked={value}
        />
        <label htmlFor={id}>
          <div
            className="ToggleSwitch"
            data-checked="ON"
            data-unchecked="OFF"
          />
        </label>
      </div>
    </div>
  )
}

export default observer(Check)
