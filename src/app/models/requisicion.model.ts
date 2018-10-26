import { Cliente } from './cliente.model';
import { Turno } from './turno.model';
import { Puesto } from './puesto.model';
import { Fecha } from './date.model';
import { TipoNomina } from './tnomina.model';
import { Usuario } from './usuario.model';
import { Envio } from './envios.model';

export class Requisicion {
    constructor (
        public Id: number = 0,
        public cliente: Cliente = new Cliente(),
        public turno: Turno = new Turno(),
        public puesto: Puesto = new Puesto(),
        public fecha: Fecha = new Fecha(),
        public tnomina: TipoNomina = new TipoNomina(),
        public usuario: Usuario = new Usuario(),
        public envios: Envio[] = [],
        public salario: number = 0,
        public vales: number = 0,
        public Hombres: number = 0,
        public Mujeres: number = 0,
        public Indistinto: number = 0,
        public Comentario: string = '',
        public estatus: number = 0,
        public DesEstatus: string = ''
    ) { }
}
