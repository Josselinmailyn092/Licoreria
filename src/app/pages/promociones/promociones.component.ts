import { Component, OnInit } from '@angular/core';
import { PromocionesService } from '../../services/promociones.service';
@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrl: './promociones.component.css'
})
export class PromocionesComponent{

  promotions = [
    {
      name: 'Whisky Johnnie Walker Etiqueta Negra',
      image: 'assets/whisky.jpg',
      originalPrice: 189.90,
      discount: 0.30,
      endDate: new Date('2024-03-31'),
      category: 'Whisky'
    },
    {
      name: 'Vodka Absolut Mandarín',
      image: 'assets/vodka.jpg',
      originalPrice: 79.90,
      discount: 0.25,
      endDate: new Date('2024-03-25'),
      category: 'Vodka'
    },
    // Agrega más productos...
  ];

  getDiscountedPrice(product: any): number {
    return product.originalPrice * (1 - product.discount);
  }

  getTimeRemaining(endDate: Date): string {
    // Lógica para calcular tiempo restante
    return '3 días 12 horas';
  }


}
