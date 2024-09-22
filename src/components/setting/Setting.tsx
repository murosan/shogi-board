import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { StoreContext } from '../../store/Store'
import Check from '../form/Check'
import Text from '../form/Text'
import CloseButton from '../util/CloseButton'

const Setting: FC = () => {
  const { config, displayState } = React.useContext(StoreContext)

  return (
    <div className="Mockup">
      <CloseButton onClick={() => displayState.closeMockup()} />
      <h1>設定</h1>
      <Text
        label="shogi-board-serverのURL"
        value={config.serverURL}
        allowEmpty={true}
        onChange={s => config.setServerURL(s)}
        placeholder="(例)http://localhost:8080"
      />
      <Check
        label="駒が移動できるマスに色を付ける"
        value={config.paintTargets}
        name="PaintTargets"
        onChange={b => config.setPaintTargets(b)}
      />
      <Check
        label="棋譜をブラウザに保存する"
        value={config.saveKifuToLocalStorage}
        name="SaveKifuToLocalStorage"
        onChange={b => config.setSaveKifuToLocalStorage(b)}
      />
      <Check
        label="盤の幅をブラウザに保存する"
        value={config.boardWidth.save}
        name="SaveBoardWidth"
        onChange={b => config.setSaveBoardWidth(b)}
      />
    </div>
  )
}

export default observer(Setting)
