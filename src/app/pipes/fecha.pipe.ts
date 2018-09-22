import { Pipe, PipeTransform } from '@angular/core';
import { Fecha } from '../models/date.model';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(fecha: Fecha, args?: any): string {

    const dia = fecha.day;
    const year = fecha.year;
    switch ( fecha.month ) {
      case 1:
      return dia + '/Ene/' + year;
      case 2:
      return dia + '/Feb/' + year;
      case 3:
      return dia + '/Mar/' + year;
      case 4:
      return dia + '/Abr/' + year;
      case 5:
      return dia + '/May/' + year;
      case 6:
      return dia + '/Jun/' + year;
      case 7:
      return dia + '/Jul/' + year;
      case 8:
      return dia + '/Ago/' + year;
      case 9:
      return dia + '/Sep/' + year;
      case 10:
      return dia + '/Oct/' + year;
      case 11:
      return dia + '/Nov/' + year;
      case 12:
      return dia + '/Dic/' + year;
    }

    return fecha.day + '/Sin Mes/' + fecha.year;
  }

}
