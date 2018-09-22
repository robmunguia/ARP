
export class Usuario {
    constructor (
        public Id: number = 0,
        public Nombre: string = '',
        public NombreUsuario: string = '',
        public Password: string = '',
        public Estatus: number = 0,
        public CambiarPassword: boolean = false,
        public FechaPassword: Date = new Date(),
        public Intentos: number = 0,
        public UltimoAcceso: Date = new Date(),
        public UltimaSalida: Date = new Date(),
        public RolId: number = 0,
        public NoEmpleado: number = 0,
        public EmpresaId: number = 0
    ) { }
}
