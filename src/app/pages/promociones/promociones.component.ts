import { Component, OnInit } from '@angular/core';
import { PromocionesService } from '../../services/promociones.service';

interface Promotion {
  title: string;
  description: string;
  discount: number;
  expirationDate: string;
  image: string;
}
@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrl: './promociones.component.css'
})
export class PromocionesComponent{
  promotions: Promotion[] = [
    {
      title: 'Noche de Whisky',
      description: '2x1 en todos los whiskies premium durante octubre',
      discount: 50,
      expirationDate: '31/10/2023',
      image: 'assets/whisky.jpg'
    },
    {
      title: 'Vinos Premium',
      description: '30% de descuento en vinos seleccionados',
      discount: 30,
      expirationDate: '15/11/2023',
      image: 'assets/vinos.jpg'
    },
    {
      title: 'Combo Cervezas',
      description: 'Lleva 6 cervezas artesanales al precio de 4',
      discount: 33,
      expirationDate: '20/11/2023',
      image: 'assets/images/cerveza.jpg'
    },
    {
      title: 'Noche de Whisky',
      description: '2x1 en todos los whiskies premium durante octubre',
      discount: 50,
      expirationDate: '31/10/2023',
      image: 'assets/whisky.jpg'
    },
    {
      title: 'Vinos Premium',
      description: '30% de descuento en vinos seleccionados',
      discount: 30,
      expirationDate: '15/11/2023',
      image: 'assets/vinos.jpg'
    },
    {
      title: 'Combo Cervezas',
      description: 'Lleva 6 cervezas artesanales al precio de 4',
      discount: 33,
      expirationDate: '20/11/2023',
      image: 'assets/images/cerveza.jpg'
    }
  ];

}
