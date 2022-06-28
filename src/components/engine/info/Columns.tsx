import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { genKifuString } from '../../../handler/kifu/genKifuString'
import Point from '../../../model/shogi/Point'
import { StoreContext } from '../../../store/Store'
import './Columns.scss'

const Columns: FC = () => {
  const { engineState, gameState } = React.useContext(StoreContext)
  const { result } = engineState
  if (!result) return <div />

  const columns = result.map(i => {
    let prevDest: Point = gameState.currentMove.dest
    const moves = i.moves.map((m, n) => {
      const kifu = genKifuString(m, prevDest)
      const txt = kifu.length === 2 ? `${kifu[0]}　${kifu[1]}` : kifu
      prevDest = m.dest
      // TODO: key
      return (
        <div key={n} className="EngineInfoRowContent">
          {txt}
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
