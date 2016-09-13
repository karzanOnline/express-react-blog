/**
 * Created by caozheng on 2016/9/13.
 */

/*这是action的中间件*/
const logger = store => next => action => {
 // what you do before action,
      example: logger. console.log("dispatching", action);
 let result = next(action);
     // what you can do after action
 console.log('next state', store.getState());
 return result;
}
