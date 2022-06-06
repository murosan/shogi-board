import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { Gote, Sente } from '../../model/shogi/Turn'
import { StoreContext } from '../../store/Store'
import Buttons from './Buttons'
import Captures from './Captures'
import './LeftSide.scss'
import UserInfo from './UserInfo'

const LeftSide: FC = () => {
  const { gameState } = React.useContext(StoreContext)
  const { turn, cap0, cap1 } = gameState.currentMove.pos
  const caps: number[] = gameState.isReversed ? cap0 : cap1
  const isTurn: boolean = gameState.isReversed ? turn === Sente : turn === Gote

  return (
    <div className="LeftSide">
      <Captures isLeftSide={true} captures={caps} isTurn={isTurn} />
      <div className="LeftInfo">
        <UserInfo isRightSide={false} />
        <Buttons />
      </div>
    </div>
  )
}

export default observer(LeftSide)
