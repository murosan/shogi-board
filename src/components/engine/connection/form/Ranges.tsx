import React, { Component } from 'react'
import { Spin as OptionRange } from '../../../../model/engine/Optoin'
import './Text.scss'

export interface Props {
  ranges: Map<string, OptionRange>
  onChange: (name: string, val: number) => void
}

export default class Ranges extends Component<Props> {
  render() {
    return <div>{this.renderRanges()}</div>
  }

  renderRanges() {
    const elms: JSX.Element[] = []
    const values = this.props.ranges.values()

    let { value } = values.next()
    let i = 0
    while (value) {
      const { name, val, min, max } = value
      elms.push(
        <div className="OptionText" key={i}>
          <input
            type="text"
            value={val}
            placeholder=" "
            onChange={e => this.update(e.target.value, name, min, max)}
          />
          <label>{`${name}(${min}~${max})`}</label>
        </div>
      )

      i++
      value = values.next().value
    }

    return elms
  }

  update(inputValue: string, name: string, min: number, max: number) {
    // TODO: validation
    const n: number = Number(inputValue)
    if (Number.isNaN(n)) {
      console.error('input value is not a number.', inputValue)
      return
    }
    if (n < min || n > max) {
      console.error('input value is out of range', n)
      return
    }
    this.props.onChange(name, n)
  }
}
