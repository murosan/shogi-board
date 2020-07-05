import React, { FC } from 'react'
import './Mockup.scss'

interface Props {
  onClick: () => Promise<void>
}

const CloseButton: FC<Props> = (props: Props) => {
  const width = 20
  const one = line(0, 0, width, width)
  const two = line(width, 0, 0, width)

  return (
    <div onClick={() => props.onClick()}>
      <svg width={width} height={width} className="MockupCloseButton">
        {one}
        {two}
      </svg>
    </div>
  )

  function line(x1: number, y1: number, x2: number, y2: number) {
    return (
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" strokeWidth="2" />
    )
  }
}

export default CloseButton
