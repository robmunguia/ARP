import { Estatus } from '../models/estados.model';

export const URL_SERVICIOS = '/api';
// export const URL_SERVICIOS = 'http://localhost:51113/api';

export const estados: Estatus[] = [{ Id: 0, Nombre: 'Activo' },
                                    { Id: 1, Nombre: 'Baja' },
                                    { Id: 2, Nombre: 'Bloqueado' } ];

export const reqEstatus: Estatus[] = [{ Id: 1, Nombre: 'Activo' },
                                    { Id: 2, Nombre: 'Cancelado' },
                                    { Id: 3, Nombre: 'Completado' } ];
