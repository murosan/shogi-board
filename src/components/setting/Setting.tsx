import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { MockupHidden } from '../../model/display/MockupState'
import { StoreContext } from '../../store/Store'
import Check from '../form/Check'
import Text from '../form/Text'
import CloseButton from '../util/CloseButton'

const Setting: FC = () => {
  const { config, displayState } = React.useContext(StoreContext)
  const { paintTargets, serverURL, saveToLocalStorage } = config

  return (
    <div className="Mockup">
      <CloseButton onClick={() => displayState.setMockupState(MockupHidden)} />
      <h1>設定</h1>
      <Text
        label="shogi-board-server の URL"
        value={serverURL}
        allowEmpty={true}
        onChange={s => config.setServerURL(s)}
        placeholder="(例)http://localhost:8080"
      />
      <Check
        label="駒が移行できるマスに色を付ける"
        value={paintTargets}
        name="PaintTargets"
        onChange={b => config.setPaintTargets(b)}
      />
      <Check
        label="ブラウザに設定を保存する"
        value={saveToLocalStorage}
        name="SaveToCookie"
        onChange={b => config.setSaveToLocalStorage(b)}
      />
    </div>
  )
}

export default observer(Setting)
