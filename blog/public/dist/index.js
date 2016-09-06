webpackJsonp([0,1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by caozheng on 2016/9/2.
	 */
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var Index = _react2['default'].createClass({
	    displayName: 'Index',

	    render: function render() {
	        return _react2['default'].createElement(
	            'div',
	            null,
	            '这是主页 content From react',
	            _react2['default'].createElement(
	                'span',
	                null,
	                '重新添加testsdf'
	            ),
	            _react2['default'].createElement(
	                'div',
	                null,
	                '1234234'
	            )
	        );
	    }

	});
	_reactDom2['default'].render(_react2['default'].createElement(Index, null), document.getElementById('wrapper'));

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ }
]);