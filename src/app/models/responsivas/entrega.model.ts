import { DetalleEntrega } from './detentrega.model';
import { Colaborador } from './colaborador.model';

export class Entrega {
    constructor (
        public id: number = 0,
        public fechaEntrega: Date = new Date(),
        public notas: string = '',
        public estatus: string = '',
        public colaborador: Colaborador = new Colaborador(),
        public detalle: DetalleEntrega[] = []
    ) { }
}
