import { useRef, useState } from 'react'
import './BeforeAfterSlider.scss'

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

export function BeforeAfterSlider({ beforeSrc, afterSrc, beforeAlt, afterAlt }) {
  const sliderRef = useRef(null)
  const [position, setPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  const updatePosition = (clientX) => {
    const slider = sliderRef.current

    if (!slider) return

    const { left, width } = slider.getBoundingClientRect()
    const nextPosition = ((clientX - left) / width) * 100

    setPosition(clamp(nextPosition, 0, 100))
  }

  const handlePointerDown = (event) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    setIsDragging(true)
    updatePosition(event.clientX)
  }

  const handlePointerMove = (event) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return
    updatePosition(event.clientX)
  }

  const finishDragging = (event) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    setIsDragging(false)
  }

  const handleKeyDown = (event) => {
    const steps = {
      ArrowLeft: -2,
      ArrowDown: -2,
      ArrowRight: 2,
      ArrowUp: 2,
    }

    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault()
      setPosition(event.key === 'Home' ? 0 : 100)
      return
    }

    if (!steps[event.key]) return

    event.preventDefault()
    setPosition((currentPosition) => clamp(currentPosition + steps[event.key], 0, 100))
  }

  return (
    <div
      className={`before-after${isDragging ? ' before-after--dragging' : ''}`}
      ref={sliderRef}
      style={{ '--before-after-position': `${position}%` }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishDragging}
      onPointerCancel={finishDragging}
    >
      <img className="before-after__image" src={afterSrc} alt={afterAlt} draggable="false" />
      <img
        className="before-after__image before-after__image--before"
        src={beforeSrc}
        alt={beforeAlt}
        draggable="false"
      />

      {/* <span className="before-after__label before-after__label--before" aria-hidden="true">До</span>
      <span className="before-after__label before-after__label--after" aria-hidden="true">Після</span> */}

      <div className="before-after__divider" aria-hidden="true" />
      <div
        className="before-after__handle"
        role="slider"
        tabIndex="0"
        aria-label="Порівняння шкіри до та після"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={Math.round(position)}
        onKeyDown={handleKeyDown}
      >
        <div className="before-after__handle-lines" aria-hidden="true">
          <div className="before-after__handle-line" />
          <div className="before-after__handle-line" />
        </div>
      </div>
    </div>
  )
}
