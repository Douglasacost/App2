import $ from 'jquery';
import { Map, fromJS, List } from 'immutable';

function formApi() {
  this.getData = function(list, keysNames, formId) {
      console.log(list);
      console.log(keysNames);
      console.log(formId);
      let testX = Map({});
      testX.set('nombre', 'Alberto');
      console.log(testX);
    $.getJSON(list, function(data){
      console.log('entered jquery getjson');
      console.log(data.d.results);
      let listData = Map(data.d.results[formId]);
      console.log('listData');
      console.log(listData);
      let filteredData = Map({});
      keysNames.map(function(key){
        console.log('key');
        console.log(key);
        let value = listData.get(key);
        console.log(value);
        filteredData = filteredData.set(key, value);
      });
      console.log('filteredData');
      console.log(filteredData);
      let mapped = Map({});
      filteredData.map(function(value, key){
          console.log(key);
          console.log(value);
          let lowKey = firstToLower(key);
          mapped = mapped.set(lowKey, value); 
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