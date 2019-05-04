import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { genKifString } from '../../../lib/kif-handler/genKifString'
import { Store } from '../../../model/store/Store'
import './Columns.scss'

interface Props {
  store?: Store
}

@inject('store')
@observer
export default class Columns extends Component<Props> {
  render(): JSX.Element[] | JSX.Element {
    const { result } = this.props.store!.engineState
    if (!result) return <div />

    return result.map(i => {
      const moves = i.moves.map((m, n) => {
        const kif = genKifString(m, true)
        // TODO: key
        return (
          <div key={n} className="EngineInfoRowContent">
            {kif}
          </div>
        )
      })

      return (
        <div key={i.id} className="EngineInfoColumn">
          <div className="EngineInfoRow EngineInfoRowContainer">
            <div className="EngineInfoRowLabel">score</div>
            <div className="EngineInfoRowContent Center">{i.score}</div>
          </div>
          <div className="EngineInfoRow EngineInfoRowContainer">
            <div className="EngineInfoRowLabel">読み</div>
            {moves}
          </div>
        </div>
      )
    })
  }
}
