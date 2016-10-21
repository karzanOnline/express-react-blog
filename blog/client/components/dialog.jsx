
//dialog组件
import {connect} from 'react-redux';
import '{public}/css/components/dialog';

class Dialog extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount (){
        let _this = this;
        let dom = document.body;
        dom.offsetWidth;
        window.screen.availHeight;
        debugger;
        

    }


    render (){
        return (
            <div className="dialog-wrap-main">
                <header>
                    12312
                </header>
            
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        msg : '',
        
    }

}
function mapDispatchToProps (){

}
export default connect()(Dialog)

