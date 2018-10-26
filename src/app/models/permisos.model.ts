import { Roles } from './roles.model';
import { Modulos } from './modulos.model';

export class Permisos {
    constructor (
        public id: number = 0,
        public consultar: boolean = false,
        public agregar: boolean = false,
        public modificar: boolean = false,
        public imprimir: boolean = false,
        public grupo: Roles = new Roles(),
        public modulo: Modulos = new Modulos()
    ) { }
}
