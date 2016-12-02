/**
 * Created by caozheng on 2016/9/21.
 */
import { connect } from 'react-redux';
import '{public}/css/info.scss';
import Upload from './components/upload';
import QueueAnim from 'rc-queue-anim';
import { getInfo, getInfoPic } from './redux/actions/navContent';
// import Alert from './components/src/js/managers/DialogManager';

const emStyle = {
    color : 'red'
};
const textareaStyle = {
    height : '90px',
    width : '500px'
};

class EditInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textName : '',
            textInfo : ''
        }
    }



    componentDidMount (){
        //获取个人信息
        let { dispatch } = this.props;
        dispatch(getInfo())
    }

    uploadImage() {


    }

    selectPhoto (name, result){
        console.log(result);
        // this.setState({imgSrc : result.url})
        let { dispatch } = this.props;
        dispatch(getInfoPic(result.url));
    }

    uploadChange(fileName, data) {
        console.log(fileName, data);
    }

    onSubmit (){

        var _this = this;
        var nickname = _this.refs.nickName.value,
            userinfo = _this.refs.userInfo.value,
            avatar = _this.refs.imgSrc.src;

        if(avatar.indexOf('public/images/default.jpg')>0){
            Alert.alert({
                message:'请选择头像！'
            });
            setTimeout(function () {
                Alert.clearAll();
            },2000);
            return false
        }
        if(!nickname){
            Alert.alert({
                message:'请填写昵称！'
            });
            setTimeout(function () {
                Alert.clearAll();
            },2000);
            return false
        }
        if(!userinfo){
            Alert.alert({
                message:'请填写个人简介！'
            });
            setTimeout(function () {
                Alert.clearAll();
            },2000);
            return false
        }

        var obj = {
            d : JSON.stringify({
                nickname : nickname,
                userinfo : userinfo,
                avatar : avatar
            })
        };

        $.post('/user/info', obj , function (data) {
            if(data.success){
                let { dispatch } = _this.props;
                dispatch(getInfo());
                Alert.alert({
                    message:'操作成功！'
                });
                setTimeout(function () {
                    Alert.clearAll();
                },2000);
            }else{
                alert(data.description)
            }
        },'json')

    }

    fTextChange (sign, e){
        // var mySymbol = Symbol(sign);
        // this.setState({
        //     [mySymbol] : e.target.value
        // });
        this.setState({
            [sign] : e.target.value
        })
    }

    render() {
        const props = this.props;
        return (
            <QueueAnim interval={100} duration={1500}>
            <div key={1}>

                <div className="wrap-main-content">
                    <div className="wrap-info">
                        <label className="info-pic"><em style={emStyle}>*</em>头像: </label>
                        <img className="info-icon" ref='imgSrc' src={props.imgSrc || props.dataInfo.get('avatar')} />
                        <Upload id={'uploadPhoto'}
                          selfClass = "button upload-button"
                          completeHandle={this.selectPhoto.bind(this)}
                          changeHandle={this.uploadChange.bind(this)}
                          uploadURL={'/upload'}
                        >上传照片</Upload>
                    </div>
                    <div className="wrap-info">
                        <label className="info-pic"><em style={emStyle}>*</em>昵称: </label>
                        <input className="medium rui-input"
                               ref = "nickName"
                               placeholder="1-16个字以内"
                               maxLength="16"
                               onChange={this.fTextChange.bind(this, 'textName')}
                               value = {this.state.textName || props.dataInfo.get('nickname')}
                               type="text"/>
                    </div>
                    <div className="wrap-info">
                        <label className="info-pic"><em style={emStyle}>*</em>个人简介:</label>
                        <textarea style={textareaStyle} className="medium rui-input"
                               ref = "userInfo"
                               placeholder="1-40个字以内"
                               onChange={this.fTextChange.bind(this, 'textInfo')}
                               value = {this.state.textInfo||props.dataInfo.get('userinfo')}
                               maxLength="40"></textarea>
                    </div>
                    <div className="wrap-info">
                        <button className="button-primary" onClick={this.onSubmit.bind(this)}>提交</button>
                    </div>
                </div>

            </div>
            </QueueAnim>
        );
    }

}

function mapToStateProps(state) {
    let data = state.getIn(['reduceInfo', 'data']);
    let ImgSrc = state.getIn(['reduceInfo', 'src']);
    if (state.getIn(['reduceInfo', 'data', 'success'])){
        data = state.getIn(['reduceInfo', 'data', 'resultMap', 'user'])
    }
    return {
        dataInfo : data,
        imgSrc : ImgSrc
    };
}
export default connect(mapToStateProps)(EditInfo);

