import * as React from 'react';
import { rowString, colString } from '../fn/strings';

export interface EdgeProps {
  row: number;
  col: number;
}

export class Corner extends React.Component<{}, {}> {
  render() {
    return <div className={'corner'}></div>;
  }
}

export class EdgeHor extends React.Component<EdgeProps, {}> {
  render() {
    if (this.props.row === -1) {
      return (
        <div className={'edge-horizontal'}>
          <div className={'edge-text'}>{colString(this.props.col)}</div>
        </div>
      );
    } else {
      return <div className={'edge-horizontal'}></div>;
    }
  }
}

export class EdgeVer extends React.Component<EdgeProps, {}> {
  render() {
    if (this.props.col === 9) {
      return (
        <div className={'edge-vertical'}>
          <div className={'edge-text'}>{rowString(this.props.row)}</div>
        </div>
      );
    } else {
      return <div className={'edge-vertical'}></div>;
    }
  }
}
