import React, { Component } from 'react';
import { Zoom } from 'react-slideshow-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

import 'react-slideshow-image/dist/styles.css'

class Slideshow extends Component {
  constructor() {
    super();
    this.containerRef = React.createRef();
    this.slideRef = React.createRef();
    this.back = this.back.bind(this);
    this.next = this.next.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSlideChange = this.handleSlideChange.bind(this);
    this.state = {
      northBound: true
    }
  }

  back() {
    this.setState({
      northBound: false,
      advance: true
    })
  }

  next() {
    this.setState({
      northBound: true,
      advance: true
    })
  }

  componentDidMount() {
    this.containerRef.current.focus();
  }

  componentDidUpdate() {
    //
    if (this.state.advance) {
      this.state.northBound ? this.slideRef.current.goNext() : this.slideRef.current.goBack()
      this.setState({ advance: false })
    }
  }

  handleKeyDown(e) {
    // arrow up/down button should select next/previous list element
    if (e.keyCode === 38) {
      this.next()
    } else if (e.keyCode === 40) {
      this.back()
    }
  }

  handleSlideChange(oldIndex, newIndex) {
    this.props.onIndexChange(newIndex)
    // load index+1 image
    const [nextImage] = [].slice.call(document.querySelectorAll(`img[data-index="${newIndex + 1}"]`));
    nextImage.src = nextImage.dataset.src;
  }

  render() {
    const zoomInProperties = {
      transitionDuration: 500,
      scale: this.state.northBound ? '1.6' : '0.8',
      autoplay: false,
      arrows: false,
      onChange: this.handleSlideChange,
      infinite: false
    }

    return (
      <div
        className='slideshow-component h-full w-full relative min-h-0'
        ref={this.containerRef}
        style={{ background: '#000' }}
        tabIndex="0"
        onKeyDown={ this.handleKeyDown }
      >
        <div className="absolute left-0 top-0 text-white p-2 md:p-4 m-4 md:m-10 flex flex-col z-10 bg-black rounded-full bg-opacity-90 shadow-md" style={{
          boxShadow: '0px 0px 10px -3px #EAEAEA'
        }}>
          <div className="cursor-pointer hover:text-gray-300 transition-all duration-100 opacity-100 mb-2" onClick={this.next}>
            <FontAwesomeIcon size='2x' icon={faArrowUp} />
          </div>
          <div className="cursor-pointer hover:text-gray-300 transition-all duration-100 opacity-100" onClick={this.back}>
            <FontAwesomeIcon size='2x' icon={faArrowDown} />
          </div>
        </div>
        <div className="h-full w-full flex flex-col">
          <div className='slideshow-container flex-grow min-h-0'>
            <Zoom {...zoomInProperties} ref={this.slideRef}>
              {this.props.stations.features.map((feature, index) => (
                <div key={index} style={{width: "100%"}} className='flex flex-col'>
                  <div className='flex-grow min-h-0'>
                    <img
                      className='lazy'
                      style={{ objectFit: "contain", width: "100%" }}
                      src={[0,1].includes(index) ? `/images/${feature.properties.marker}.jpg` : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="}
                      data-src={`/images/${feature.properties.marker}.jpg`}
                      data-index={index}
                      alt={`/images/${feature.properties.marker}.jpg`}
                    />
                  </div>
                  <div className='flex-shrink-0 text-white text-xs text-center py-1 cursor-pointer hover:text-gray-300 transition-all duration-100'>
                    <a href={`https://digitalcollections.nyhistory.org/islandora/object/nyhs%${feature.properties.photoid}`} target="_blank" rel="noreferrer"><span className='font-semibold'>Source:</span> https://digitalcollections.nyhistory.org/islandora/object/nyhs%{feature.properties.photoid}</a>
                  </div>
                </div>
              ))}
            </Zoom>
          </div>
        </div>
      </div>
    )
  }
}

export default Slideshow;
