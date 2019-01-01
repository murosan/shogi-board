import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { intoView } from '../../lib/dom-handler/intoView'
import Branch from '../../model/kif/Branch'
import History, { isBranch, KifComponent } from '../../model/kif/History'
import Move from '../../model/kif/Move'
import { Store } from '../../store/GameStateStore'
import './Kif.scss'

interface Props {
  store?: Store
}

const CURRENT_KIF_ID = 'Move-Current'

@inject('store')
@observer
export default class Kif extends Component<Props> {
  render() {
    const moves = this.props.store!.kif.history.moves
    return (
      <div className="KifContainer">
        <div className="Kif-Inner">{this.renderKif(moves, 0)}</div>
      </div>
    )
  }

  renderKif(moves: KifComponent[], n: number): JSX.Element[] {
    const nested = moves.map((kc: KifComponent, i: number) => {
      if (isBranch(kc)) return this.renderBranch(kc, n + i)
      return this.renderMove(kc, n + i)
    })

    // TODO: flatMap 使いてぇ
    return Array.prototype.concat.apply([], nested)
  }

  renderBranch(b: Branch, n: number): JSX.Element[] {
    const main: History = b.branches[b.index]
    const [head, ...rest] = main.moves // head は必ず Move
    const otherHeads: Move[] = b.branches
      .filter((_, i) => i !== b.index)
      .map((b: History) => b.moves[0] as Move) // head は必ず Move

    const headDom = this.renderMove(head as Move, n)
    const otherHeadsDom = otherHeads.map((m: Move, i: number) => (
      <div key={`${n}${i}`} className="Branch">
        <span>{`-- ${m.str}`}</span>
      </div>
    ))
    const restDom = rest.length !== 0 ? this.renderKif(rest, n + 1) : []

    return [headDom].concat(otherHeadsDom).concat(restDom)
  }

  renderMove(m: Move, n: number): JSX.Element {
    const curNum: number = this.props.store!.currentKifIndex

    return (
      <div
        key={n}
        className="Move"
        id={curNum === n ? CURRENT_KIF_ID : undefined}
      >
        <span className={'Number'}>{n + '.'}</span>
        <span>{m.str}</span>
      </div>
    )
  }

  // 自動スクロール
  componentDidUpdate() {
    intoView(CURRENT_KIF_ID)
  }
}
