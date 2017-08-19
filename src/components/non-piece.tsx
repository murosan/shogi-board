import * as React from 'react';
import PromotionConfirmObj from '../game-handler/promotion-confirm';
import { CellComponent } from '../game';

interface PCProps {
  pcObj: PromotionConfirmObj;
  onClick: (t: CellComponent) => void;
}

export class EmpElm extends React.Component<{ onClick: () => void }, {}> {
  render() {
    return (
      <div
        className={'piece'}
        onClick={this.props.onClick}
      ></div>
    );
  }
}

export class PromotionConfirmElm extends React.Component<PCProps, {}> {
  render() {
    const pco = this.props.pcObj;
    return (
      <div className={'piece'}>
        <Promote onClick={() => this.props.onClick(pco.promoted)} />
        <NotPromote onClick={() => this.props.onClick(pco.moved)} />
      </div>
    );
  }
}

class Promote extends React.Component<{ onClick: any }, {}> {
  render() {
    return (
      <div
        id={'cbtn-promote'}
        className={'confirm-button'}
        onClick={this.props.onClick}
      ></div>
    );
  }
}

class NotPromote extends React.Component<{ onClick: any }, {}> {
  render() {
    return (
      <div
        id={'cbtn-not-promote'}
        className={'confirm-button'}
        onClick={this.props.onClick}
      ></div>
    );
  }
}
