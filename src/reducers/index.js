//Reducers will be here.
import { Map } from 'immutable';
import * as Types from '../constants/ActionTypes';

const setState = (state, newState) => state.mergeDeep(newState);

// default value for state
let initialState = Map({});

export default function(state = initialState, action) {
  switch(action.type){
    case Types.SET_STATE:
      return setState(state, action.state);
    default:
      return Map({});
  }
}