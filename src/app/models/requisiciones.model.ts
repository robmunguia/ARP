import { Requisicion } from './requisicion.model';
export class Requisiciones {
    constructor (
        public ClieCodigo: string = '',
        public ClieNombre: string = '',
        public requisiciones: Requisicion[] = [],

        public Hombres: number = 0,
        public Mujeres: number = 0,
        public Indistinto: number = 0,
        public Color: string = '',
        public TextColor: string = ''
    ) { }
}
