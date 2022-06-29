import { observer } from 'mobx-react-lite'
import React, { FC, useState } from 'react'
import { getAsString } from '../../handler/kifu/getAsString'
import { hasComment } from '../../handler/kifu/hasComment'
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
  const [textareaInput, setTextareaInput] = useState('')
  const [readErrorText, setReadErrorText] = useState('')

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
  const placeholder = `1 ７六歩(77)
2 ３四歩(33)
3 ２六歩(27)
.
.
 `

  const readOnClick: () => Promise<void> = async () => {
    if (textareaInput === '') {
      setReadErrorText('入力がありません')
      return
    }
    setParseState(ParseState.parsing)

    const result = KifuParser(KifuFormats.kif).parse(textareaInput)
    if (!result) {
      setParseState(ParseState.failure)
      const text = `読み込みに失敗しました。不具合報告はissueへお願いします。${issueLink}`
      setReadErrorText(text)
      return
    }
    setParseState(ParseState.success)

    gameState.setKifu(result.value)
    displayState.setShowCommentArea(hasComment(result.value))
    displayState.closeMockup()
  }

  const readError = (() => {
    if (readErrorText === '') return null
    return <span className="ErrorText">{readErrorText}</span>
  })()

  return (
    <div className="Mockup">
      <CloseButton onClick={() => displayState.closeMockup()} />

      <div className="KifuMockupContent">
        <h1>出力</h1>
        <div className="OptionButtonReverse">
          {copied ? <Checkmark /> : null}
          <Button label="クリップボードにコピー" onClick={copyKifuOnClick} />
        </div>
      </div>

      <div className="KifuMockupContent">
        <h1>読み込み</h1>
        <p>※kif形式のみ対応</p>
        {readError}
        <textarea
          className="TextAreaForKifuInput"
          placeholder={placeholder}
          value={textareaInput}
          onChange={e => setTextareaInput(e.target.value)}
        />
        <div className="OptionButtonReverse">
          {parseState === ParseState.parsing ? <Loader /> : null}
          {parseState === ParseState.success ? <Checkmark /> : null}
          <Button label="読み込む" onClick={readOnClick} />
        </div>
      </div>
    </div>
  )
}

export default observer(KifuMockup)
