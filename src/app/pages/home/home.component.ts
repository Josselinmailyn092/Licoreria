import { Component, OnChanges,SimpleChange,SimpleChanges,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnChanges {
  animationActive: boolean = false;
  categories: string[] = ['#Ginebra', '#Gin', '#Cerveza', '#Vino', '#Tequila'];
  currentCategoryIndex: number = 0;
  categoryText: string = this.categories[this.currentCategoryIndex];

  
  constructor(private router: Router) {}
  // Llama esta función cuando el componente se muestra
  ngOnChanges(changes: SimpleChanges): void {
    this.triggerAnimation();
  }

  triggerAnimation(): void {
    this.animationActive = false; // Elimina la animación
    setTimeout(() => {
      this.animationActive = true; // Reaplica la animación después de un pequeño retraso
    }, 10); // Retraso mínimo para reactivar la animación
  }
   goToLiquor(): void {
    this.router.navigate(['/licores']); // Redirige al componente de licores
  }

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
