import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../models/models.index';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(usuario: Usuario): any {
    let url = URL_SERVICIOS + '/Auth/';
    if ( usuario === null ) {
      url = url + '999999';
    } else {
      url = url + usuario.Id;
    }
    return url;
  }

}
