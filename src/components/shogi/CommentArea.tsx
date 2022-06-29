import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { StoreContext } from '../../store/Store'
import './CommentArea.scss'

const CommentArea: FC = () => {
  const { gameState, displayState } = React.useContext(StoreContext)
  if (!displayState.showCommentArea) return null

  const cmt = gameState.currentMove.comment || ''

  return (
    <div className="CommentAreaContainer">
      <div className="CommentArea">
        <textarea className="CommentTextArea" value={cmt} readOnly={true} />
      </div>
    </div>
  )
}

export default observer(CommentArea)
