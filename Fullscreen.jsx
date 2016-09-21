'use strict';

// Deps
import React, { Component } from 'react';

class Fullscreen extends Component {
  constructor(props) {
    super(props);

    // Default state
    this.state = {
      isFullscreen: false,
      fullscreenProps: null
    };

    // Bind context to click handlers
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.onKeyUpCapture = this.onKeyUpCapture.bind(this);
  }

  componentWillMount () {
    this.element = document.querySelector(this.props.target);
    this.setState({
      fullscreenProps: this._getFullscreenProps()
    });
  }

  isFullscreen () {
    return this.state.isFullscreen;
  }

  setFullscreenState (fn) {
    const { element } = this.state.fullscreenProps;
    this.setState({ isFullscreen: !!document[element] }, fn);
  }

  _getFullscreenProps () {
    if (this.element.webkitRequestFullscreen && !!document.webkitExitFullscreen) {
      return {
        element: 'webkitFullscreenElement',
        enabled: 'webkitFullscreenEnabled',
        exit: 'webkitExitFullscreen',
        request : 'webkitRequestFullscreen'
      };
    }

    if (this.element.mozRequestFullscreen && !!document.mozExitFullscreen) {
      return {
        element: 'mozFullScreenElement',
        enabled: 'mozFullScreenEnabled',
        exit: 'mozCancelFullScreen',
        request : 'mozRequestFullScreen'
      };
    }

    if (this.element.msRequestFullscreen && !!document.msExitFullscreen) {
      return {
        element: 'msFullscreenElement',
        enabled: 'msFullscreenEnabled',
        exit: 'msExitFullscreen',
        request : 'msRequestFullscreen'
      };
    }

    if (this.element.requestFullscreen && !!document.exitFullscreen) {
      return {
        element: 'fullscreenElement',
        enabled: 'fullscreenEnabled',
        exit: 'exitFullscreen',
        request : 'requestFullscreen'
      };
    }

    return null;
  }

  _requestFullscreen () {
    const { enabled, request } = this.state.fullscreenProps;

    if (document[enabled]) {
      this.element[request]();
      this.setFullscreenState();
    } else {
      console.warn('Fullscreen functionality is not enabled');
    }
  }

  _cancelFullscreen () {
    document[this.state.fullscreenProps.exit]();
    this.setFullscreenState();
  }

  onKeyUpCapture (e) {
    if (e.key === 'Escape' && this.isFullscreen()) {
      this.setFullscreenState();
    }
  }

  toggleFullscreen () {
    this.setFullscreenState(() => this.isFullscreen() ? this._cancelFullscreen() : this._requestFullscreen());

  }

  render () {
    if (!this.state.fullscreenProps) {
      console.warn('Browser does not support Fullscreen API. See https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API', this.state.fullscreenProps);
      return null;
    }

    return (
      <button onClick={ this.toggleFullscreen } onKeyUpCapture={ this.onKeyUpCapture } className={ this.props.className }>
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
