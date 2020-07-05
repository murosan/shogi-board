import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { Thinking } from '../model/engine/State'
import { StoreContext } from '../store/Store'
import './App.scss'
import SideInfo from './engine/info/SideInfo'
import BoardArea from './shogi/BoardArea'

const App: FC = () => {
  const { engineState } = React.useContext(StoreContext)

  const isThinking: boolean = engineState.state === Thinking
  const className = 'App App-' + (isThinking ? 'SideInfo' : 'BoardOnly')

  return (
    <div className={className}>
      <BoardArea />
      {isThinking ? <SideInfo /> : null}
    </div>
  )
}

export default observer(App)
