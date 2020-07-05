import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { ShogiBoardClient } from '../../../../infrastructure/ShogiBoardClient'
import { Range as OptionRange } from '../../../../model/engine/Optoin'

export interface Props {
  option: OptionRange
  sbclient: ShogiBoardClient
}

const Range: FC<Props> = (props: Props) => {
  const { name, value, inputValue, min, max } = props.option
  // inputValue が Number && inRange のとき、 val に値をセットするようにしているため
  // val と inputValue が一致していれば正しい値
  const isValid: boolean = value.toString() === inputValue
  const className: string = 'FormTextInput' + (isValid ? '' : 'FormTextInvalid')
  const labelText: string = `${name}(${min}~${max})`

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { option, sbclient } = props
    option.setValue(e.target.value)
    return sbclient.updateRange(option)
  }

  return (
    <div className="FormText">
      <input
        className={className}
        type="text"
        value={inputValue}
        placeholder=" "
        onChange={onChange}
        required
        min={min}
        max={max}
      />
      <label>{labelText}</label>
    </div>
  )
}

export default observer(Range)
