import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { genKifString } from '../../../lib/kif-handler/genKifString'
import { StoreContext } from '../../../store/Store'
import './Columns.scss'

const Columns: FC = () => {
  const { result } = React.useContext(StoreContext).engineState
  if (!result) return <div />

  const columns = result.map(i => {
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

  return <>{columns}</>
}

export default observer(Columns)
