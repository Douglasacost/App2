import $ from 'jquery';
import { Map, fromJS, List } from 'immutable';

function formApi() {
  this.getData = function(list) {
    $.getJSON(list, function(data){
      console.log(data.d.results);
      let listData = Map(data.d.results['0']);
      let mapped = {};
      listData.map(function(key, value){
          console.log(key);
          console.log(value);
          let lowKey = firstToLower(key);
          mapped.set(lowKey, value); 
      });
      console.log(mapped);
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