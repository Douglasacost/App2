import $ from 'jquery';
import { Map, fromJS, List } from 'immutable';

let verifyRequired = function(){
    this.verify = function(keysNames, state, callback){
        let requiredFields = keysNames.join(),
            errorMessage = 'Los siguientes campos son necesarios:' + requiredFields;
        keysNames.map(function(key){
            let value = state.get(key);
            if(value !== '' && value !== undefined && value !== null){
                console.log('ok');
                callback();
            } else {
                alert(errorMessage);
                return
            }
        });
    }
}

module.exports = verifyRequired;