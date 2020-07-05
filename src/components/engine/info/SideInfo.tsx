import React, { FC } from 'react'
import Columns from './Columns'
import './SideInfo.scss'

const SideInfo: FC = () => {
  return (
    <div className="EngineSideInfo">
      <div className="EngineSideInfoContainer">
        <Columns />
      </div>
    </div>
  )
}

export default SideInfo
