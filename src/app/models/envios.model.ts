import { Fecha } from './date.model';
import { Usuario } from './usuario.model';
import { Requisicion } from './requisicion.model';

export class Envio {
    constructor (
        public id: number = 0,
        public hombre: number = 0,
        public mujer: number = 0,
        public indistinto: number = 0,
        public fecha: Fecha = new Fecha(),
        public usuario: Usuario = new Usuario(),
        public confUser: Usuario = new Usuario(),
        public estatus: string = '',
        public confhombre: number = 0,
        public confmujer: number = 0,
        public confindistinto: number = 0,
        public requisicion: Requisicion = new Requisicion()
    ) { }
}
