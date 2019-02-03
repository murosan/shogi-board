import { inject, observer } from 'mobx-react'
import React, { Component, KeyboardEvent } from 'react'
import { Store } from '../../store/GameStateStore'
import './Message.scss'

export interface Props {
  store?: Store
  messages: string[]
}

@inject('store')
@observer
export default class Message extends Component<Props> {
  private closeBtnID: string = 'CloseMessage'
  render() {
    const m = this.props.messages.map((msg: string, i: number) => (
      <p key={i} className="Message">
        {msg}
      </p>
    ))
    return (
      <div className="MessageContainer">
        <div className="MessageBoard">
          {m}
          <input
            type="button"
            id={this.closeBtnID}
            onKeyDown={e => this.close(e)}
            onClick={() => this.close()}
            value="OK"
          />
        </div>
      </div>
    )
  }

  close(_?: KeyboardEvent) {
    this.props.store!.clearMessages()
  }

  componentDidMount() {
    const elm = document.getElementById(this.closeBtnID)
    if (!elm) return
    elm.focus()
  }
}
