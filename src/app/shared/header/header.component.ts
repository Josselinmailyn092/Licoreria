import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../../models/licores.models';
import { LinkService } from '../../services/link.service'; 
import { SubmenuService } from '../../services/submenu.service';
import { CarritoService } from '../../services/carrito.service';

interface Link {
  path: string;
  label: string;
  subMenu?: Link[];
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  

  links: Link[] = [];
  isMenuOpen: boolean = false;
  ModalBuscar: boolean = false;
  search: string = '';
//  Carrito

isCarritoVisible: boolean = false; // Controla la visibilidad del modal
carrito: Producto[] = [];
total:number=0;

  constructor(
    private linkService: LinkService,
    private router: Router,
    private subMenu: SubmenuService,
    private carritoService : CarritoService
  ) {}

  ngOnInit(): void {
    this.links = this.linkService.getLinks();

    this.carritoService.carrito$.subscribe((productos) => {
      this.carrito = productos;
      this.total = productos.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
    });
    
    this.carritoService.total$.subscribe((total) => {
      this.total = total;
    });
    
  }

  toggleSearchModal(): void {
    this.ModalBuscar = !this.ModalBuscar;
  }

  onSearch(): void {
    console.log('Buscando:', this.search);
    this.ModalBuscar = false;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenuAndNavigate(path: string): void {
    this.isMenuOpen = false;
    this.router.navigate([path]);
  }

  // Carrito 
  agregarProducto(producto: Producto): void {
    this.carritoService.agregarProducto(producto);
  }

  disminuirCantidad(producto:Producto):void{
    this.carritoService.disminuirCantidad(producto);
  }

  eliminarProducto(productoId: number): void {
    this.carritoService.eliminarProducto(productoId);
  }
   
  abrirCarrito(): void {
    this.isCarritoVisible = true;
  }

  cerrarCarrito(): void {
    this.isCarritoVisible = false;
  }

  enviarPedidoPorWhatsApp(): void {
    const mensaje = this.carrito.map(producto => 
      `Hola buenas tardes me gustaria realizar un pedido :${producto.nombreProducto} (${producto.presentacion_ml} ml) - $${(producto.precio * 0.9).toFixed(2)}`
    ).join('\n');
    window.open(`https://wa.me/?text=${encodeURIComponent(mensaje)}`);
  }

  limpiarCarrito(): void {
    this.carritoService.limpiarCarrito();
  }
  

  
}
