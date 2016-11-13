(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './Fullscreen'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./Fullscreen'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Fullscreen);
    global.index = mod.exports;
  }
})(this, function (exports, _Fullscreen) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _Fullscreen2 = _interopRequireDefault(_Fullscreen);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _Fullscreen2.default;
});