import { Component } from '@angular/core';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})
export class InventarioComponent {
  productos = [
    { nombre: 'Whisky Black Label', categoria: 'Whisky', precio: 85000, stock: 24, imagen: '' },
    { nombre: 'Ron Zacapa XO', categoria: 'Ron', precio: 120000, stock: 5, imagen: '' },
    { nombre: 'Vodka Grey Goose', categoria: 'Vodka', precio: 95000, stock: 18, imagen: '' },
    { nombre: "Gin Hendrick's", categoria: 'Gin', precio: 89000, stock: 12, imagen: '' },
    // Agrega más productos...
  ];
  pageSize = 8; // 4 columnas x 2 filas
  pageIndex = 1;
  get paginatedProducts() {
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    return this.productos.slice(startIndex, startIndex + this.pageSize);
  }
}
