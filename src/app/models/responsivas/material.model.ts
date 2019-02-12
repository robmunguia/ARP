import { TipoMaterial } from './tipomaterial.model';

export class Material {
    constructor (
        public id: number = 0,
        public nombre: string = '',
        public tipo: TipoMaterial = new TipoMaterial(),
        public talla: boolean = false,
        public cantidad: number = 0,
        public activo: boolean = false,
        public total: number = 0
    ) { }
}
