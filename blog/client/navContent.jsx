/**
 * Created by caozheng on 2016/9/23.
 */
import {connect} from 'react-redux';
import '{public}/css/navContent.scss';
// import Pic from '{public}/images/default.jpg';
import {getInfo} from './redux/actions/navContent';

const Pic = '/public/images/default.jpg';
class NavContent extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount (){
        //这里触发更新只有两种方式 1、第一次加载 2、用户更新信息
        const { dispatch } = this.props;

        dispatch(getInfo());
    }

    render (){
        const state = this.props;
        return(
            <div style={{position : 'relative'}}>
                <div className="nav-overlay"></div>
                <div className="nav-content">
                    <div className="intrude-less">
                        <div className="inner">
                            <div className="profilepic">
                                <img className="avatar" src={state.data.get('avatar') || Pic}/>
                            </div>
                            <intro className="intro">
                                <h1 className="intro-user">{state.data.get('nickname') || '请登录'}</h1>
                                <h1 className="intro-info">个人简介</h1>
                                <p className="intro-p">{state.data.get('userinfo') || "这里填写简介，此为默认值"}</p>
                            </intro>
                        </div>
                        {/*nav content*/}

                    </div>

                </div>
            </div>

        )
    }
}

function mapToStateProps(state){
    let data = state.getIn(['reduceInfo', 'data']);
    if (state.getIn(['reduceInfo', 'data', 'success'])){
        data = state.getIn(['reduceInfo', 'data', 'resultMap', 'user'])
    }
    return {
        data : data
    }
}

export default connect(mapToStateProps)(NavContent)
