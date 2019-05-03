import React, { Component } from 'react'
import Columns from './Columns'
import './SideInfo.scss'

export default class SideInfo extends Component {
  render() {
    return (
      <div className="EngineSideInfo">
        <Columns />
      </div>
    )
  }
}
