import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { Gote, Sente } from '../../model/shogi/Turn'
import { StoreContext } from '../../store/Store'
import Captures from './Captures'
import Kif from './Kif'
import './RightSide.scss'

const RightSide: FC = () => {
  const { indexes, currentMove } = React.useContext(StoreContext).gameState
  const { turn, cap0, cap1 } = currentMove.pos
  const caps: number[] = indexes[0] === 9 ? cap1 : cap0
  const isTurn: boolean = indexes[0] === 9 ? turn === Gote : turn === Sente

  return (
    <div className="RightSide">
      <div className="RightInfo">
        <Kif />
      </div>
      <Captures isLeftSide={false} captures={caps} isTurn={isTurn} />
    </div>
  )
}

export default observer(RightSide)
