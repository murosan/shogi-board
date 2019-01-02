import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { Store } from '../../store/GameStateStore'
import './Buttons.scss'

export interface Props {
  store?: Store
}

@inject('store')
@observer
export default class Buttons extends Component<Props> {
  render(): JSX.Element {
    return (
      <div className="ButtonsContainer">
        <button className="PrevOne">＜</button>
        <button className="NextOne">＞</button>
        <button className="PrevFive">＜ 5</button>
        <button className="NextFive">5 ＞</button>
        <button className="ToHead">｜＜＜</button>
        <button className="ToLast">＞＞｜</button>
        <button className="Reverse" onClick={() => this.props.store!.reverse()}>
          盤面反転
        </button>
        <button className="Copy">棋譜コピー</button>
      </div>
    )
  }
}
