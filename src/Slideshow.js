import React, { Component } from 'react';
import { Zoom } from 'react-slideshow-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

import 'react-slideshow-image/dist/styles.css'


//
// const images = [
//   '/images/53+50.jpg',
//   '/images/52+95.jpg',
//   '/images/52+53.jpg',
//   '/images/52+00.jpg',
//   '/images/51+10.jpg',
//   '/images/50+65.jpg',
//   '/images/50+15.jpg',
//   '/images/49+65.jpg',
//   '/images/49+15.jpg',
//   '/images/48+65.jpg',
//   '/images/48+15.jpg',
//   '/images/47+65.jpg',
//   '/images/46+65.jpg',
//   '/images/46+15.jpg',
//   '/images/45+65.jpg',
//   '/images/45+15.jpg',
//   '/images/44+50.jpg',
//   '/images/44+12.jpg',
//   '/images/43+65.jpg',
//   '/images/43+15.jpg',
//   '/images/42+00.jpg',
//   '/images/41+50.jpg',
//   '/images/41+00.jpg',
//   '/images/40+50.jpg',
//   '/images/40+00.jpg',
//   '/images/39+50.jpg',
//   '/images/38+50.jpg',
//   '/images/37+50.jpg',
//   '/images/37+00.jpg',
//   '/images/36+65.jpg',
//   '/images/36+50.jpg',
//   '/images/36+15.jpg',
//   '/images/35+15.jpg',
//   '/images/34+65.jpg',
//   '/images/34+15.jpg',
//   '/images/33+50.jpg',
//   '/images/33+00.jpg',
//   '/images/32+50.jpg',
//   '/images/32+00.jpg',
//   '/images/31+50.jpg',
//   '/images/31+00.jpg',
//   '/images/29+80.jpg',
//   '/images/29+15.jpg',
//   '/images/28+65.jpg',
//   '/images/28+15.jpg',
//   '/images/27+65.jpg',
//   '/images/27+15.jpg',
//   '/images/26+65.jpg',
//   '/images/26+15.jpg',
//   '/images/25+65.jpg',
//   '/images/25+15.jpg',
//   '/images/24+65.jpg',
//   '/images/24+15.jpg',
//   '/images/23+65.jpg',
//   '/images/22+65.jpg',
//   '/images/22+15.jpg',
//   '/images/21+65.jpg',
//   '/images/20+65.jpg',
//   '/images/20+15.jpg',
//   '/images/19+65.jpg',
//   '/images/19+15.jpg',
//   '/images/18+65.jpg',
//   '/images/18+15.jpg',
//   '/images/17+15.jpg'
// ]

// from example at https://github.com/femioladeji/react-slideshow/issues/59
const lazyLoadImages = () => {
  const lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
    if ("IntersectionObserver" in window) {
      let lazyImageObserver = new IntersectionObserver(function(
        entries,
        observer
      ) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            let lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.classList.remove("lazy");
            lazyImageObserver.unobserve(lazyImage);
          }
        });
      });

      lazyImages.forEach(function(lazyImage) {
        lazyImageObserver.observe(lazyImage);
      });
    }
}

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
    this.slideRef.current.goBack();
  }

  next() {
    this.slideRef.current.goNext();
  }

  componentDidMount() {
    this.containerRef.current.focus();
    lazyLoadImages()
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
      this.setState({
        northBound: true,
        advance: true
      })
    } else if (e.keyCode === 40) {
      this.setState({
        northBound: false,
        advance: true
      })
    }
  }

  handleSlideChange(oldIndex, newIndex) {
    this.props.onIndexChange(newIndex)
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
                      src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                      data-src={`/images/${feature.properties.marker}.jpg`}
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
