import * as React from 'react';

interface ButtonsProps {
  upsidedown: () => void;
  changeIndexByDiff: (diff: number) => void;
  changeIndexToEnd: (st: 'head' | 'last') => void;
  copyKif: () => void;
}

export default class Buttons extends React.Component<ButtonsProps, {}> {
  render() {
    return (
      <div className={'info-area'}>
        <div className={'space'} />
        <div className={'btn-area'}>
          <div className={'btn-row'}>
            <button
              className={'btn'}
              onClick={() => this.props.changeIndexByDiff(-1)}
            >
              ＜
            </button>
            <button
              className={'btn'}
              onClick={() => this.props.changeIndexByDiff(1)}
            >
              ＞
            </button>
          </div>
          <div className={'btn-row'}>
            <button
              className={'btn'}
              onClick={() => this.props.changeIndexByDiff(-5)}
            >
              ＜ 5
            </button>
            <button
              className={'btn'}
              onClick={() => this.props.changeIndexByDiff(5)}
            >
              5 ＞
            </button>
          </div>
          <div className={'btn-row'}>
            <button
              className={'btn'}
              onClick={() => this.props.changeIndexToEnd('head')}
            >
              ｜＜＜
            </button>
            <button
              className={'btn'}
              onClick={() => this.props.changeIndexToEnd('last')}
            >
              ＞＞｜
            </button>
          </div>
          <div className={'btn-row'}>
            <button className={'btn'} onClick={() => this.props.upsidedown()}>
              盤面反転
            </button>
          </div>
          <div className={'btn-row'}>
            <button className={'btn'} onClick={() => this.props.copyKif()}>
              棋譜コピー
            </button>
          </div>
        </div>
      </div>
    );
  }
}
