
export class Tablero {
    constructor (
        public activos: number = 0,
        public confirmados: number = 0,
        public envios: number = 0,
        public bajas: number = 0,
        public requisiciones: number = 0
    ) { }
}
