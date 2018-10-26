import { Estatus } from '../models/estados.model';

// export const URL_SERVICIOS = 'http://localhost:56067/api';
export const URL_SERVICIOS = 'http://prueba.bajarec.com/api';

export const estados: Estatus[] = [{ Id: 0, Nombre: 'Activo' },
                                    { Id: 1, Nombre: 'Baja' },
                                    { Id: 2, Nombre: 'Bloqueado' } ];

export const reqEstatus: Estatus[] = [{ Id: 1, Nombre: 'Activo' },
                                    { Id: 2, Nombre: 'Cancelado' },
                                    { Id: 3, Nombre: 'Completado' } ];
