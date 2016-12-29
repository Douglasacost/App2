import { Map, fromJS, List } from 'immutable';

let verifyRequired = function(){
    this.verify = function(keysNames, state, callback){
        let errorMessage = 'Error',
            validForm = true,
            alwaysRequire = ['key1', 'key2', 'key3'];
            keysNames = keysNames.concat(alwaysRequire);
        keysNames.map(function(key){
            let value = state.get(key);
            if(value === '' || value === undefined || value === null){
                validForm = false;
            }
        });
        if(validForm){
            callback();
        } else {
            alert(errorMessage);
        }
    }
}

module.exports = verifyRequired;