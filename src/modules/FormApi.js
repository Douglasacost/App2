import $ from 'jquery';
import { Map, fromJS, List } from 'immutable';

function formApi() {
  this.getData = function(list, keysNames, formId, form, callback) {
    let mapped = Map({});
    $.getJSON(list, function(data){
      let listData = Map(data.d.results[formId]);
      let filteredData = Map({});
      keysNames.map(function(key){
        let value = listData.get(key);
        filteredData = filteredData.set(key, value);
      });
      filteredData.map(function(value, key){
          let lowKey = firstToLower(key);
          mapped = mapped.set(lowKey, value); 
      });
      callback(form, mapped);
    });
  }
}

//common functions
//** GET and POST mapping
let firstToLower = function(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
};

let firstToUpper = function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

let mapToJsObject = function(o) {
    let r = {};
    $.map(o, function(item, index) {
        r[firstToLower(index)] = o[index];
    });
    return r;
};

let mapFromJsObject = function(o) {
    let r = {};
    $.map(o, function(item, index) {
        r[firstToUpper(index)] = o[index];
    });
    return r;
};

module.exports = formApi;