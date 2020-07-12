import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { genKifString } from '../../../lib/kif-handler/genKifString'
import { StoreContext } from '../../../store/Store'
import './Columns.scss'
import Point from '../../../model/shogi/Point'

const Columns: FC = () => {
  const { engineState, gameState } = React.useContext(StoreContext)
  const { result } = engineState
  if (!result) return <div />

  const columns = result.map(i => {
    let prevDest: Point | null = gameState.prevDestination
    const moves = i.moves.map((m, n) => {
      if (prevDest) m.prevDest = prevDest
      const kif = genKifString(m)
      prevDest = m.dest
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
