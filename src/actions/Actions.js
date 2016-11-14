//Actions will be here. Please define the actions and later use them in actions creator functions.
import * as Types from '../constants/ActionTypes';

export const setState = (state) => {
    return {
        type: Types.SET_STATE,
        state
    };
}

export const setField = (form, input, data) => {
    return {
        type: Types.SET_FIELD,
        form,
        input,
        data
    };
}

export const setFormData = (form, data) => {
    return {
        type: Types.SET_FORM_DATA,
        form,
        data
    };
}