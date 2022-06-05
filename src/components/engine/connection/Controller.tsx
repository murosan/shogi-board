import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { Connecting, NotConnected } from '../../../model/engine/State'
import { EngineState } from '../../../store/EngineState'
import { Store, StoreContext } from '../../../store/Store'
import CloseButton from '../../util/CloseButton'
import Detail from './Detail'
import List from './List'

const Controller: FC = () => {
  const { engineState, displayState }: Store = React.useContext(StoreContext)
  const { state }: EngineState = engineState

  // 接続前なら将棋エンジンの一覧画面を出す
  const isList: boolean = state === NotConnected || state === Connecting
  const child: JSX.Element = isList ? <List /> : <Detail />

  const onClick = () => displayState.closeMockup()

  return (
    <div className="Mockup">
      <CloseButton onClick={onClick} />
      {child}
    </div>
  )
}

export default observer(Controller)
