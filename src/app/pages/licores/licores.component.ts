import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/licores.models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-licores',
  templateUrl: './licores.component.html',
  styleUrls: ['./licores.component.css'],
})
export class LicoresComponent implements OnInit {
  selectedCategory: string | null = null;
  marcas : any[] =[];
  marcasCantidad: any []=[];
  tiposLicores: any[] = [];
  selectedTipoLicor: string = '';
  categorias: any[] =[];
  selectedCategoria:string | null =null;
  presentaciones : any[] =[];
  presentacionesCantidad : any[]=[];
  productos: Producto[] = [];
  productosOriginales:Producto[] =[];
  productosPaginados: Producto[] = [];
  productosPorPagina: number = 8;
  totalProductos = 100;
  paginaActual = 1;
  selectedMarca: string = '';
  selectedPresentacion: number =0;
  isCollapsed: boolean = false;
  selectedSubMenu: string = 'Licores';
  url='http://localhost:3000/uploads'; 

  constructor(private productoService: ProductoService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
// obtener categria de licores
this.productoService.getTiposLicores().subscribe((data) =>{
  this.tiposLicores = data;
})

this.productoService.getTiposLicores().subscribe((data) => {
  this.tiposLicores = data.map((tiposLicores) => tiposLicores.nombreCategoria)// Data tendrá el formato [{nombreTipo: 'Ron', cantidad: 10}, ...]
});

// Obtenr cantidad de las categoria de licores 
this.productoService.getCategoriasConCantidad().subscribe((data) => {
  this.categorias = data;
});


    // Obtener marcas desde la API 
    this.productoService.getMarcas().subscribe((data) => {
      this.marcas = data.map((marca) => marca.nombreMarca) //Indica solo los nombres de las marcas
    })

    // contar cantidad de marcas disponibles
    this.productoService.getCountMarcas().subscribe((data) => {
      this.marcasCantidad = data; // Data tendrá el formato [{nombreMarca: 'Macallan', cantidad: 5}, ...]
    });

    // Obtener productos desde la API 
    this.productoService.getAllProducts().subscribe((data) => {
      this.productosOriginales = data.map((producto) => ({ 
        ...producto, 
        imagenUrl: `${this.url}/${producto.imagen}` 
      })); 
      this.productos = [...this.productosOriginales]; 
      this.cambiarPagina(this.paginaActual);
    });
    


    // Obtenr presentaciones desde la API 
    this.productoService.getPresentaciones().subscribe((data)=>{
      this.presentaciones = data;
    });

    // Cantidad de presentaciones disponibles
    this.productoService.getPresentacionesConCantidad().subscribe((data) => {
      this.presentacionesCantidad = data; 
    });
  
    this.route.url.subscribe((url) => {
      const subMenu = url[1] ? url[1].path : null;
      this.selectedSubMenu = subMenu ? this.capitalize(subMenu) : 'Licores';
    });
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
      this.productoService.getAllProducts().subscribe((data) => {
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
     
   // Filtrar por presentación
   filtrarPorPresentacion(presentacion: number): void {
    console.log('Filtrando por presentación:', presentacion);
    this.selectedPresentacion = presentacion;
  
    if (!presentacion) {
      // Si no hay presentación seleccionada, aplica el filtro solo por marca
      if (this.selectedMarca) {
        this.productos = this.productosOriginales.filter((producto) =>
          producto.nombreProducto.toLowerCase().includes(this.selectedMarca.toLowerCase())
        );
      } else {
        // Mostrar todos los productos si no hay presentación ni marca seleccionadas
        this.productos = [...this.productosOriginales];
      }
    } else {
      // Filtrar por presentación (y por marca si está seleccionada)
      this.productos = this.productosOriginales.filter(
        (producto) => producto.presentacion_ml === presentacion
      );
  
      if (this.selectedMarca) {
        this.productos = this.productos.filter((producto) =>
          producto.nombreProducto.toLowerCase().includes(this.selectedMarca.toLowerCase())
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