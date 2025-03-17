import { Injectable } from '@angular/core';

interface Link {
  // Difine estructura del enlace con dos propiedades
  path: string;
  label: string;
}
// Poder inyectar servicio en otro componente o servicio
@Injectable({
  // Disponible en toda la app
  providedIn: 'root'
})
export class LinkService {
  // links un array de objetos Link
  links: Link[] = [
    { path: '/home', label: 'Inicio' },
    { path: '/licores', label: 'Licores' },
    // { path: '/confiteria', label: 'Confiteria' },

    { path: '/nosotros', label: 'Nosotros' }
  ];

  // devuleve array de enlaces de links
  getLinks() :Link[]{
    return this.links;
  }
}
