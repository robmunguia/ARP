import { Material } from './material.model';
import { Entrega } from './entrega.model';
import { Fecha } from '../date.model';

export class DetalleEntrega {
    constructor (
        public id: number = 0,
        public cantidad: number = 0,
        public talla: string = '',
        public retorno: boolean = false,
        public imprimir: boolean = false,
        public fechaEntrega: Date = new Date(),
        public fecha: Fecha = new Fecha(),
        public fechaRetorno: Date = new Date(),
        public material: Material = new Material(),
        public entrega: Entrega = new Entrega()
    ) { }
}
