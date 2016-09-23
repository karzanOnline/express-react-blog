/**
 * Created by caozheng on 2016/9/21.
 */
import { connect } from 'react-redux';
import '{public}/css/info.scss';
class EditInfo extends React.Component{
    constructor(props){
        super(props)
    }

    render (){
        return (
            <div>
                <div className="wrap-main-content">
                    <div className="wrap-info">
                        <label className="info-pic">头像: </label>
                        <img className="info-icon" src="http://litten.github.io/assets/blogImg/litten.png"></img>
                        <button className="button upload-button">上传照片</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default connect()(EditInfo)
