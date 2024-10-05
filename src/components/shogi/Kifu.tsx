import { observer } from 'mobx-react-lite'
import React, { FC, useEffect } from 'react'
import { intoView } from '../../handler/dom/intoView'
import CloseImg from '../../img/components/buttons/close.svg'
import Branch from '../../model/kifu/Branch'
import History, { isBranch, KifuComponent } from '../../model/kifu/History'
import { Move } from '../../model/kifu/Move'
import { StoreContext } from '../../store/Store'
import './Kifu.scss'

const CURRENT_KIFU_ELM_ID = 'Move-Current'
const DELETE_KIFU_TXT = 'これ以降の棋譜を削除します'

const Kifu: FC = () => {
  const { gameState } = React.useContext(StoreContext)

  useEffect(() => {
    // 自動スクロール
    // TODO: スマホで使いにくいし自前実装した方がいいかも
    //       まぁスマホサポートしてないけど
    intoView(CURRENT_KIFU_ELM_ID)
  })

  const { moves } = gameState.kifu.history
  const elms: JSX.Element[] = renderKifu(moves, 0)
  return (
    <div className="KifuContainer">
      <div className="Kifu-Inner">{elms}</div>
    </div>
  )

  function renderKifu(moves: KifuComponent[], n: number): JSX.Element[] {
    return moves.flatMap((kc: KifuComponent, i: number) => {
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
      const txt: string = `-- ${kifuText(m)}`
      const onClick = () => gameState.clickKifu(n, i)
      otherHeadsDom.push(
        <div key={key} className="Branch" onClick={onClick}>
          <span>{txt}</span>
          {renderDeleteMoveButton(m)}
        </div>
      )
    }

    const restDom = rest.length !== 0 ? renderKifu(rest, n + 1) : []

    return [renderMove(head as Move, n)].concat(otherHeadsDom).concat(restDom)
  }

  function renderMove(m: Move, n: number): JSX.Element {
    const { currentMove } = gameState
    const id = currentMove.index === n ? CURRENT_KIFU_ELM_ID : undefined
    const onClick = () => gameState.clickKifu(n)

    return (
      <div key={n} className="Move" id={id} onClick={onClick}>
        <div className="Number code">{n + '.'}</div>
        <div className="MoveText">{kifuText(m)}</div>
        {n > 0 && renderDeleteMoveButton(m)}
      </div>
    )
  }

  function kifuText(m: Move): string {
    const s = m.str
    // 同 で始まっていて2文字だったら空白を入れる
    if (s.length === 2 && s[0] === '同') return `同　${s[1]}`
    return s
  }

  function renderDeleteMoveButton(m: Move): JSX.Element {
    return (
      <span
        className="DeleteMove"
        style={{ backgroundImage: `url(${CloseImg})` }}
        onClick={async (e: React.MouseEvent<HTMLDivElement>) => {
          window.confirm(DELETE_KIFU_TXT) && gameState.deleteMove(m)
          e.stopPropagation()
        }}
        title={DELETE_KIFU_TXT}
      />
    )
  }
}

export default observer(Kifu)
