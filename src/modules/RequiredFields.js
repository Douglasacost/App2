import $ from 'jquery';
import { Map, fromJS, List } from 'immutable';

let verifyRequired = function(){
    this.verify = function(keysNames, state, callback){
        let errorMessage = 'Debe seleccionar Pais, Division, Producto y todos los campos de firma antes de enviar el formulario.',
            validForm = true,
            alwaysRequire = ['paisProceso', 'divisionProceso', 'productoProceso'];
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