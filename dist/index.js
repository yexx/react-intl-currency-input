"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require("prop-types");

var _formatCurrency = require("./format-currency");

var _formatCurrency2 = _interopRequireDefault(_formatCurrency);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultConfig = {
  locale: "en-US",
  formats: {
    number: {
      USD: {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }
    }
  }
};

var IntlCurrencyInput = function (_Component) {
  _inherits(IntlCurrencyInput, _Component);

  function IntlCurrencyInput(props) {
    _classCallCheck(this, IntlCurrencyInput);

    var _this = _possibleConstructorReturn(this, (IntlCurrencyInput.__proto__ || Object.getPrototypeOf(IntlCurrencyInput)).call(this, props));

    _this.state = {
      maskedValue: "0"
    };

    _this.handleFocus.bind(_this);
    return _this;
  }

  _createClass(IntlCurrencyInput, [{
    key: "setMaskedValue",
    value: function setMaskedValue() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      this.setState({
        maskedValue: (0, _formatCurrency2.default)(value, this.props.config, this.props.currency)
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var value = this.props.value || this.props.defaultValue || 0;
      this.setMaskedValue(value);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.currency !== this.props.currency || nextProps.value !== this.props.value) {
        var value = nextProps.value !== this.props.value ? nextProps.value : this.state.maskedValue;

        var _calculateValues = this.calculateValues(value, nextProps.config, nextProps.currency),
            _calculateValues2 = _slicedToArray(_calculateValues, 2),
            maskedValue = _calculateValues2[1];

        this.setState({ maskedValue: maskedValue });
      }
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(nextProps === this.props && nextState === this.state);
    }
  }, {
    key: "normalizeValue",
    value: function normalizeValue(str) {
      // strips everything that is not a number (positive or negative).
      return Number(str.replace(/[^0-9-]/g, ""));
    }
  }, {
    key: "calculateValues",
    value: function calculateValues(inputFieldValue, config, currency) {
      // value must be divided by 100 to properly work with cents.
      var value = this.normalizeValue(inputFieldValue) / 100;
      var maskedValue = (0, _formatCurrency2.default)(value, config, currency);

      return [value, maskedValue];
    }
  }, {
    key: "updateValues",
    value: function updateValues(event) {
      var _calculateValues3 = this.calculateValues(event.target.value, this.props.config, this.props.currency),
          _calculateValues4 = _slicedToArray(_calculateValues3, 2),
          value = _calculateValues4[0],
          maskedValue = _calculateValues4[1];

      if (!this.props.max || value <= this.props.max) {
        this.setState({
          maskedValue: maskedValue
        });

        return [value, maskedValue];
      } else {
        return [this.normalizeValue(this.state.maskedValue) / 100, this.state.maskedValue];
      }
    }
  }, {
    key: "handleChange",
    value: function handleChange(event) {
      event.preventDefault();

      var _updateValues = this.updateValues(event),
          _updateValues2 = _slicedToArray(_updateValues, 2),
          value = _updateValues2[0],
          maskedValue = _updateValues2[1];

      if (this.props.onChange && maskedValue) {
        this.props.onChange(event, value, maskedValue);
      }
    }
  }, {
    key: "handleBlur",
    value: function handleBlur(event) {
      var _updateValues3 = this.updateValues(event),
          _updateValues4 = _slicedToArray(_updateValues3, 2),
          value = _updateValues4[0],
          maskedValue = _updateValues4[1];

      if (this.props.autoReset) {
        this.setMaskedValue();
      }

      if (this.props.onBlur) {
        this.props.onBlur(event, value, maskedValue);
      }
    }
  }, {
    key: "handleFocus",
    value: function handleFocus(event) {
      if (this.props.autoSelect) {
        event.target.select();
      }

      var _updateValues5 = this.updateValues(event),
          _updateValues6 = _slicedToArray(_updateValues5, 2),
          value = _updateValues6[0],
          maskedValue = _updateValues6[1];

      if (this.props.onFocus) {
        this.props.onFocus(event, value, maskedValue);
      }
    }
  }, {
    key: "handleKeyPress",
    value: function handleKeyPress(event) {
      if (this.props.onKeyPress) {
        this.props.onKeyPress(event, event.key, event.keyCode);
      }
    }
  }, {
    key: "handleInputRef",
    value: function handleInputRef(input) {
      var element = _reactDom2.default.findDOMNode(input);
      var isActive = element === document.activeElement;

      if (element && !isActive) {
        if (this.props.autoFocus) {
          element.focus();
        }
      }

      return element;
    }
  }, {
    key: "handleValue",
    value: function handleValue() {
      return this.state.maskedValue;
    }
  }, {
    key: "allowedProps",
    value: function allowedProps() {
      var allowedProps = _extends({}, this.props);

      delete allowedProps.defaultValue;
      delete allowedProps.currency;
      delete allowedProps.config;
      delete allowedProps.autoSelect;
      delete allowedProps.autoFocus;
      delete allowedProps.autoReset;
      delete allowedProps.onChange;
      delete allowedProps.onKeyPress;
      delete allowedProps.onBlur;
      delete allowedProps.onFocus;

      return allowedProps;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var inputComponent = this.props.inputComponent;

      var InputComponent = inputComponent;
      return _react2.default.createElement(InputComponent, _extends({}, this.allowedProps(), {
        value: this.handleValue(),
        ref: function ref(input) {
          return _this2.input = _this2.handleInputRef(input);
        },
        onChange: function onChange(ev) {
          return _this2.handleChange(ev);
        },
        onBlur: function onBlur(ev) {
          return _this2.handleBlur(ev);
        },
        onFocus: function onFocus(ev) {
          return _this2.handleFocus(ev);
        },
        onKeyUp: function onKeyUp(ev) {
          return _this2.handleKeyPress(ev);
        }
      }));
    }
  }]);

  return IntlCurrencyInput;
}(_react.Component);

IntlCurrencyInput.propTypes = {
  currency: _propTypes.string.isRequired,
  config: _propTypes.object.isRequired,
  defaultValue: _propTypes.number,
  value: _propTypes.number,
  autoFocus: _propTypes.bool,
  autoSelect: _propTypes.bool,
  autoReset: _propTypes.bool,
  onChange: _propTypes.func,
  onBlur: _propTypes.func,
  onFocus: _propTypes.func,
  onKeyPress: _propTypes.func,
  max: _propTypes.number
};

IntlCurrencyInput.defaultProps = {
  inputComponent: "input",
  currency: "USD",
  config: defaultConfig,
  autoFocus: false,
  autoSelect: false,
  autoReset: false
};

exports.default = IntlCurrencyInput;