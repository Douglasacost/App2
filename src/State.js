import { Map, fromJS, List } from 'immutable';
import moment from 'moment';

let today = moment();

export default Map({
    today: today,
    abbott01: Map({
        date: today,
        startDate: today,
        endDate: today
    }),
    abbott02: Map({
        date: today
    }),
    abbott04: Map({
        date: today
    }),
    abbott05: Map({
        date: today
    }),
    abbott06: Map({
        date: today
    }),
    abbott10: Map({
        date: today
    }),
    abbott101: Map({
        date: today
    }),
    abbott11: Map({
        date: today
    }),
    abbottExcepcionCompra: Map({
        fecha: today,
        tipoDeOrden: '',
        ordenDeCompra: '10',
        proveedor: 'test',
        bienesOServiciosSolicitado: '',
        monto: '100',
        moneda: '',
        razonDeExcepcion: '',
        fechaFirmaSolicitante: today,
        fechaFirmaJefeInmediato: today,
        fechaFirmaGerente: today
    }),
    abbottObjetivosActividad: Map({
        date: today
    }),
    abbottExpensesReport: Map({
        date: today
    })
});