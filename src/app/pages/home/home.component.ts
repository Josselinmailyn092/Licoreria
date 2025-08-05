import { ProductosService } from './../../services/productos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';
import { CategoriaService } from '../../services/categoria.service';
import { CarritoService } from '../../services/carrito.service';
import { environment } from '@environments/environment';
import { Producto } from '../../models/licores.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('carruselCategorias', { static: false })
  carruselCategorias!: NzCarouselComponent;
  animationActive: boolean = false;
  Category: string[] = ['#Ginebra', '#Gin', '#Cerveza', '#Vino', '#Tequila'];
  indiceCategoriaActual: number = 0;
  productos: any[] = [];
  textoCategorias: string = this.Category[this.indiceCategoriaActual];
  productosAgrupados: any[] = [];
  productosDestacados: any[] = [];
  mostrarPopupWhatsApp: boolean = false;
  categorias: any[] = [];
  productosPaginados: any[] = [];
  paginaActual: number = 0;
  pageSize: number = 4;
  totalPaginas: number = 0;
  url = `${environment.url}/uploads`; // Ajusta la URL según tu backend

  constructor(
    private carritoService: CarritoService,
    private categoriaService: CategoriaService,
    private productosService: ProductosService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarCategorias();
    this.CargarProductosDestacados();
  }
  // // Carrito
  //  agregarProductoAlCarrito(producto: Producto): void {
  //   this.carritoService.agregarProducto(producto);
  // }
  // Corregir el método cargarCategorias
  cargarCategorias(): void {
    this.categoriaService.obtenerProductosPorCategoria().subscribe(
      (data) => {
        this.categorias = data.map((item: any) => ({
          name: item.Categoria,
          products: item.TotalProductos,
          color: this.getCategoryColor(item.Categoria),
          image: this.getCategoryImage(item.Categoria),
          route: `${item.Categoria.toLowerCase()}`,
        }));
      },
      (error) => {
        console.error('Error al cargar categorías:', error);
      }
    );
  }

  obtenerImagen(nombreImagen: string): any {
    return this.url + '/' + nombreImagen;
  }

  // Seleccionar una presentación para un producto
  seleccionarPresentacion(presentacion: any, producto: any) {
    producto.presentacionSeleccionada = presentacion;
  }

  CargarProductosDestacados(): void {
    this.productosService.obtenerProductosDestacados().subscribe({
      next: (data) => {
        this.productosDestacados = data.map((producto: any) => ({
          ...producto,
          imagenUrl: `${this.url}/${producto.imagen}`, // Campo correcto
        }));
        this.chunkFeaturedProducts();
      },
      error: (err) => console.error('Error API:', err),
    });
  }

  actualizarProductosPaginados(): void {
    const start = this.paginaActual * this.pageSize;
    const end = start + this.pageSize;
    this.productosPaginados = this.productosDestacados.slice(start, end);
  }

  paginaSiguiente(): void {
    if (this.paginaActual < this.totalPaginas - 1) {
      this.paginaActual++;
      this.actualizarProductosPaginados();
    }
  }

  paginaAnterior(): void {
    if (this.paginaActual > 0) {
      this.paginaActual--;
      this.actualizarProductosPaginados();
    }
  }

  getCategoryColor(categorias: string): string {
    const colors: { [key: string]: string } = {
      Licores: '#FFFFFF',
      Whiskey: '#FFFFFF',
      Gin: '#FFFFFF',
      Brandy: '#FFFFFFF',
      Cerveza: '#FFFFFF',
      Tequila: '#FFFFFF',
      Vodka: '#FFFFFF',
      Vinos: '#FFFFFF',
    };
    return colors[categorias] || '#FFFFFF';
  }

  getCategoryImage(categorias: string): string {
    const images: { [key: string]: string } = {
      Licores: 'assets/images/brandy.jpeg',
      Whiskey: 'assets/images/Whiskey.jpg',
      Gin: 'assets/images/Gin.png',
      Brandy: 'assets/images/brandy.jpeg',
      Cerveza: 'assets/images/cerveza.jpg',
      Tequila: 'assets/images/tequila.jpg',
      Vodka: 'assets/images/vodka.png',
      Vinos: 'assets/images/vino.jpg',
    };
    return images[categorias] || 'assets/images/default.jpg';
  }

  chunkFeaturedProducts() {
    const chunkSize = 4;
    this.productosAgrupados = [];
    for (let i = 0; i < this.productosDestacados.length; i += chunkSize) {
      this.productosAgrupados.push(
        this.productosDestacados.slice(i, i + chunkSize)
      );
    }
  }

  toggleWhatsAppPopup(): void {
    this.mostrarPopupWhatsApp = !this.mostrarPopupWhatsApp;
  }

  redirectToWhatsApp(): void {
    window.open('https://wa.link/iecfyy', '_blank'); // Cambia el número de WhatsApp
  }

  navigateToCategory(route: string): void {
    this.router.navigate([route]);
  }

  anterior(): void {
    this.carruselCategorias?.pre(); // Navegar hacia la izquierda
  }

  siguiente(): void {
    this.carruselCategorias?.next(); // Navegar hacia la derecha
  }

  goToLiquor(): void {
    this.router.navigate(['/licores']); // Redirige al componente de licores
  }

  marcas = [
    { name: 'Occucaje', logo: 'assets/images/brandy.jpeg' },
    { name: 'Il Produce Neo', logo: 'assets/images/Gin.png' },
    { name: 'Old Par', logo: 'assets/images/vino.jpg' },
    { name: 'Samanoff', logo: 'assets/brands/samanoff.png' },
    { name: 'Tanguang', logo: 'assets/brands/tanguang.png' },
    { name: 'Veuve Clicquot', logo: 'assets/brands/veuve-clicquot.png' },
  ];
}
