import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../models/licores.models';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfiteriaService } from '../../../services/Confiteria.service';
import { SnaksService } from '../../../services/snaks.service';
import { CarritoService } from '../../../services/carrito.service';
@Component({
  selector: 'app-snaks',
  templateUrl: './snaks.component.html',
  styleUrl: './snaks.component.css'
})
export class SnaksComponent implements OnInit{
 selectedCategory: string | null = 'Snaks';
  marcas: any[] = [];
  marcasCantidad: any[] = [];
  tiposConfiteria:any[] =[];
  categorias: any[] = [];
  selectedCategoria: string | null = null;
  selectedTipoConfiteria: string = '';
  productos: Producto[] = [];
  productosOriginales: Producto[] = [];
  productosPaginados: Producto[] = [];
  productosPorPagina: number = 8;
  totalProductos = 100;
  paginaActual = 1;
  selectedMarca: string = '';
  selectedPresentacion: number = 0;
  isCollapsed: boolean = false;
  selectedSubMenu: string = 'Snaks'
  carrito: Producto[] = [];
  url='/uploads';

  constructor( private confiteriaService: ConfiteriaService,private snakService : SnaksService,  private route: ActivatedRoute, private router: Router,private carritoService: CarritoService){}
  ngOnInit(): void {

      // obtener categria de licores
      this.confiteriaService.getTiposConfiteria().subscribe((data) =>{
        this.tiposConfiteria = data;
      })

      this.confiteriaService.getTiposConfiteria().subscribe((data) => {
        this.tiposConfiteria = data.map((tiposConfiteria) => tiposConfiteria.nombreCategoria)// Data tendrá el formato [{nombreTipo: 'Ron', cantidad: 10}, ...]
      });

      // Obtenr cantidad de las categoria de licores
      this.confiteriaService.getCategoriasConCantidad().subscribe((data) => {
        this.categorias = data;
      });

        // Obtener marcas desde la API
    this.snakService.getMarcasSnaks().subscribe((data) => {
      this.marcas = data.map((marca) => marca.nombreMarca); // Indica solo los nombres de las marcas
    });

    // Contar cantidad de marcas disponibles
    this.snakService.getCountMarcasSnaks().subscribe((data) => {
      this.marcasCantidad = data; // Data tendrá el formato [{nombreMarca: 'Macallan', cantidad: 5}, ...]
    });

     // Obtener productos desde la API
     this.snakService.getAllProductSnaks().subscribe((data) => {
      this.productosOriginales = data.map((producto) => ({
        ...producto,
        imagenUrl: `${this.url}/${producto.imagen}`
      }));
      this.productos = [...this.productosOriginales];
      this.cambiarPagina(this.paginaActual);
    });



    // Suscribirse a los cambios en la ruta
    this.route.params.subscribe((params) => {
      const category = params['category'];
      if (category) {
        this.selectedCategoria = this.capitalize(category);
      }
    });

    // Suscribirse a la URL para cambiar el submenú
    this.route.url.subscribe((url) => {
      const subMenu = url[1] ? url[1].path : null;
      this.selectedSubMenu = subMenu ? this.capitalize(subMenu) : 'Licores';
    });
  }
  // Carrito
  // agregarProductoAlCarrito(producto: Producto): void {
  //   this.carritoService.agregarProducto(producto);
  // }

  private capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  selectCategory(nombreCategoria: string): void {
    if (this.selectedCategoria !== nombreCategoria) {
      this.selectedCategoria = nombreCategoria; // Actualiza la categoría seleccionada
      this.router.navigate(['/', nombreCategoria.toLowerCase()]); // Navega a la nueva categoría
    } else if (nombreCategoria === 'Caramelos') {
      // Forzar recarga si ya estás en la categoría "Caramelos"
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/', nombreCategoria.toLowerCase()]);
      });
    }
  }

  resetCategory() {
    this.selectedCategory = null;
  }

  filtrarPorCategoria(categoria: string | null): void {
    if (categoria) {
      this.productos = this.productos.filter((producto) => producto.nombre.includes(categoria));
    } else {
      this.confiteriaService.getAllProducts().subscribe((data) => {
        this.productos = data;
        this.cambiarPagina(this.paginaActual);
      });
    }
  }

  verificarProductosDisponibles(): void {
    if (this.productos.length === 0) {
      console.log('No hay productos disponibles para los filtros seleccionados.');
    }
  }

  filtrarPorMarca(marca: string): void {
    console.log('Marca seleccionada:', marca);
    this.selectedMarca = marca;

    if (!marca || marca.trim() === '') {
      // Si no hay marca seleccionada, aplica el filtro solo por presentación
      if (this.selectedPresentacion) {
        this.productos = this.productosOriginales.filter(
          (producto) => producto.presentaciones.some(p => p.presentacion_ml === this.selectedPresentacion)
        );
      } else {
        // Mostrar todos los productos si no hay marca ni presentación seleccionadas
        this.productos = [...this.productosOriginales];
      }
    } else {
      // Filtrar por marca (y por presentación si está seleccionada)
      this.productos = this.productosOriginales.filter((producto) =>
        producto.nombre.toLowerCase().includes(marca.toLowerCase())
      );

      if (this.selectedPresentacion) {
        this.productos = this.productos.filter(
          (producto) => producto.presentaciones.some(p => p.presentacion_ml === this.selectedPresentacion)
        );
      }
    }

    this.verificarProductosDisponibles();
    this.cambiarPagina(1); // Resetear a la primera página
  }

  filtrarPorPresentacion(presentacion: number): void {
    console.log('Filtrando por presentación:', presentacion);
    this.selectedPresentacion = presentacion;

    if (!presentacion) {
      if (this.selectedMarca) {
        this.productos = this.productosOriginales.filter((producto) =>
          producto.nombre.toLowerCase().includes(this.selectedMarca.toLowerCase())
        );
      } else {
        this.productos = [...this.productosOriginales];
      }
    } else {
      this.productos = this.productosOriginales.filter(
        (producto) => producto.presentaciones.some(p => p.presentacion_ml === presentacion)
      );

      if (this.selectedMarca) {
        this.productos = this.productos.filter((producto) =>
          producto.nombre.toLowerCase().includes(this.selectedMarca.toLowerCase())
        );
      }
    }

    this.verificarProductosDisponibles();
    this.cambiarPagina(1);
  }

  get totalPaginas(): number {
    return Math.ceil(this.totalProductos / this.productosPorPagina);
  }

  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  cambiarPagina(nuevaPagina: number): void {
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas) {
      this.paginaActual = nuevaPagina;
      const inicio = (nuevaPagina - 1) * this.productosPorPagina;
      const fin = inicio + this.productosPorPagina;
      this.productosPaginados = this.productos.slice(inicio, fin);
      console.log('Página actual:', this.paginaActual);

  }
}}








