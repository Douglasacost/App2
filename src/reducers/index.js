//Reducers will be here.
import { Map } from 'immutable';
import * as Types from '../constants/ActionTypes';

const setState = (state, newState) => state.mergeDeep(newState);
const setField = (state, form, input, data) => state.setIn([form, input], data);
const setFormData = (state, form, data) => {
  let test = state.mergeDeepIn([form], data);
  console.log(test.toJS());
  return test;
}
let initialState = Map({});

export default function(state = initialState, action) {
  switch(action.type){
    case Types.SET_STATE:
      return setState(state, action.state);
    case Types.SET_FIELD:
      return setField(state, action.form, action.input, action.data);
    case Types.SET_FORM_DATA:
      return setFormData(state, action.form, action.data);
  }
}