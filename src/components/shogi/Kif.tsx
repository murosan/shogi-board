import { observer } from 'mobx-react-lite'
import React, { FC, useEffect } from 'react'
import { intoView } from '../../lib/dom-handler/intoView'
import Branch from '../../model/kif/Branch'
import History, { isBranch, KifComponent } from '../../model/kif/History'
import { Move } from '../../model/kif/Move'
import { StoreContext } from '../../store/Store'
import './Kif.scss'

const CURRENT_KIF_ELM_ID = 'Move-Current'

const Kif: FC = () => {
  const { gameState } = React.useContext(StoreContext)

  useEffect(() => {
    // 自動スクロール
    // TODO: スマホで使いにくいし自前実装した方がいいかも
    //       まぁスマホサポートしてないけど
    intoView(CURRENT_KIF_ELM_ID)
  })

  const { moves } = gameState.kif.history
  const elms: JSX.Element[] = renderKif(moves, 0)
  return (
    <div className="KifContainer">
      <div className="Kif-Inner">{elms}</div>
    </div>
  )

  function renderKif(moves: KifComponent[], n: number): JSX.Element[] {
    return moves.flatMap((kc: KifComponent, i: number) => {
      if (isBranch(kc)) return renderBranch(kc, n + i)
      return renderMove(kc, n + i)
    })
  }

  function renderBranch(b: Branch, n: number): JSX.Element[] {
    const main: History = b.branches[b.index]
    const [head, ...rest] = main.moves // head は必ず Move

    const otherHeadsDom: JSX.Element[] = []
    for (let i = 0; i < b.branches.length; i++) {
      if (i === b.index) continue
      const m: Move = b.branches[i].moves[0] as Move // head は必ず Move
      const key: string = `${n}-${i}`
      const txt: string = `-- ${kifText(m)}`
      const onClick = () => gameState.clickKif(n, i)
      otherHeadsDom.push(
        <div key={key} className="Branch" onClick={onClick}>
          <span>{txt}</span>
        </div>
      )
    }

    const restDom = rest.length !== 0 ? renderKif(rest, n + 1) : []

    return [renderMove(head as Move, n)].concat(otherHeadsDom).concat(restDom)
  }

  function renderMove(m: Move, n: number): JSX.Element {
    const { currentMove } = gameState
    const id = currentMove.index === n ? CURRENT_KIF_ELM_ID : undefined
    const onClick = () => gameState.clickKif(n)

    return (
      <div key={n} className="Move" id={id} onClick={onClick}>
        <div className="Number code">{n + '.'}</div>
        <div className="MoveText">{kifText(m)}</div>
      </div>
    )
  }

  function kifText(m: Move): string {
    const s = m.str
    // 同 で始まっていて2文字だったら空白を入れる
    if (s.length === 2 && s[0] === '同') return `同　${s[1]}`
    return s
  }
}

export default observer(Kif)
