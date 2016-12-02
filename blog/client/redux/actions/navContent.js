/**
 * Created by caozheng on 2016/10/26.
 */

export const NAV_CONTENT = 'NAV_CONTENT';

export const MAIN_CONTENT = 'MAIN_CONTENT';

export const INFO_PIC = 'INFO_PIC';

//修改success
export const STATE_CHANGE = 'STATE_CHANGE';

export const userInfo = '/info';

export function getStateChange() {
    return {
        type : STATE_CHANGE
    }
}

export function getInfoPic(src) {
    return {
        type : INFO_PIC,
        src
    }
}

export function getUserInfo(data) {
    return {
        type : NAV_CONTENT,
        data
    }
}

export function getMainInfo() {
    return{
        type : MAIN_CONTENT
    }
}

export function getInfo(obj) {
    return (dispatch)=>{
        $.ajax({
            type : 'post',
            dataType :'json',
            url : userInfo,
            data :obj,
        }).then((data)=>{
            if(data.success){
                dispatch(getUserInfo(data))
            }
        }).catch((err)=>{
            throw err
        })
    }

}