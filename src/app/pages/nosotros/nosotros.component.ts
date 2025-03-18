import { Component } from '@angular/core';

// Interface para tipar los datos del equipo
interface Developer {
  name: string;
  email: string;
  age: number;
  role?: string;
}
@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.css'
})
export class NosotrosComponent {
    // Datos del equipo de desarrollo
    developers: Developer[] = [
      {
        name: 'Ing. Anderson Velásquez',
        email: 'hvelasquez@utm.edu.ec',
        age: 21
      },
      {
        name: 'Ing. Josselin De la Cruz',
        email: 'jdelacruz@utm.edu.ec',
        age: 21
      },
      {
        name: 'Ing. Hansel Alcívar',
        email: 'halcivar@utm.edu.ec',
        age: 21
      }
    ];

    // Datos del propietario
    owner = {
      name: 'Luis Cansion',
      role: 'Propietario'
    };
}
