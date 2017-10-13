import * as React from 'react';
import PromotionConfirmObj from '../game-handler/promotion-confirm';
import { CellComponent } from '../game';

interface PCProps {
  pcObj: PromotionConfirmObj;
  onClick: (t: CellComponent) => void;
}

export class EmpElm extends React.Component<{ onClick: () => void }, {}> {
  render() {
    return <div className={'piece'} onClick={this.props.onClick} />;
  }
}

export class PromotionConfirmElm extends React.Component<PCProps, {}> {
  render() {
    return (
      <div className={'piece'}>
        <Promote
          onClick={() => this.props.onClick(this.props.pcObj.promoted)}
        />
        <NotPromote
          onClick={() => this.props.onClick(this.props.pcObj.moved)}
        />
      </div>
    );
  }
}

export class Promote extends React.Component<{ onClick: () => void }, {}> {
  render() {
    return (
      <div
        id={'cbtn-promote'}
        className={'confirm-button'}
        onClick={this.props.onClick}
      />
    );
  }
}

export class NotPromote extends React.Component<{ onClick: () => void }, {}> {
  render() {
    return (
      <div
        id={'cbtn-not-promote'}
        className={'confirm-button'}
        onClick={this.props.onClick}
      />
    );
  }
}
