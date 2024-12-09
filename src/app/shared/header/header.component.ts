import { Component, OnInit } from '@angular/core';

// Inyección de servio link
import { LinkService } from '../../services/link.service'; 
// Inyeccion de servico
import { SubmenuService } from '../../services/submenu.service';

import { Router } from '@angular/router';
// Estructura de la interfaz link 
interface Link {
  path: string;
  label: string;
  subMenu?: Link[];
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // Corrección aquí
})
export class HeaderComponent implements OnInit {
  imagenLogo: string = 'assets/images/logo-chinito.jpg';
  // Exportar clase 
  links: Link[] = [];
// Indica si el menu esta abierto o cerrado 
  isMenuOpen: boolean = false;

  // Modal de búsqueda
  ModalBuscar: boolean = false;
  menuItems: any[] = []; // Aquí almacenaremos los items del menú principal con submenús

  // Caena de texto para busqueda 
  search: string = ''; 
  isSideMenuOpen = false;
  constructor(private linkService: LinkService, private router: Router,private subMenu: SubmenuService) {}

  // Método ngOnInit se ejecuta al inicializar el componente.
  ngOnInit(): void {

    // Obtener los enlaces desde el servicio
    this.links = this.linkService.getLinks();

    //obtener links del sub menu
    this.links = this.subMenu.geSubMenuItems();
    this.menuItems = this.subMenu.geSubMenuItems();

  }

  // Método para abrir/cerrar el modal de búsqueda
  toggleSearchModal(): void {
    this.ModalBuscar = !this.ModalBuscar;
  }

  // Método de búsqueda
  onSearch(): void {
    console.log('Buscando:', this.search);
    // Cierra el modal después de buscar
    this.ModalBuscar = false;
  }

  // Método para abrir/cerrar el menú
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleSideMenu(){
    this.isSideMenuOpen = !this.isSideMenuOpen;
  }

   // Método para cerrar el menú y redirigir al enlace correspondiente
   closeMenuAndNavigate(path: string): void {
    this.isMenuOpen = false; // Cierra el menú al hacer clic
    this.router.navigate([path]); // Redirige a la ruta seleccionada
  }

  
}
