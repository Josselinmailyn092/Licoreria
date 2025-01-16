import { DashboardService } from './../../../services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../../../models/licores.models';
import { NzMessageService } from 'ng-zorro-antd/message'; // Si usas Ng-Zorro
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})

export class ProductsComponent implements OnInit {
  productos: any[] = [];
  productosFiltrados = [...this.productos];
  searchQuery: string = '';
  isNoProductsModalVisible: boolean = false;
  isModalVisible = false;
  editingProduct: any = null;
  selectedImage: File | null = null;
  marcas: any[] = [];
  categorias: any[] = [];


  form: FormGroup;

  url='http://localhost:3000/uploads';
  constructor(private http: HttpClient,private fb: FormBuilder, private dashboardService: DashboardService,private message: NzMessageService,  private modal: NzModalService,) {
    this.form = this.fb.group({
      nombreProducto: ['', Validators.required],
      id_marca: ['', Validators.required],
      cantidad: [null, [Validators.required, Validators.min(1)]],
      precio: [null, [Validators.required, Validators.min(0.01)]],
      presentacion_ml: [null, Validators.required],
      id_categoria: ['', Validators.required],

      imagen: [null], // No es obligatorio
    });
  }

  ngOnInit() {
    this.initializeForm();
    this.loadProducts();
    this.obtenerMarcas();
    this.obtenerCategorias();
  }

  obtenerMarcas() {
    this.http.get('http://localhost:3000/dashboard/marcas').subscribe((data: any) => {
      this.marcas = data;
    });
  }

  obtenerCategorias() {
    this.http.get('http://localhost:3000/dashboard/categorias').subscribe((data: any) => {
      this.categorias = data;
    });
  }
  loadProducts() {
    this.dashboardService.getProducts().subscribe((data) => {
      this.productos = data.map((producto) => ({
        ...producto,
        imagen: `http://localhost:3000/uploads/${producto.imagen}`
      }));
      this.productosFiltrados = [...this.productos];
    });
  }


  initializeForm() {
    this.form = this.fb.group({
      nombreProducto: ['', Validators.required],
      id_marca: ['', Validators.required],
      cantidad: [null, [Validators.required, Validators.min(1)]],
      precio: [null, [Validators.required, Validators.min(0.01)]],
      presentacion_ml: [null, Validators.required],
      id_categoria: ['', Validators.required], // Asegúrate de incluir este control
      imagen: [null] // No obligatorio
    });
  }


  // Funciones de barra de búsqueda
  buscarProducto() {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) {
      this.productosFiltrados = [...this.productos];
      return;
    }
    this.productosFiltrados = this.productos.filter(producto =>
      producto.nombreProducto.toLowerCase().includes(query) || producto.presentacion_ml.toString().includes(query)
    );
  }

  // Modal para "No hay productos"
 showNoProductsModal() {
  this.isNoProductsModalVisible = true;
}

// Función para cerrar el modal de "No hay productos"
closeNoProductsModal() {
  this.isNoProductsModalVisible = false;
}

// Funciones de modal
openModal(producto?: Producto): void {
  this.isModalVisible = true;
  if (producto) {
    this.editingProduct = producto;
    this.form.patchValue({
      nombreProducto: producto.nombreProducto,
      id_marca: producto.marca,
      cantidad: producto.cantidad,
      precio: producto.precio,
      presentacion_ml: producto.presentacion_ml,
      id_categoria: producto.categoria,
    });
  } else {
    this.editingProduct = null;
    this.form.reset();
  }
}


closeModal(): void {
  this.isModalVisible = false;
  this.editingProduct = null; // Reinicia el producto en edición
  this.form.reset(); // Reinicia el formulario
  this.selectedImage = null; // Elimina la imagen seleccionada
}
 // Método que se llama cuando se selecciona una imagen
 onImageSelected(event: any): void {
  const file = event.target.files[0];  // Obtiene el archivo seleccionado
  if (file) {
    this.selectedImage = file;  // Asigna el archivo a la propiedad selectedImage
  }
}


saveProduct() {


  const formData = new FormData();
  formData.append('id_marca', this.form.get('id_marca')?.value);
  formData.append('id_categoria', this.form.get('id_categoria')?.value);
  formData.append('nombreProducto', this.form.get('nombreProducto')?.value);
  formData.append('cantidad', this.form.get('cantidad')?.value.toString());
  formData.append('precio', this.form.get('precio')?.value.toString());
  formData.append('presentacion_ml', this.form.get('presentacion_ml')?.value.toString());

  if (this.selectedImage) {
    formData.append('imagen', this.selectedImage, this.selectedImage.name);
  }

  const saveObservable = this.editingProduct?.id
    ? this.dashboardService.updateProduct(formData, this.editingProduct.id)
    : this.dashboardService.insertProduct(formData);

  saveObservable.subscribe(
    (response) => {
      if (response) {
        console.log('Producto guardado/actualizado con éxito');
        this.loadProducts(); // Recargar la lista de productos
        this.closeModal(); // Cerrar el modal
        this.message.success('Producto guardado con éxito');
      }
    },
    (error) => {
      console.error('Error al guardar/actualizar el producto:', error);
      this.message.error('Error al guardar/actualizar el producto. Inténtalo nuevamente.');
    }
  );
}



editProduct(producto: any): void {
  this.editingProduct = producto; // Asegura que se guarde el producto en edición
  this.openModal(producto);
}

deleteProduct(producto: any): void {
  this.modal.confirm({
    nzTitle: '¿Estás seguro de que deseas eliminar este producto?',
    nzContent: `<b style="color: red;">${producto.nombreProducto}</b> será eliminado permanentemente.`,
    nzOkText: 'Sí',
    nzOkType: 'primary',
    nzOkDanger: true,
    nzOnOk: () => {
      const productId = Number(producto.id_producto);
      this.dashboardService.deleteProduct(productId).subscribe(
        (response) => {
          if (response.message === 'Producto eliminado correctamente') {
            this.message.success('Producto eliminado con éxito.');
            this.loadProducts(); // Refresca la lista de productos.
          } else {
            this.message.warning('No se encontró el producto.');
          }
        },
        (error) => {
          console.error('Error al eliminar el producto:', error);
          this.message.error('Error al eliminar el producto. Inténtalo nuevamente.');
        }
      );

    },
    nzCancelText: 'No',
    nzOnCancel: () => {
      this.message.info('Eliminación cancelada.');
    }
  });
  this.loadProducts();
}
  // Exportar a XLSX
   exportToXLSX() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.productosFiltrados);
    const wb: XLSX.WorkBook = { Sheets: { 'Productos': ws }, SheetNames: ['Productos'] };
    XLSX.writeFile(wb, 'productos.xlsx');
  }

  // Exportar a CSV
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
  } */
}
