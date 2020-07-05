import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { Gote, Sente } from '../../model/shogi/Turn'
import { StoreContext } from '../../store/Store'
import Buttons from './Buttons'
import Captures from './Captures'
import './LeftSide.scss'

const LeftSide: FC = () => {
  const { indexes, currentMove } = React.useContext(StoreContext).gameState
  const { turn, cap0, cap1 } = currentMove.pos
  const caps: number[] = indexes[0] === -1 ? cap1 : cap0
  const isTurn: boolean = indexes[0] === -1 ? turn === Gote : turn === Sente

  return (
    <div className="LeftSide">
      <Captures isLeftSide={true} captures={caps} isTurn={isTurn} />
      <div className="LeftInfo">
        <div />
        <Buttons />
      </div>
    </div>
  )
}

export default observer(LeftSide)
