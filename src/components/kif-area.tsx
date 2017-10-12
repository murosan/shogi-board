import * as React from 'react';
import Positions from '../game-handler/positions';
import { Kif, OneStep, History, KifComponent } from '../game-handler/kif';
import Branch from '../game-handler/branch';
const crypto = require('crypto');
const $ = require('jquery');

interface KifAreaProps {
  positions: Positions;
  kif: Kif;
  kifClick: (oneStep: OneStep) => void;
  inlineKif: Array<OneStep>;
}

export default class KifArea extends React.Component<
  KifAreaProps,
  { current: OneStep }
> {
  renderOneStep(o: OneStep, current: OneStep): JSX.Element {
    return (
      <div
        key={crypto.randomBytes(8).toString('hex')}
        onClick={() => this.props.kifClick(o)}
        className={'kif'}
        id={o === current ? 'current-kif' : undefined}
      >
        <span className={'number'}>
          {`${this.props.inlineKif.indexOf(o) || 0} :`}
        </span>
        <span>{`${o.str}`}</span>
      </div>
    );
  }

  renderHead(kif: Kif, current: OneStep): JSX.Element {
    const head: KifComponent = kif.history[0];
    return head instanceof Branch ? (
      <div key={crypto.randomBytes(8).toString('hex')} />
    ) : (
      this.renderOneStep(head, current)
    );
  }

  renderRest(kifArr: Array<Kif>, branch: Branch): Array<JSX.Element> {
    return kifArr.map((k: Kif, i: number) => {
      const head = k.history[0];
      return head instanceof Branch ? (
        <div key={crypto.randomBytes(8).toString('hex')} />
      ) : (
        <div
          key={crypto.randomBytes(8).toString('hex')}
          className={'branch'}
          onClick={() => this.props.kifClick(head)}
        >{`-- ${head.str}`}</div>
      );
    });
  }

  renderBranch(b: Branch, current: OneStep): Array<JSX.Element> {
    const kifArr: Array<Kif> = b.branch.slice();
    const head: Kif = kifArr.splice(b.displayIndex, 1)[0];
    return [this.renderHead(head, current)]
      .concat(this.renderRest(kifArr, b))
      .concat(this.renderKif(head.history.slice(1), current));
  }

  renderKif(history: History, current: OneStep): Array<JSX.Element> {
    const history_ = history.map((k: KifComponent) => {
      if (k instanceof Branch) {
        return this.renderBranch(k, current);
      } else {
        return this.renderOneStep(k, current);
      }
    });
    return Array.prototype.concat.apply([], history_);
  }

  render(): JSX.Element {
    return (
      <div className={'info-area'}>
        <div className={'kif-area'}>
          {this.renderKif(this.props.kif.history, this.props.kif.getCurrent())}
        </div>
        <div className={'space'} />
      </div>
    );
  }

  componentDidMount(): void {
    const cur = document.getElementById('current-kif');
    if (cur) {
      intoView(cur);
    }
  }

  componentDidUpdate(): void {
    const cur = document.getElementById('current-kif');
    if (cur) {
      intoView(cur);
    }
  }
}

function intoView(cur: HTMLElement) {
  const ch = $(cur).height();
  const ka = $($('.kif-area')[0]);
  const kh = ka.height();
  const top = $(cur).offset().top - ka.offset().top;
  if (top < 0) {
    ka.scrollTop(top + ka.scrollTop());
  } else if (top + ch > kh) {
    ka.scrollTop(top + ch + ka.scrollTop() - kh);
  }
}
