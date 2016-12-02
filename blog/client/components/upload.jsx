import './ajaxupload';
// import '../util/ajaxupload.3.5.js';
module.exports = React.createClass({
    getDefaultProps () {
        return ({
            uploadURL: '',
            selfClass: '',
            active: true,
            index: '',
            resType: 'json',
        });
    },
    componentWillReceiveProps (nextProps) {
        this.setState({
            active: nextProps.active,
        });
    },
    componentDidMount () {
        this.upLoadBtn($(`#${this.props.id}`));
    },
    upLoadBtn (node) {
        let _this = this;
        let uploadUrl = _this.props.uploadURL;
        new AjaxUpload(node, {
            action: uploadUrl,
            name: 'upload',
            xhrFields: {
                withCredentials: true,
            },
            responseType: this.props.resType,  // 返回结果为json数据
            onChange (file, ext, size) {
                if (_this.props.changeHandle) {
                    return _this.props.changeHandle(...arguments);
                }
            },
            onSubmit (file, ext) {
                _this.props.submitHandle && _this.props.submitHandle(file, ext);
            },
            onComplete (file, response) {
                _this.props.completeHandle && _this.props.completeHandle(file, response, _this.props.index);
            },
        });
    },
    render () {
       return (<div className={this.props.selfClass} style={this.props.active ? { display: 'inline-block' } : { display: 'none' }} 
           id={this.props.id}>{this.props.children}</div>);
   },
});
