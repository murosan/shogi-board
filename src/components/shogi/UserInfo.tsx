import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { HandicapKinds } from '../../model/shogi/InitialPositions'
import { StoreContext } from '../../store/Store'
import './UserInfo.scss'

export interface Props {
  isRightSide: boolean
}

const UserInfo: FC<Props> = (props: Props) => {
  const { gameState } = React.useContext(StoreContext)
  const { player, handicap } = gameState.kifu.meta

  const isHirate = handicap === HandicapKinds.hirate
  const { isRightSide } = props
  const isReversed = gameState.isReversed

  const isSente = (isRightSide && !isReversed) || (!isRightSide && isReversed)

  const name = isSente ? player.sente : player.gote
  if (!name) return <div />

  const label = () => {
    if (isHirate && isSente) return '先手'
    if (isHirate) return '後手'
    if (isSente) return '下手'
    return '上手'
  }

  const uinfoClass = (isRightSide ? 'Right' : 'Left') + ' UserInfo'
  const unameClass =
    (isRightSide ? 'UserNameBottom' : 'UserNameTop') + ' UserName'

  return (
    <div className={uinfoClass}>
      <div className={unameClass}>
        <span className="Label">{label() + ':'}</span>
        <span className="Name" title={name}>
          {name}
        </span>
      </div>
    </div>
  )
}

export default observer(UserInfo)
