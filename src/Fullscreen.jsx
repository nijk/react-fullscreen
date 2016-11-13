'use strict';

// Deps
import React, { Component } from 'react';

class Fullscreen extends Component {
  constructor(props) {
    super(props);

    // Default state
    this.state = {
      fullscreen: null
    };
  }

  componentWillMount () {
    this.element = document.querySelector(this.props.target);
    const fullscreen = this._getFullscreenProps();

    if (!!fullscreen) {
      // Re-render on change, e.g keyup 'esc' in global scope
      document[fullscreen.onfullscreenchange] = () => this.forceUpdate();

      this.setState({ fullscreen });
    }
  }

  isFullscreen () {
    return !!document[this.state.fullscreen.element];
  }

  _getFullscreenProps () {
    if (!this.element) {
      console.warn('Target element not found, cannot provide fullscreen');
      return null;
    }

    if (this.element.webkitRequestFullscreen && !!document.webkitExitFullscreen) {
      return {
        element: 'webkitFullscreenElement',
        enabled: 'webkitFullscreenEnabled',
        exit: 'webkitExitFullscreen',
        request : 'webkitRequestFullscreen',
        onfullscreenchange: 'onwebkitfullscreenchange',
      };
    }

    if (this.element.mozRequestFullscreen && !!document.mozExitFullscreen) {
      return {
        element: 'mozFullScreenElement',
        enabled: 'mozFullScreenEnabled',
        exit: 'mozCancelFullScreen',
        request : 'mozRequestFullScreen',
        onfullscreenchange: 'onmozfullscreenchange',
      };
    }

    if (this.element.msRequestFullscreen && !!document.msExitFullscreen) {
      return {
        element: 'msFullscreenElement',
        enabled: 'msFullscreenEnabled',
        exit: 'msExitFullscreen',
        request : 'msRequestFullscreen',
        onfullscreenchange: 'onmsfullscreenchange',
      };
    }

    if (this.element.requestFullscreen && !!document.exitFullscreen) {
      return {
        element: 'fullscreenElement',
        enabled: 'fullscreenEnabled',
        exit: 'exitFullscreen',
        request : 'requestFullscreen',
        onfullscreenchange: 'onfullscreenchange',
      };
    }

    console.warn('Browser does not appear to support Fullscreen API. See https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API', this.state.fullscreen);
    return null;
  }

  _requestFullscreen () {
    const { enabled, request } = this.state.fullscreen;

    document[enabled] ? this.element[request]() : console.warn('Fullscreen functionality is not enabled');
  }

  _cancelFullscreen () {
    document[this.state.fullscreen.exit]();
  }

  onKeyUpCapture (e) {
    if (e.key === 'Escape' && this.isFullscreen()) {
      this._cancelFullscreen();
    }
  }

  toggleFullscreen () {
    this.isFullscreen() ? this._cancelFullscreen() : this._requestFullscreen();
  }

  render () {
    if (!this.state.fullscreen) {
      return null;
    }

    return (
      <button onClick={ () => this.toggleFullscreen() } onKeyUpCapture={ (e) => this.onKeyUpCapture(e) } className={ this.props.className }>
        { this.isFullscreen() ? this.props.contentExit : this.props.contentEnter }
      </button>
    );
  }
}

Fullscreen.propTypes = {
  className: React.PropTypes.string,
  contentEnter: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]).isRequired,
  contentExit: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]).isRequired,
  target: React.PropTypes.string.isRequired
};

export default Fullscreen;
