import { observer } from 'mobx-react'
import React, { Component } from 'react'
import './Text.scss'

export interface Props {
  value: string
  label: string
  onChange: (s: string) => Promise<void>
  allowEmpty?: boolean
}

@observer
export default class Text extends Component<Props> {
  render(): JSX.Element {
    const { value, label, allowEmpty } = this.props

    const classes = ['FormTextInput']
    if (allowEmpty !== true && value === '') classes.push('FormTextInvalid')
    const className: string = classes.join(' ')

    return (
      <div className="FormText">
        <input
          className={className}
          type="text"
          value={value}
          placeholder=" "
          onChange={this.onChange}
          required
        />
        <label>{label}</label>
      </div>
    )
  }

  private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(e.target.value)
  }
}
