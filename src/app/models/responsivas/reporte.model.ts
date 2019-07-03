
export class RptResponsiva {
    constructor (
        public folio: number = 0,
        public empleado: string = '',
        public material: string = '',
        public cantidad: number = 0,
        public estado: string = '',
        public fechaEntrega: Date = null,
        public fechaRetorno: Date = null
    ) { }
}
