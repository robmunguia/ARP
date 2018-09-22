import { Puesto } from './puesto.model';
import { Turno } from './turno.model';

export class Cliente {
    constructor (
        public LLAVE: number = 0,
        public Id: number = 0,
        public Nombre: string = '',
        public Descripcion: string = '',
        public Turnos: Turno[] = [],
        public Puestos: Puesto[] = []
    ) { }
}
