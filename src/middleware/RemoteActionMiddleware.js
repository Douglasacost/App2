export default bridge => store => next => action => {
    if(action.meta && action.meta.remote){
        //bridge.send(action.name, action);
        console.log('remote metadata');
    }
}