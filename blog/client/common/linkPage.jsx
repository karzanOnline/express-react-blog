/**
 * Created by caozheng on 2016/9/9.
 */

import {Component} from 'react';
import {Link} from 'react-router';
export default class LinkPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            linkData : this.props.linkData||['01','04','05']
        }
    }

    componentWillReceiveProps(receiveProps){
        if (receiveProps){
            this.setState({
                linkData : receiveProps.linkData
            })
        }
    }
    render (){
        return (
            <div>
                {
                    this.state.linkData.map((item,index)=>{
                        return(
                            <span>
                                <Link key="index" title={item.text} to={item.url}>{item.text}</Link>
                            </span>
                        )

                    })
                }
            </div>
        )
    }
}