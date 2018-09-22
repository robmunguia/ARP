
export class Fecha {
    constructor (
        public year: number = new Date().getFullYear(),
        public month: number = new Date().getMonth() + 1,
        public day: number = new Date().getDate()
    ) { }
}
