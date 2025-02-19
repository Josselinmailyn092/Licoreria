import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfiteriaService } from '../../services/Confiteria.service';
import { Producto } from '../../models/licores.models';
import { CarritoService } from '../../services/carrito.service';
@Component({
  selector: 'app-confiteria',
  templateUrl: './confiteria.component.html',
  styleUrls: ['./confiteria.component.css']
})
export class ConfiteriaComponent implements OnInit {
  selectedCategory: string | null = null;
  marcas : any[] =[];
  marcasCantidad: any []=[];
  tiposConfiteria: any[] = [];
  selectedTipoConfiteria: string = '';
  categorias: any[] =[];
  selectedCategoria:string | null =null;
  productos: Producto[] = [];
  productosOriginales:Producto[] =[];
  productosPaginados: Producto[] = [];
  productosPorPagina: number = 8;
  totalProductos = 100;
  paginaActual : number =1;
  selectedMarca: string = '';
  selectedPresentacion: number =0;
  isCollapsed: boolean = false;
  selectedSubMenu: string = 'Licores';
  carrito: Producto[] = [];

  url='/uploads';

  constructor( private confiteriaService: ConfiteriaService,private route: ActivatedRoute, private router: Router, private carritoService: CarritoService) {}

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
    this.confiteriaService.getMarcas().subscribe((data) => {
      this.marcas = data.map((marca) => marca.nombreMarca) //Indica solo los nombres de las marcas
    })

    // contar cantidad de marcas disponibles
    this.confiteriaService.getCountMarcas().subscribe((data) => {
      this.marcasCantidad = data; // Data tendrá el formato [{nombreMarca: 'Macallan', cantidad: 5}, ...]
    });

    // Obtener productos desde la API
    this.confiteriaService.getAllProducts().subscribe((data) => {
      this.productosOriginales = data.map((producto) => ({
        ...producto,
        imagenUrl: `${this.url}/${producto.imagen}`
      }));
      this.productos = [...this.productosOriginales];
      this.cambiarPagina(this.paginaActual);
    });



    this.route.url.subscribe((url) => {
      const subMenu = url[1] ? url[1].path : null;
      this.selectedSubMenu = subMenu ? this.capitalize(subMenu) : 'Licores';
    });
  }

    // Carrito
    agregarProductoAlCarrito(producto: Producto): void {
      this.carritoService.agregarProducto(producto);
    }
  private capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  selectCategory(nombreCategoria: string): void {
    if (nombreCategoria) {
      this.selectedCategoria = nombreCategoria; // Marca la categoría seleccionada
      this.router.navigate(['/', nombreCategoria.toLowerCase()]); // Navega al componente correspondiente
    } else {
      console.error("Categoria seleccionada es inválida:", nombreCategoria);
    }
  }


  resetCategory() {
    this.selectedCategory = null;
  }


filtrarPorCategoria(categoria: string | null): void {
    if (categoria) {
      this.productos = this.productos.filter((producto) => producto.nombreProducto.includes(categoria));
  } else {
      this.confiteriaService.getAllProducts().subscribe((data) => {
        this.productos = data;
        this.cambiarPagina(this.paginaActual);
      });
    }
  }


  // Ver si hay productos disponibles
  verificarProductosDisponibles(): void {
    if (this.productos.length === 0) {
      console.log('No hay productos disponibles para los filtros seleccionados.');
      }
  }

  // Filtrar por marca
  filtrarPorMarca(marca: string): void {
    console.log('Marca seleccionada:', marca);
    this.selectedMarca = marca;

    if (!marca || marca.trim() === '') {
      // Si no hay marca seleccionada, aplica el filtro solo por presentación
      if (this.selectedPresentacion) {
        this.productos = this.productosOriginales.filter(
          (producto) => producto.presentacion_ml === this.selectedPresentacion
        );
      } else {
        // Mostrar todos los productos si no hay marca ni presentación seleccionadas
        this.productos = [...this.productosOriginales];
      }
    } else {
      // Filtrar por marca (y por presentación si está seleccionada)
      this.productos = this.productosOriginales.filter((producto) =>
        producto.nombreProducto.toLowerCase().includes(marca.toLowerCase())
      );

      if (this.selectedPresentacion) {
        this.productos = this.productos.filter(
          (producto) => producto.presentacion_ml === this.selectedPresentacion
        );
      }
    }

    this.verificarProductosDisponibles();
    this.cambiarPagina(1); // Resetear a la primera página
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

