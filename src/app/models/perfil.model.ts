
export class Perfil {
    constructor (
        public requisiciones: number = 0,
        public enviados: number = 0,
        public confirmados: number = 0,
        public puesto: string = ''
    ) { }
}
