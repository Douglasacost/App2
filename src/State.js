import { Map, fromJS, List } from 'immutable';
import moment from 'moment';

export default Map({
    User: Map({
        name: 'TestName'
    }),
    IndexComponent: Map({}),
    ComponentA: Map({
        radioSample: '',
        checkboxSample: '',
        dropdown: '',
        sampleDate: ''
    }),
    ComponentB: Map({
        radioSample: '',
        checkboxSample: '',
        dropdown: '',
        sampleDate: ''
    })
});