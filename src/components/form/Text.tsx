import { observer } from 'mobx-react-lite'
import React, { ChangeEvent, FC } from 'react'
import './Text.scss'

export interface Props {
  value: string
  label: string
  onChange: (s: string) => Promise<void>
  allowEmpty?: boolean
  placeholder?: string
}

const Text: FC<Props> = (props: Props) => {
  const { value, label, allowEmpty, placeholder } = props

  const classes = ['FormTextInput']
  if (!allowEmpty && value === '') classes.push('FormTextInvalid')
  const className: string = classes.join(' ')

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.value)
  }

  return (
    <div className="FormText">
      <input
        className={className}
        type="text"
        value={value}
        placeholder={placeholder || ' '}
        onChange={onChange}
        required
      />
      <label>{label}</label>
    </div>
  )
}

export default observer(Text)
