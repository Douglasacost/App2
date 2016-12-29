//Reducers will be here.
import { Map } from 'immutable';
import * as Types from '../constants/ActionTypes';

const setState = (state, newState) => state.mergeDeep(newState);
const setField = (state, location, input, data) => state.setIn([form, input], data);
let initialState = Map({});

export default function(state = initialState, action) {
  switch(action.type){
    case Types.SET_STATE:
      return setState(state, action.state);
    case Types.SET_FIELD:
      return setField(state, action.location, action.input, action.data);
  }
}