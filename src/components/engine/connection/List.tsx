import { observer } from 'mobx-react-lite'
import React, { FC, useEffect, useRef } from 'react'
import { Connecting, NotConnected, State } from '../../../model/engine/State'
import { Store } from '../../../store/Store'
import { StoreContext } from '../../../store/Store'
import Loader from '../../util/Loader'
import './List.scss'

const List: FC = () => {
  const store: Store = React.useContext(StoreContext)
  const { engineState } = store
  const latestEngineState = useRef(engineState)
  const { names, current, state } = engineState

  useEffect(() => {
    const engineState = latestEngineState.current
    engineState.sbclient
      .init()
      .then((list: string[]) => engineState.setNames(list))
      .catch(err => {
        const msg = [
          '接続に失敗しました。以下を確認してください。',
          '1. サーバーが起動しているか',
          '2. サーバーのURLが正しいか',
          '3. サーバーのログを確認し、エラー等が出ていないか',
          '4. サーバーで将棋エンジンの実行パスを設定したか',
          '5. 将棋エンジンが実行可能であるか',
        ].join('\n')
        console.error(err)
        engineState.disconnect()
        alert(msg)
      })
  }, [])

  if (names.length === 0)
    return (
      <div className="ListEngineName">
        <span>利用可能な将棋エンジンが設定されていません</span>
      </div>
    )

  const engineNames = names.map((name, i) => {
    const isCurrent: boolean = name === current
    const loading: boolean = isCurrent && state === Connecting
    const loader = loading ? <Loader /> : undefined
    const onClick = () => setCurrentEngine(name, state)
    return (
      <div className="ListEngineName" key={i} onClick={onClick}>
        {loader}
        <span>{name}</span>
      </div>
    )
  })

  return <>{engineNames}</>

  async function setCurrentEngine(name: string, state: State): Promise<void> {
    if (state !== NotConnected) return
    await engineState.connect(name)
    await store.updatePosition().catch(e => console.error(e))
  }
}

export default observer(List)
