/**
 * Created by caozheng on 2016/9/23.
 */
import {connect} from 'react-redux';
import '{public}/css/navContent.scss';
class NavContent extends React.Component{
    constructor(props){
        super(props);
    }
    render (){
        return(
            <div style={{position : 'relative'}}>
                <div className="overlay"></div>
                <div className="nav-content">
                    <div className="intrude-less">
                        <div className="inner">
                            <div className="profilepic">
                                <img className="avatar" src="http://litten.github.io/assets/blogImg/litten.png"/>
                            </div>
                            <intro className="intro">
                                <h1 className="intro-user">Karzan</h1>
                                <h1 className="intro-info">个人简介</h1>
                                <p className="intro-p">这里是个人简介多少字的限制，我还没有想好，暂时先输入这么多看看什么效果~~~</p>
                            </intro>
                        </div>
                        {/*nav content*/}

                    </div>

                </div>
            </div>

        )
    }
}

export default connect()(NavContent)
