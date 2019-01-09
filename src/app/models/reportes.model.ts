import { Fecha } from './date.model';
import { ReporteGeneral } from './ReporteGeneral.model';
import { Sucursales } from './sucursal.model';

export class Reportes {
    constructor (
        public FecInicio: Fecha = new Fecha(),
        public FecFinal: Fecha = new Fecha(),
        public Estado: number = 0,
        public sucursales: Sucursales[] = [],
        public resultados: ReporteGeneral[] = []
    ) { }
}
