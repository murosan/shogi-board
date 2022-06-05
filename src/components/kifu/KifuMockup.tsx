import { observer } from 'mobx-react-lite'
import React, { FC, useState } from 'react'
import { getAsString } from '../../handler/kifu/getAsString'
import { KifuFormats, KifuParser } from '../../lib/parser/parsers/kifu'
import { Store, StoreContext } from '../../store/Store'
import Button from '../form/Button'
import Checkmark from '../util/Checkmark'
import CloseButton from '../util/CloseButton'
import Loader from '../util/Loader'
import './KifuMockup.scss'

const ParseState = {
  standby: 'standby',
  parsing: 'parsing',
  success: 'success',
  failure: 'failure',
}

const KifuMockup: FC = () => {
  const [copied, setCopied] = useState(false)
  const [parseState, setParseState] = useState(ParseState.standby)

  const { gameState, displayState }: Store = React.useContext(StoreContext)
  const { kifu } = gameState

  const checkmarkTimeout = 1500

  const copyKifuOnClick: () => Promise<void> = async () => {
    const txt = getAsString(kifu)
    await navigator.clipboard.writeText(txt)
    setCopied(true)
    setTimeout(() => setCopied(false), checkmarkTimeout)
  }

  const issueLink = 'https://github.com/murosan/shogi-board/issues/new'
  const readOnClick: () => Promise<void> = async () => {
    setParseState(ParseState.parsing)
    const txt = await navigator.clipboard.readText()
    const result = KifuParser(KifuFormats.kif).parse(txt)
    if (!result) {
      setParseState(ParseState.failure)
      const text = [
        '読み込みに失敗しました。',
        '不具合報告はissueへお願いします。',
        issueLink,
      ].join('\n')
      alert(text)
      return
    }
    setParseState(ParseState.success)
    gameState.setKifu(result.value)
    displayState.closeMockup()
  }

  return (
    <div className="Mockup">
      <CloseButton onClick={() => displayState.closeMockup()} />

      <div className="KifuMockupContent">
        <h1>出力</h1>
        <div className="OptionButton">
          {copied ? <Checkmark /> : null}
          <Button label="クリップボードにコピー" onClick={copyKifuOnClick} />
        </div>
      </div>

      <div className="KifuMockupContent">
        <h1>読み込み</h1>
        <p>※kif形式のみ対応</p>
        <div className="OptionButton">
          {parseState === ParseState.parsing ? <Loader /> : null}
          {parseState === ParseState.success ? <Checkmark /> : null}
          <Button label="クリップボードから読み込む" onClick={readOnClick} />
        </div>
      </div>
    </div>
  )
}

export default observer(KifuMockup)
