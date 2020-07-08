import { observer } from 'mobx-react-lite'
import React, { CSSProperties, FC } from 'react'
import { Thinking } from '../model/engine/State'
import { StoreContext } from '../store/Store'
import './App.scss'
import SideInfo from './engine/info/SideInfo'
import WidthController from './setting/WidthController'
import BoardArea from './shogi/BoardArea'

const App: FC = () => {
  const { engineState, config } = React.useContext(StoreContext)
  const { appWidth } = config

  const isThinking: boolean = engineState.state === Thinking
  const className = 'App App-' + (isThinking ? 'SideInfo' : 'BoardOnly')

  const style: CSSProperties = { width: appWidth ? `${appWidth}px` : '100%' }

  return (
    <div className="AppContainer" style={style}>
      <WidthController />
      <div className={className}>
        <BoardArea />
        {isThinking ? <SideInfo /> : null}
      </div>
    </div>
  )
}

export default observer(App)
