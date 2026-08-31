import React, { useEffect, useRef, useState } from 'react'
import { ArrowUpIcon, ArrowDownIcon } from './icons'

// how many photos on either side of the current one stay mounted, so the
// next couple of frames are already loaded by the time you reach them
const PRELOAD_WINDOW = 2

// swipe distance (px) required to trigger a navigation on touch devices
const SWIPE_THRESHOLD = 50

const Slideshow = ({ stations, onIndexChange, initialIndex = 0 }) => {
  const features = stations.features
  const lastIndex = features.length - 1

  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [direction, setDirection] = useState('north')

  const containerRef = useRef(null)
  const touchStartY = useRef(null)
  const scrubberTrackRef = useRef(null)

  useEffect(() => {
    containerRef.current?.focus()
  }, [])

  useEffect(() => {
    onIndexChange(currentIndex)
  }, [currentIndex]) // eslint-disable-line react-hooks/exhaustive-deps

  const goTo = (index) => {
    const clamped = Math.min(Math.max(index, 0), lastIndex)
    if (clamped === currentIndex) return
    setDirection(clamped > currentIndex ? 'north' : 'south')
    setCurrentIndex(clamped)
  }

  const next = () => goTo(currentIndex + 1)
  const back = () => goTo(currentIndex - 1)

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') next()
    else if (e.key === 'ArrowDown') back()
  }

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e) => {
    if (touchStartY.current === null) return
    const delta = touchStartY.current - e.changedTouches[0].clientY
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      delta > 0 ? next() : back()
    }
    touchStartY.current = null
  }

  const handleScrubberSeek = (e) => {
    const track = scrubberTrackRef.current
    if (!track) return
    const rect = track.getBoundingClientRect()
    const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1)
    goTo(Math.round(ratio * lastIndex))
  }

  // photos not currently active rest at a slight zoom offset depending on
  // the last direction of travel, so the active photo animates smoothly
  // into (north) or out of (south) that offset -- a subtle sense of motion
  // along the street instead of a hard cut
  const restScale = direction === 'north' ? 'scale-110' : 'scale-90'

  return (
    <div
      ref={containerRef}
      className='slideshow-component h-full w-full relative min-h-0 overflow-hidden bg-black'
      style={{ background: '#000' }}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="absolute left-0 top-0 text-white p-1 md:p-2 m-4 md:m-10 flex flex-col z-20 bg-black rounded-full bg-opacity-90 shadow-md"
        style={{ boxShadow: '0px 0px 10px -3px #EAEAEA' }}
      >
        <button
          type='button'
          aria-label='Next photo'
          disabled={currentIndex >= lastIndex}
          className="cursor-pointer hover:text-gray-300 disabled:opacity-30 disabled:cursor-default transition-all duration-100 p-2.5"
          onClick={next}
        >
          <ArrowUpIcon className='w-6 h-6 md:w-7 md:h-7' />
        </button>
        <button
          type='button'
          aria-label='Previous photo'
          disabled={currentIndex <= 0}
          className="cursor-pointer hover:text-gray-300 disabled:opacity-30 disabled:cursor-default transition-all duration-100 p-2.5"
          onClick={back}
        >
          <ArrowDownIcon className='w-6 h-6 md:w-7 md:h-7' />
        </button>
      </div>

      <div className="absolute right-0 bottom-2 md:bottom-3 text-white text-xs m-3 md:m-4 px-2 py-1 z-20 bg-black bg-opacity-60 rounded">
        Photo {currentIndex + 1} of {features.length}
      </div>

      {features.map((feature, index) => {
        const distance = Math.abs(index - currentIndex)
        const isActive = distance === 0
        const withinPreloadWindow = distance <= PRELOAD_WINDOW
        const marker = feature.properties.marker

        return (
          <div
            key={marker}
            className={`absolute inset-0 flex flex-col pb-2 transition-[opacity,transform] duration-500 ease-out ${
              isActive ? 'opacity-100 scale-100 z-10' : `opacity-0 ${restScale} z-0`
            }`}
          >
            <div className='flex-grow min-h-0 flex items-center justify-center'>
              {withinPreloadWindow && (
                <img
                  className='max-w-full max-h-full object-contain'
                  loading='eager'
                  fetchPriority={distance <= 1 ? 'high' : 'low'}
                  src={`/images/${marker}.jpg`}
                  alt={`Flatbush Avenue circa 1914, near survey marker ${marker}`}
                />
              )}
            </div>
            <div className='flex-shrink-0 text-white text-xs text-center py-1 cursor-pointer hover:text-gray-300 transition-all duration-100'>
              <a href={`https://digitalcollections.nyhistory.org/islandora/object/nyhs%${feature.properties.photoid}`} target="_blank" rel="noreferrer">
                <span className='font-semibold'>Source:</span> https://digitalcollections.nyhistory.org/islandora/object/nyhs%{feature.properties.photoid}
              </a>
            </div>
          </div>
        )
      })}

      <div
        ref={scrubberTrackRef}
        onClick={handleScrubberSeek}
        role='slider'
        aria-label='Photo position'
        aria-valuemin={0}
        aria-valuemax={lastIndex}
        aria-valuenow={currentIndex}
        className='absolute left-0 right-0 bottom-0 h-3 z-30 flex items-end cursor-pointer group'
      >
        <div className='w-full h-1 group-hover:h-1.5 bg-white/15 transition-[height] duration-150'>
          <div
            className='h-full bg-white/80 transition-[width] duration-300 ease-out'
            style={{ width: `${(currentIndex / lastIndex) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export default Slideshow
