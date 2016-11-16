import { Map, fromJS, List } from 'immutable';
import moment from 'moment';

let today = moment();

export default Map({
    user: Map({
        displayName: ''
    }),
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
        fecha: '',
        tipoDeOrden: '',
        ordenDeCompra: '',
        proveedor: '',
        bienesOServiciosSolicitados: '',
        monto: '',
        moneda: '',
        razonDeExcepcion: '',
        fechaFirmaDelSolicitante: '',
        fechaFirmaDelJefeInmediato: '',
        fechaFirmaDelGerente: '',
        jefeInmediato: '',
        jefeInmediatoAprobo: '',
        gerenteGeneral: '',
        gerenteGeneralAprobo: '',
        requiereFirmaDirector: '',
        aprobadores: Map({}),
        solicitante: '',
        estado: ''
    }),
    abbottObjetivosActividad: Map({
        date: today
    }),
    abbottExpensesReport: Map({
        date: today
    })
});