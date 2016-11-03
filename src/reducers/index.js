//Reducers will be here.
import { Map } from 'immutable';
import * as Types from '../constants/ActionTypes';

const setState = (state, newState) => state.mergeDeep(newState);
const setDate = (state, form, input, date) => state.setIn([form, input], date);

let initialState = Map({});

export default function(state = initialState, action) {
  switch(action.type){
    case Types.SET_STATE:
      return setState(state, action.state);
    case Types.SET_DATE:
      return setDate(state, action.form, action.input, action.date);
  }
}