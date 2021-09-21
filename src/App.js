import React, { useState } from 'react'
import './App.css';
import Slideshow from './Slideshow'
import MapboxGLMap from './MapboxGLMap'

import stations from './data/stations'

const App = () => {
  const [ currentIndex, setCurrentIndex ] = useState(0)

  const handleIndexChange = (newIndex) => {
    setCurrentIndex(newIndex)
  }


  return (
    <div className="App flex flex-col lg:flex-row">
      <div className="h-1/2 md:h-2/3 lg:h-full flex-grow min-w-0">
         <Slideshow onIndexChange={handleIndexChange} stations={stations} />
      </div>
      <div className="lg:w-80 bg-black flex-shrink-0 text-white border-l-0 lg:border-l border-white flex flex-col-reverse md:flex-row lg:flex-col h-1/2 md:h-1/3 lg:h-auto">
        <div className="p-8 flex-grow w-full md:w-2/3 lg:w-full h-2/3">
          <div className="mb-6">
            <div className='font-bold text-base md:text-3xl'>A Stroll Down Flatbush Avenue</div>
            <div className='font-semibold text-xs md:text-sm italic'>circa 1914</div>
          </div>
          <div className='text-xs md:text-sm'>This set of photos taken approximately every 50 feet along a stretch of Flatbush Avenue in Brooklyn show the bustling street, storefonts, elevated trains, and trolleys.  Use the up and down arrows to take a stroll... </div>
        </div>
        <div className='bg-gray-400 h-1/3 md:h-full lg:h-56 w-full md:w-1/3 lg:w-auto'>
          <MapboxGLMap currentIndex={currentIndex} stations={stations} />
        </div>
      </div>
    </div>
  );
}


export default App
