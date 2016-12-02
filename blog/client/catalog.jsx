/**
 * Created by caozheng on 2016/10/31.
 */

import {connect} from 'react-redux';
import QueueAnim from 'rc-queue-anim';

class Catalog extends React.Component{
    constructor(props){
        super(props);

    }

    componentDidMount (){

    }

    render (){
        return (
            <QueueAnim>
                <div>

                    1234
                </div>
            </QueueAnim>
        )

    }
}

function mapStateToProps(state){
    return {
        catalogData : ''
    }

}

export default connect(mapStateToProps)(Catalog);