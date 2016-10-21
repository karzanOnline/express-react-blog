
//for js
function getParam(name){

    let re = new RegExp("(^|&)"+name+"([^&])*(&|$)","i");
}

//for react-router
function oGetParam (url){
    //let str = url.replace(/(=)/ig,":").replace(/(&)/ig,",").replace(/^\?/ig,"");
    let re = new RegExp("([?=&])([A-Za-z0-9]*)","ig"),
        arr = [],
        result = {},
        value;

    //to array
    while(value=re.exec(url)){

        if(value[2]==''){
            continue;
        }
        arr.push(value[2]);

    }
    
    //to json
    for (var i=0;i<arr.length;i++){
        if(i%2==0){
            //even property
            result[arr[i]] = ''
            
        }else{
            //odd value 
            result[arr[i-1]] = arr[i]
        }
        
    }

    return result
    
}

export {oGetParam}