(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react);
    global.Fullscreen = mod.exports;
  }
})(this, function (exports, _react) {
  'use strict';

  // Deps

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var Fullscreen = function (_Component) {
    _inherits(Fullscreen, _Component);

    function Fullscreen(props) {
      _classCallCheck(this, Fullscreen);

      var _this = _possibleConstructorReturn(this, (Fullscreen.__proto__ || Object.getPrototypeOf(Fullscreen)).call(this, props));

      // Default state
      _this.state = {
        fullscreen: null
      };
      return _this;
    }

    _createClass(Fullscreen, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        var _this2 = this;

        this.element = document.querySelector(this.props.target);
        var fullscreen = this._getFullscreenProps();

        if (!!fullscreen) {
          // Re-render on change, e.g keyup 'esc' in global scope
          document[fullscreen.onfullscreenchange] = function () {
            return _this2.forceUpdate();
          };

          this.setState({ fullscreen: fullscreen });
        }
      }
    }, {
      key: 'isFullscreen',
      value: function isFullscreen() {
        return !!document[this.state.fullscreen.element];
      }
    }, {
      key: '_getFullscreenProps',
      value: function _getFullscreenProps() {
        if (!this.element) {
          console.warn('Target element not found, cannot provide fullscreen');
          return null;
        }

        if (this.element.webkitRequestFullscreen && !!document.webkitExitFullscreen) {
          return {
            element: 'webkitFullscreenElement',
            enabled: 'webkitFullscreenEnabled',
            exit: 'webkitExitFullscreen',
            request: 'webkitRequestFullscreen',
            onfullscreenchange: 'onwebkitfullscreenchange'
          };
        }

        if (this.element.mozRequestFullscreen && !!document.mozExitFullscreen) {
          return {
            element: 'mozFullScreenElement',
            enabled: 'mozFullScreenEnabled',
            exit: 'mozCancelFullScreen',
            request: 'mozRequestFullScreen',
            onfullscreenchange: 'onmozfullscreenchange'
          };
        }

        if (this.element.msRequestFullscreen && !!document.msExitFullscreen) {
          return {
            element: 'msFullscreenElement',
            enabled: 'msFullscreenEnabled',
            exit: 'msExitFullscreen',
            request: 'msRequestFullscreen',
            onfullscreenchange: 'onmsfullscreenchange'
          };
        }

        if (this.element.requestFullscreen && !!document.exitFullscreen) {
          return {
            element: 'fullscreenElement',
            enabled: 'fullscreenEnabled',
            exit: 'exitFullscreen',
            request: 'requestFullscreen',
            onfullscreenchange: 'onfullscreenchange'
          };
        }

        console.warn('Browser does not appear to support Fullscreen API. See https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API', this.state.fullscreen);
        return null;
      }
    }, {
      key: '_requestFullscreen',
      value: function _requestFullscreen() {
        var _state$fullscreen = this.state.fullscreen,
            enabled = _state$fullscreen.enabled,
            request = _state$fullscreen.request;


        document[enabled] ? this.element[request]() : console.warn('Fullscreen functionality is not enabled');
      }
    }, {
      key: '_cancelFullscreen',
      value: function _cancelFullscreen() {
        document[this.state.fullscreen.exit]();
      }
    }, {
      key: 'onKeyUpCapture',
      value: function onKeyUpCapture(e) {
        if (e.key === 'Escape' && this.isFullscreen()) {
          this._cancelFullscreen();
        }
      }
    }, {
      key: 'toggleFullscreen',
      value: function toggleFullscreen() {
        this.isFullscreen() ? this._cancelFullscreen() : this._requestFullscreen();
      }
    }, {
      key: 'render',
      value: function render() {
        var _this3 = this;

        if (!this.state.fullscreen) {
          return null;
        }

        return _react2.default.createElement(
          'button',
          { onClick: function onClick() {
              return _this3.toggleFullscreen();
            }, onKeyUpCapture: function onKeyUpCapture(e) {
              return _this3.onKeyUpCapture(e);
            }, className: this.props.className },
          this.isFullscreen() ? this.props.contentExit : this.props.contentEnter
        );
      }
    }]);

    return Fullscreen;
  }(_react.Component);

  Fullscreen.propTypes = {
    className: _react2.default.PropTypes.string,
    contentEnter: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]).isRequired,
    contentExit: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]).isRequired,
    target: _react2.default.PropTypes.string.isRequired
  };

  exports.default = Fullscreen;
});