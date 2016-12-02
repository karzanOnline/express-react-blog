
//dialog组件
import {connect} from 'react-redux';
import '{public}/css/components/dialog';
import RUI from 'react-component-lib';

class Dialog extends React.Component{
    constructor(props){
        var win = window;
        super(props);
        this.state = {
            height : win.innerHeight,
            width : win.innerWidth
        }
    }

    componentDidMount (){
        var _this = this;
        this.refs.dialog.show();
        setTimeout(function () {

            console.log('resize')
        },50)


    }


    render (){
        return (
            <RUI.Dialog ref="dialog" title="测试标题" draggable={false} buttons="submit,cancel" onCancel={this.dialogCancel} onSubmit={this.dialogSubmit}>
                <div style={{width:'240px', wordWrap:'break-word'}}>
                    <p>在这里可以自定义任何节点和内容</p>
                </div>
            </RUI.Dialog>
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

