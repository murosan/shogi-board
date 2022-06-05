import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { StoreContext } from '../../store/Store'
import Check from '../form/Check'
import Text from '../form/Text'
import CloseButton from '../util/CloseButton'

const Setting: FC = () => {
  const { config, displayState } = React.useContext(StoreContext)
  const { paintTargets, serverURL, saveToLocalStorage, saveBoardWidth } = config

  return (
    <div className="Mockup">
      <CloseButton onClick={() => displayState.closeMockup()} />
      <h1>設定</h1>
      <Text
        label="shogi-board-server の URL"
        value={serverURL}
        allowEmpty={true}
        onChange={s => config.setServerURL(s)}
        placeholder="(例)http://localhost:8080"
      />
      <Check
        label="駒が移動できるマスに色を付ける"
        value={paintTargets}
        name="PaintTargets"
        onChange={b => config.setPaintTargets(b)}
      />
      <Check
        label="ブラウザに設定を保存する"
        value={saveToLocalStorage}
        name="SaveToLocalStorage"
        onChange={b => config.setSaveToLocalStorage(b)}
      />
      <Check
        label="盤の幅を記憶する"
        value={saveBoardWidth}
        name="SaveBoardWidth"
        onChange={b => config.setSaveBoardWidth(b)}
      />
    </div>
  )
}

export default observer(Setting)
