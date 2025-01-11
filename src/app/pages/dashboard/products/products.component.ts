import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Producto } from '../../../models/licores.models';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})

export class ProductsComponent {
  productos = [
    {
      nombre: 'Producto 1',
      marca: 'Marca 1',
      cantidad: 100,
      precio: 150.00,
      presentacion: 250,
      categoria: 'Categoría 1',
      imagen: 'https://via.placeholder.com/50',
    },
    {
      nombre: 'Producto 2',
      marca: 'Marca 2',
      cantidad: 200,
      precio: 250.00,
      presentacion: 500,
      categoria: 'Categoría 2',
      imagen: 'https://via.placeholder.com/50',
    }, ];
  // Barra de busqueda
  searchQuery: string = '';
  productosFiltrados = [...this.productos];

  isNoProductsModalVisible: boolean = false;
 // Función para abrir el modal de "No hay productos"
 showNoProductsModal() {
  this.isNoProductsModalVisible = true;
}

// Función para cerrar el modal de "No hay productos"
closeNoProductsModal() {
  this.isNoProductsModalVisible = false;
}
  // Modal
  isModalVisible = false;
  // Productos
  selectedProduct: any = {
    nombre: '',
    marca:'Marcar1',
    cantidad: null,
    precio: null,
    presentacion: null,
    categoria: 'Categoría 1',
    imagen: 'https://via.placeholder.com/50',
  };


// funciones de barra de busqueda
buscarProducto() {
  const query = this.searchQuery.trim().toLowerCase();

  if (!query) {
    this.productosFiltrados = [...this.productos];
    this.closeNoProductsModal(); // Cerrar el modal si no hay búsqueda
    return;
  }

  const results = this.productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(query) ||
    producto.presentacion.toString() === query
  );

  this.productosFiltrados = results;

  if (results.length === 0) {
    this.showNoProductsModal(); // Mostrar el modal si no hay productos
  } else {
    this.closeNoProductsModal(); // Cerrar el modal si hay productos
  }
}
// Modal para mostrar mensaje de "No hay resultados"
// Modal para mostrar mensaje de "No se encontraron productos"
showNoResultsModal(query: string) {
  this.isModalVisible = true;
  this.selectedProduct = {
    nombre: `No se encontraron productos para la búsqueda: "${query}"`, // Mensaje con la búsqueda

  };
}
// Funciones de modal
openModal(producto?: any): void {
  this.isModalVisible = true;
  this.selectedProduct = producto ? { ...producto } : { nombre: '', marca: '', cantidad: null, precio: null, presentacion: null, categoria: 'Categoría 1', imagen: '' };
}


  closeModal(): void {
    this.isModalVisible = false;
  }

  saveProduct(): void {
    if (this.selectedProduct.nombre && this.selectedProduct.precio !== null) {
      const index = this.productos.findIndex(
        (p) => p.nombre === this.selectedProduct.nombre
      );

      if (index > -1) {
        // Editar producto existente
        this.productos[index] = { ...this.selectedProduct }; // Usar spread operator para evitar problemas con la referencia
      } else {
        // Agregar nuevo producto
        this.productos.push({ ...this.selectedProduct });
      }
    }
    this.closeModal(); // Cerrar el modal después de guardar
  }


  editProduct(producto: any): void {
    this.openModal(producto);
  }

  deleteProduct(producto: any): void {
    // Confirmar eliminación antes de borrar
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productos = this.productos.filter((p) => p !== producto); // Eliminamos el producto
    }
  }




   // Función para exportar a XLSX
   exportToXLSX() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.productosFiltrados);
    const wb: XLSX.WorkBook = { Sheets: { 'Productos': ws }, SheetNames: ['Productos'] };
    XLSX.writeFile(wb, 'productos.xlsx');
  }

  // Función para exportar a CSV
  exportToCSV() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.productosFiltrados);
    const csv: string = XLSX.utils.sheet_to_csv(ws);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'productos.csv';
    a.click();
  }



  // Exportar a PDF
 /* exportToPDF() {
    const doc = new jsPDF();
    const tableColumn = ['Nombre', 'Cantidad', 'Precio', 'Presentación (ml)'];
    const tableRows: (string | number)[][] = [];

    this.productos.forEach(producto => {
      const productoData = [
        producto.nombre,
        producto.cantidad,
        `$${producto.precio}`,
        `${producto.presentacion} ml`
      ];
      tableRows.push(productoData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });

    doc.save('productos.pdf');
  }
*/



}
