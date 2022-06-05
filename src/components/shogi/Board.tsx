import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import {
  MockupEngineControl,
  MockupKifu,
  MockupServerSetting,
  MockupSetting,
} from '../../model/display/MockupState'
import { StoreContext } from '../../store/Store'
import Controller from '../engine/connection/Controller'
import KifuMockup from '../kifu/KifuMockup'
import Setting from '../setting/Setting'
import './Board.scss'
import Cell from './Cell'

const Board: FC = () => {
  const { gameState, displayState } = React.useContext(StoreContext)
  const idx = gameState.indexes
  const rows = idx.map(r =>
    idx
      .slice()
      .reverse()
      .map(c => <Cell key={r * 10 + c} row={r} column={c} />)
  )

  return (
    <div className="BoardContainer">
      <div className="ResetPseudo">
        <div className="Board">{rows}</div>
        {renderMockup()}
      </div>
    </div>
  )

  function renderMockup() {
    const { mockup } = displayState
    if (mockup === MockupEngineControl) return <Controller />
    // TODO: server setting は別に分ける？
    if (mockup === MockupSetting || mockup === MockupServerSetting)
      return <Setting />
    if (mockup === MockupKifu) return <KifuMockup />
  }
}

export default observer(Board)
