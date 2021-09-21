import React, { Component } from 'react'
import './App.css';
import Slideshow from './Slideshow'
import MapboxGLMap from './MapboxGLMap'


class App extends Component {
  render() {
    return (
      <div className="App flex">
        <div className="h-full flex-grow min-w-0">
           <Slideshow />
        </div>
        <div className="w-80 bg-black flex-shrink-0 text-white border-l border-white flex flex-col">
          <div className="p-8 flex-grow">
            <div className="mb-6">
              <div className='font-bold text-3xl'>A Stroll Down Flatbush Avenue</div>
              <div className='font-semibold text-sm italic'>circa 1914</div>
            </div>
            <div className='text-sm'>This set of photos taken approximately every 50 feet along a stretch of Flatbush Avenue in Brooklyn show the bustling street, storefonts, elevated trains, and trolleys.  Use the up and down arrows to take a stroll... </div>
          </div>
          <div className='bg-gray-400 h-56'>
            <MapboxGLMap />
          </div>
        </div>
      </div>
    );
  }
}

export default App
