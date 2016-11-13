//Reducers will be here.
import { Map } from 'immutable';
import $ from "jquery";
import * as Types from '../constants/ActionTypes';

const setState = (state, newState) => {
  state.mergeDeep(newState);
}
const setField = (state, form, input, data) => state.setIn([form, input], data);
const getData = (list) => {
  $.getJSON(list, function(data){
      let listData = data.d.results;
      console.log(listData);
      let testMap = Map(listData);
      console.log(testMap);
      let mapped = {};
    });
}

let initialState = Map({});

export default function(state = initialState, action) {
  switch(action.type){
    case Types.SET_STATE:
      return setState(state, action.state);
    case Types.SET_FIELD:
      return setField(state, action.form, action.input, action.data);
    case Types.GET_DATA:
      return getData(list);
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