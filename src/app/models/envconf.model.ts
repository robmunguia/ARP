
export class EnvConfirmados {
    constructor (
        public cliente: string = '',
        public enviados: number = 0,
        public proceso: number = 0,
        public confirmados: number = 0,
        public total: number = 0,
        public fecha: Date = new Date()
    ) { }
}
