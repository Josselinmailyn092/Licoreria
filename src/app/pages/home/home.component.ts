import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  brandLogos = [
    'assets/vodka.png',
    'assets/cerveza.png',
    'assets/vino.png',
    'assets/gin.png',
    'assets/whiskey.png',
  ];

  painPoints = [
    'Dificultad para encontrar productos de alta calidad.',
    'Falta de promociones atractivas.',
    'Tiempo de espera prolongado en entregas.',
  ];

  benefits = [
    'Amplia variedad de productos.',
    'Precios competitivos y promociones frecuentes.',
    'Entrega rápida y eficiente.',
    'Atención personalizada.',
  ];

  testimonials = [
    {
      name: 'Carlos Rodríguez',
      feedback: 'Excelente atención y productos de calidad. Recomendado.',
    },
    {
      name: 'María López',
      feedback: 'Las promociones son increíbles, siempre encuentro lo que busco.',
    },
    {
      name: 'Juan Pérez',
      feedback: 'El mejor lugar para comprar licores en la ciudad.',
    },
  ];
}
