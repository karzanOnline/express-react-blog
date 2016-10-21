/**
 * Created by caozheng on 2016/9/21.
 */
import { connect } from 'react-redux';
import '{public}/css/info.scss';
import Upload from 'rc-upload';
class EditInfo extends React.Component {
    constructor(props) {
        super(props);
        var test;
        this.uploaderProps = {
            action: '/upload',
            headers : {
                "Content-Type" : "application/x-www-form-urlencoded"
            },
            data : function (file) {
                console.log(file.name);
                return {}
            },
            beforeUpload(file) {
                console.log('beforeUpload', file.name);
                test = file.name
            },
            onStart: (file) => {
                console.log('onStart', file.name);
                // this.refs.inner.abort(file);
            },
            onSuccess(file) {
                console.log('onSuccess', file);
            },
            onProgress(step, file) {
                console.log('onProgress', Math.round(step.percent), file.name);
            },
            onError(err) {
                console.log('onError', err);
            },
        };
    }

    uploadImage() {


    }
    render() {
        const props = this.props;
        return (
            <div>
                <div className="wrap-main-content">
                    <div className="wrap-info">
                        <label className="info-pic">头像: </label>
                        <img className="info-icon" src={props.imgSrc} />
                        <Upload {...this.uploaderProps}>
                            <button className="button upload-button" onChange={this.uploadImage.bind(this)}>上传照片</button>
                        </Upload>
                    </div>
                </div>
            </div>
        );
    }

}

function mapToStateProps(state) {
    return {
        imgSrc: state.getIn(['getImg', 'imgSrc']),
    };
}
export default connect(mapToStateProps)(EditInfo);
