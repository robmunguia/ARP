
export class ReporteGeneral {
    constructor (
        public Folio: number = 0,
        public Cliente: string = '',
        public FecIngreso: Date = new Date(),
        public FecCreado: Date = new Date(),
        public FecCerrado: Date = new Date(),
        public Total: number = 0,
        public Enviado: number = 0,
        public Confirmado: number = 0,
        public DiasAbierta: number = 0,
        public DiasTarde: number = 0
    ) { }
}
