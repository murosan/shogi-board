import React, { Component } from 'react'
import './Message.scss'

export interface Props {
  messages: string[]
}

export default class Message extends Component<Props> {
  render() {
    const m = this.props.messages.map((msg: string, i: number) => (
      <p key={i} className="Message">
        {msg}
      </p>
    ))
    return (
      <div className="MessageContainer">
        <div className="MessageBoard">{m}</div>
      </div>
    )
  }
}
