import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';
import { CategoriaService } from '../../services/categoria.service';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../models/licores.models';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('categoryCarousel', { static: false }) categoryCarousel!: NzCarouselComponent;
  animationActive: boolean = false;
  categories: string[] = ['#Ginebra', '#Gin', '#Cerveza', '#Vino', '#Tequila'];
  currentCategoryIndex: number = 0;
  categoryText: string = this.categories[this.currentCategoryIndex];
  private categoryInterval: any;

  chunkedProducts: any[] = [];
  featuredProducts: any[] = [];
  showWhatsAppPopup: boolean = false;
  categorias: any[] = [];
  paginatedProducts: any[] = [];
  currentPage: number = 0;
  pageSize: number = 4;
  totalPages: number = 0;
  url='http://localhost:3000/uploads';
  constructor(private carritoService: CarritoService, private categoriaService: CategoriaService, private router: Router) {}

  ngOnInit() {
    this.loadCategorias();
    // this.loadFeaturedProducts();
  }
  // // Carrito
  //  agregarProductoAlCarrito(producto: Producto): void {
  //   this.carritoService.agregarProducto(producto);
  // }
  loadCategorias(): void {
    this.categoriaService. obtenerProductosPorCategoria().subscribe(
      (data) => {
        this.categorias = data.map((item: any) => ({
          name: item.Categoria,
          products: item.TotalProductos,
          color: this.getCategoryColor(item.Categoria),
          image: this.getCategoryImage(item.Categoria),
          route: `${item.Categoria.toLowerCase()}`
        }));
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  // loadFeaturedProducts(): void {
  //   this.productoService.getProductosDestacados().subscribe(
  //     (data) => {
  //       this.featuredProducts = data.map((producto: any) => ({
  //         ...producto,
  //         imagenUrl: `${this.url}/${producto.imagen}`
  //       }));
  //       this.totalPages = Math.ceil(this.featuredProducts.length / this.pageSize);
  //       this.updatePaginatedProducts();
  //     },
  //     (error) => {
  //       console.error('Error fetching featured products:', error);
  //     }
  //   );
  // }


  updatePaginatedProducts(): void {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedProducts = this.featuredProducts.slice(start, end);
  }

   nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.updatePaginatedProducts();
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePaginatedProducts();
    }
  }


  getCategoryColor(category: string): string {
    const colors: { [key: string]: string } = {
      Licores: '#FFFFFF',
      Whiskey: '#FFFFFF',
      Gin: '#FFFFFF',
      Brandy: '#FFFFFFF',
      Cerveza: '#FFFFFF',
      Tequila:'#FFFFFF',
      Vodka: '#FFFFFF',
      Vinos: '#FFFFFF'
    };
    return colors[category] || '#FFFFFF';
  }

  getCategoryImage(category: string): string {
    const images: { [key: string]: string } = {
      Licores: 'assets/images/brandy.jpeg',
      Whiskey: 'assets/images/Whiskey.jpg',
      Gin: 'assets/images/Gin.png',
      Brandy: 'assets/images/brandy.jpeg',
      Cerveza: 'assets/images/cerveza.jpg',
      Tequila: 'assets/images/tequila.jpg',
      Vodka: 'assets/images/vodka.png',
      Vinos: 'assets/images/vino.jpg'
    };
    return images[category] || 'assets/images/default.jpg';
  }

  chunkFeaturedProducts() {
    const chunkSize = 4;
    this.chunkedProducts = [];
    for (let i = 0; i < this.featuredProducts.length; i += chunkSize) {
      this.chunkedProducts.push(this.featuredProducts.slice(i, i + chunkSize));
    }
  }

  toggleWhatsAppPopup(): void {
    this.showWhatsAppPopup = !this.showWhatsAppPopup;
  }

  redirectToWhatsApp(): void {
    window.open('https://wa.link/iecfyy', '_blank'); // Cambia el número de WhatsApp
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


brands = [
  { name: 'Occucaje', logo: 'assets/images/brandy.jpeg' },
  { name: 'Il Produce Neo', logo: 'assets/images/Gin.png' },
  { name: 'Old Par', logo: 'assets/images/vino.jpg' },
  { name: 'Samanoff', logo: 'assets/brands/samanoff.png' },
  { name: 'Tanguang', logo: 'assets/brands/tanguang.png' },
  { name: 'Veuve Clicquot', logo: 'assets/brands/veuve-clicquot.png' }
];


}
