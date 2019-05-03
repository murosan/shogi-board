import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { Store } from '../../../model/store/Store'
import './Columns.scss'
import { genKifString } from '../../../lib/kif-handler/genKifString'

interface Props {
  store?: Store
}

@inject('store')
@observer
export default class Columns extends Component<Props> {
  render(): JSX.Element[] | undefined {
    const { result } = this.props.store!.engineState
    if (!result) return

    return result.resultMap.map(([n, i]) => {
      // const r = i.movesList.map(m => {
      //   console.log(m.pieceid)
      //   const kif = genKifString({
      //     source: { row: m.source!.row, column: m.source!.column },
      //     dest: { row: m.dest!.row, column: m.dest!.column },
      //     piece: m.pieceid,
      //     promote: m.ispromoted,
      //   })
      //   return <div className="EngineInfoRow">{kif}</div>
      // })
      return (
        <div key={`EngineInfo-${n}`} className="EngineInfoColumn">
          <div className="EngineInfoRow">score</div>
          <div className="EngineInfoRow BB" title={`score: ${i.score}`}>
            {i.score}
          </div>
        </div>
      )
    })
  }
}
