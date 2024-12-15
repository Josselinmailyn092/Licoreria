import { Component, OnChanges,OnDestroy,OnInit,SimpleChanges,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  {
  @ViewChild('categoryCarousel', { static: false }) categoryCarousel!: NzCarouselComponent;
  animationActive: boolean = false;
  categories: string[] = ['#Ginebra', '#Gin', '#Cerveza', '#Vino', '#Tequila'];
  currentCategoryIndex: number = 0;
  categoryText: string = this.categories[this.currentCategoryIndex];
  private categoryInterval: any;

  showWhatsAppPopup: boolean = false;
  categorias = [
    { name: 'Licores', products: 42, color: '#881f06', image: 'assets/images/brandy.jpeg', route: '/licores' },
    { name: 'Confitería', products: 18, color: '#FF5F00', image: 'assets/images/confiteria.png', route: '/confiteria' },
    { name: 'Whisky', products: 26, color: '#AA2202', image: 'assets/images/whisky.png', route: '/whisky' },
    { name: 'Gin', products: 15, color: '#FFB164', image: 'assets/images/gin.png', route: '/gin' },
    { name: 'Brandy', products: 20, color: '#D72B00', image: 'assets/images/brandy.png', route: '/brandy' },
    { name: 'Cerveza', products: 35, color: '#FF8326', image: 'assets/images/cerveza.png', route: '/cerveza' },
    { name: 'Tequila', products: 12, color: '#FF4100', image: 'assets/images/tequila.png', route: '/tequila' },
    { name: 'Vodka', products: 10, color: '#FF5F00', image: 'assets/images/vodka.png', route: '/vodka' },
    { name: 'Vinos', products: 30, color: '#881F06', image: 'assets/images/vinos.png', route: '/vinos' }
  ];
  
  constructor(private router: Router) {}

  toggleWhatsAppPopup(): void {
    this.showWhatsAppPopup = !this.showWhatsAppPopup;
  }

  redirectToWhatsApp(): void {
    window.open('https://wa.me/1234567890', '_blank'); // Cambia el número de WhatsApp
  }

  navigateToCategory(route: string): void {
    this.router.navigate([route]);
  }

  prev(): void {
    this.categoryCarousel?.pre(); // Navegar hacia la izquierda
  }

  next(): void {
    this.categoryCarousel?.next(); // Navegar hacia la derecha
  }


  goToLiquor(): void {
    this.router.navigate(['/licores']); // Redirige al componente de licores
  }


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
