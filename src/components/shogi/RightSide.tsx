import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { Gote, Sente } from '../../model/shogi/Turn'
import { StoreContext } from '../../store/Store'
import Captures from './Captures'
import Kifu from './Kifu'
import './RightSide.scss'
import UserInfo from './UserInfo'

const RightSide: FC = () => {
  const { gameState } = React.useContext(StoreContext)
  const { turn, cap0, cap1 } = gameState.currentMove.pos
  const caps: number[] = gameState.isReversed ? cap1 : cap0
  const isTurn: boolean = gameState.isReversed ? turn === Gote : turn === Sente

  return (
    <div className="RightSide">
      <div className="RightInfo">
        <Kifu />
        <UserInfo isRightSide={true} />
      </div>
      <Captures isLeftSide={false} captures={caps} isTurn={isTurn} />
    </div>
  )
}

export default observer(RightSide)
