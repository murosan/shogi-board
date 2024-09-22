import { observer } from 'mobx-react-lite'
import React, { FC, useEffect, useRef } from 'react'
import { StoreContext } from '../../store/Store'
import './WidthController.scss'

const Setting: FC = () => {
  const { displayState, config } = React.useContext(StoreContext)
  const displayStateRef = useRef(displayState)
  const configRef = useRef(config)

  const resizeOn = () => displayState.setResizing(true)
  const resizeOff = () => {
    const ds = displayStateRef.current
    if (ds.resizing) window.getSelection()?.removeAllRanges()
    displayStateRef.current.setResizing(false)
  }
  const onMove = (e: MouseEvent) => {
    const displayState = displayStateRef.current
    if (!displayState.resizing) return
    const config = configRef.current

    const container = document.getElementById('root') as HTMLDivElement
    const containerWidth = container.clientWidth
    const pos = containerWidth - e.clientX
    if (pos <= 0) config.setBoardWidth(null)
    else config.setBoardWidth(containerWidth - pos * 2)
  }

  useEffect(() => {
    document.addEventListener('mouseup', () => resizeOff())
    document.addEventListener('mousemove', e => onMove(e))
  }, [])

  return <div className="WidthController" onMouseDown={resizeOn} />
}

export default observer(Setting)
