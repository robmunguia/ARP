
export class Proceso {
    constructor (
        public reqId: number = 0,
        public motivo: string = '',
        public msg: string = '',
        public estatus: number = 0
    ) { }
}
