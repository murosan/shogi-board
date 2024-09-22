import { observer } from 'mobx-react-lite'
import React, { CSSProperties, FC } from 'react'
import { Thinking } from '../model/engine/State'
import { StoreContext } from '../store/Store'
import './App.scss'
import SideInfo from './engine/info/SideInfo'
import WidthController from './setting/WidthController'
import BoardArea from './shogi/BoardArea'
import CommentArea from './shogi/CommentArea'

const App: FC = () => {
  const { engineState, config } = React.useContext(StoreContext)
  const { width } = config.boardWidth

  const isThinking: boolean = engineState.state === Thinking

  const classes: string[] = ['App']
  if (isThinking) classes.push('App-SideInfo')
  else classes.push('App-BoardOnly')

  const className = classes.join(' ')
  const style: CSSProperties = { width: width ? `${width}px` : '100%' }

  return (
    <div className="AppContainer" style={style}>
      <WidthController />
      <div className={className}>
        <BoardArea />
        {isThinking ? <SideInfo /> : null}
      </div>
      <CommentArea />
    </div>
  )
}

export default observer(App)
