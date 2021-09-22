import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

import './App.css';
import Slideshow from './Slideshow'
import MapboxGLMap from './MapboxGLMap'

import 'react-slideshow-image/dist/styles.css'

import stations from './data/stations'

const App = () => {
  const [ currentIndex, setCurrentIndex ] = useState(0)

  const handleIndexChange = (newIndex) => {
    setCurrentIndex(newIndex)
  }

  return (
    <div className="App flex flex-col lg:flex-row">
      <div className="h-1/2 md:h-3/5 lg:h-full flex-grow min-w-0 relative">
        <Slideshow onIndexChange={handleIndexChange} stations={stations} />
      </div>
      <div className="lg:w-80 bg-black flex-shrink-0 text-white border-l-0 border-t lg:border-l border-white flex flex-col-reverse md:flex-row lg:flex-col h-1/2 md:h-2/5 lg:h-auto">
        <div className="flex-grow w-full md:w-2/3 lg:w-full  flex flex-col">
          <div className="p-4 md:p-6 flex-grow">
            <div className="mb-2 lg:mb-6">
              <div className='font-bold text-base md:text-2xl lg:text-3xl'>A Stroll Down Flatbush Avenue</div>
              <div className='font-semibold text-xs md:text-sm italic'>circa 1914</div>
            </div>
            <div className='text-xs md:text-sm mb-3'>This set of photos taken approximately every 50 feet along a stretch of Flatbush Avenue in Brooklyn show the bustling street, storefonts, elevated trains, and trolleys.  Stroll down Flatbush and take in the scenes! </div>
            <div className='text-xs'>Use the arrow buttons or your keyboard's arrow keys to navigate</div>
          </div>
          <div className='px-4 md:px-6 py-2 border-t lg:border-b border-white flex justify-between'>
            <div className='font-bold text-xs cursor-pointer hover:text-gray-300 transition-all duration-100'>About</div>
            <a href="https://twitter.com/chris_whong" target="_blank" rel='noreferrer'>
              <div className='font-bold text-xs flex items-center cursor-pointer hover:text-gray-300 transition-all duration-100'><FontAwesomeIcon icon={faTwitter} className='mr-1'/> @chris_whong</div>
            </a>
          </div>
        </div>
        <div className='bg-gray-400 h-1/3 md:h-full lg:h-56 w-full md:w-1/3 lg:w-auto'>
          <MapboxGLMap currentIndex={currentIndex} stations={stations} />
        </div>
      </div>
    </div>
  );
}


export default App
