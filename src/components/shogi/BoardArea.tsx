import React, { FC } from 'react'
import Board from './Board'
import './BoardArea.scss'
import LeftSide from './LeftSide'
import RightSide from './RightSide'

const BoardArea: FC = () => {
  return (
    <div className="BoardArea">
      <LeftSide />
      <Board />
      <RightSide />
    </div>
  )
}

export default BoardArea
