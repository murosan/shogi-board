import { observer } from 'mobx-react-lite'
import React, { FC, useEffect, useState } from 'react'
import { getAsString } from '../../handler/kifu/getAsString'
import { hasComment } from '../../handler/kifu/hasComment'
import { KifuFormats, KifuParser } from '../../lib/parser/parsers/kifu'
import { Store, StoreContext } from '../../store/Store'
import Button from '../form/Button'
import Checkmark from '../util/Checkmark'
import CloseButton from '../util/CloseButton'
import Loader from '../util/Loader'
import './KifuMockup.scss'

interface KifuIndexEntry {
  file: string
  session: string
  game_index_in_session: number
  account: string
  my_color: 'BLACK' | 'WHITE'
  opp_name: string
  result: string
  moves: number
  session_log: string
}

const ParseState = {
  standby: 'standby',
  parsing: 'parsing',
  success: 'success',
  failure: 'failure',
}

const KIFU_BASE = `${process.env.PUBLIC_URL || ''}/kifu`

const KifuMockup: FC = () => {
  const [copied, setCopied] = useState(false)
  const [parseState, setParseState] = useState(ParseState.standby)
  const [textareaInput, setTextareaInput] = useState('')
  const [readErrorText, setReadErrorText] = useState('')
  const [bundledList, setBundledList] = useState<KifuIndexEntry[]>([])
  const [selectedFile, setSelectedFile] = useState('')

  const { gameState, displayState }: Store = React.useContext(StoreContext)
  const { kifu } = gameState

  const checkmarkTimeout = 1500

  // Load the bundled kifu index once
  useEffect(() => {
    let cancelled = false
    fetch(`${KIFU_BASE}/index.json`)
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: KifuIndexEntry[]) => {
        if (!cancelled) setBundledList(data)
      })
      .catch(() => {
        /* index not present — picker hidden */
      })
    return () => {
      cancelled = true
    }
  }, [])

  const onSelectBundled = async (file: string) => {
    setSelectedFile(file)
    setReadErrorText('')
    if (!file) return
    try {
      const r = await fetch(`${KIFU_BASE}/${file}`)
      if (!r.ok) throw new Error(`HTTP ${r.status}`)
      const text = await r.text()
      setTextareaInput(text)
    } catch (e) {
      setReadErrorText(`棋譜の取得に失敗しました: ${e}`)
    }
  }

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

  const bundledPicker =
    bundledList.length === 0 ? null : (
      <div className="KifuMockupContent">
        <h1>収録棋譜から選ぶ (miao4 / SOJO)</h1>
        <p>※ Floodgate 50局 (新しい順)</p>
        <select
          className="TextAreaForKifuInput"
          style={{ height: 'auto', padding: '6px' }}
          value={selectedFile}
          onChange={e => onSelectBundled(e.target.value)}
        >
          <option value="">-- 棋譜を選択 --</option>
          {bundledList.map((g, i) => {
            const color = g.my_color === 'BLACK' ? '先' : '後'
            const label = `${(i + 1)
              .toString()
              .padStart(2, '0')}. [${color}] vs ${g.opp_name} — ${g.result} (${
              g.moves
            }手, ${g.session} #${g.game_index_in_session})`
            return (
              <option key={g.file} value={g.file}>
                {label}
              </option>
            )
          })}
        </select>
        {selectedFile && (
          <p>
            原ログ:{' '}
            <a
              href={`${KIFU_BASE}/${
                bundledList.find(g => g.file === selectedFile)?.session_log ||
                ''
              }`}
              target="_blank"
              rel="noreferrer noopener"
            >
              raw log
            </a>
          </p>
        )}
      </div>
    )

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

      {bundledPicker}

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
