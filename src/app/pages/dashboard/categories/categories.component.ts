import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DashboardService } from '../../../services/dashboard.service';
import { Categoria } from '../../../models/licores.models';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categorias: any[] = [];
  categoriasFiltradas: Categoria[] = [];
  searchQuery: string = '';
  isModalVisible = false;
  selectedCategory: any = null;
  isNoCategoryModalVisible: boolean = false;
  editingCategory: any = null;

  form: FormGroup;
  categoriasLicores: Categoria[] = [];  // Definimos el tipo de datos
  categoriasConfiteria: Categoria[] = []; // Definimos el tipo de datos
   tiposProducto = [
    { value: 'licores', name: 'Licores' },
    { value: 'Confiteria', name: 'Confitería' }
  ];
  constructor(private fb: FormBuilder, private http: HttpClient, private dashboardService: DashboardService) {
    this.form = this.fb.group({
      nombreCategoria: ['', Validators.required],
      tipo: ['']
    });
  }

  ngOnInit() {
    this.loadCategories();
    this.form = this.fb.group({
      tipoProducto: ['', Validators.required],  // Selección del tipo de producto
      categoria: ['', Validators.required],     // Selección de categoría
    });

      // Obtener categorías desde la API
      this.dashboardService.getCategories().subscribe((categorias: any[]) => {
        this.categoriasLicores = categorias.filter(c => c.tipo === 'licores');
        this.categoriasConfiteria = categorias.filter(c => c.tipo === 'Confiteria');
      });

  }

  loadCategories() {
    this.dashboardService.getCategorias().subscribe(
      (data: Categoria[]) => {
        this.categorias = data;
        this.categoriasFiltradas = data; // Sincronizar la tabla filtrada
      },
      (error) => {
        console.error('Error al cargar categorías:', error);
        alert('Error al cargar las categorías. Por favor, intente nuevamente.');
      }
    );
  }

  // Funciones de barra de búsqueda
  buscarCategoria() {
    this.categoriasFiltradas = this.categorias.filter(categoria =>
      categoria.nombreCategoria.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    if (this.categoriasFiltradas.length === 0) {

    }
  }


  // Modal para agregar/editar categoría
  openModal(categoria?: Categoria): void {
    this.isModalVisible = true;
    if (categoria) {
      this.editingCategory = categoria;
      this.form.patchValue({
        nombreCategoria: categoria.nombreCategoria,
        descripcion: categoria.tipo
      });
    } else {
      this.editingCategory = null;
      this.form.reset();
    }
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.editingCategory = null;
    this.form.reset();
  }
  closeNoCategoryModal(): void {
    this.isNoCategoryModalVisible = false;
  }


  deleteCategory(categoria: Categoria): void {
    const confirmation = confirm('¿Estás seguro de que deseas eliminar esta categoría?');

    if (confirmation) {
      this.dashboardService.deleteCategory(categoria.id_categoria).subscribe(
        (response) => {
          console.log('Categoría eliminada exitosamente:', response);
          alert('Categoría eliminada exitosamente.');

          // Actualizar la lista de categorías después de la eliminación
          this.loadCategories(); // Recargar las categorías para reflejar la eliminación
        },
        (error) => {
          console.error('Error al eliminar la categoría:', error);
          alert('Hubo un error al eliminar la categoría.');
        }
      );
    }
  }


  saveCategory() {
    if (this.form.valid) {
      const categoryData = {
        nombreCategoria: this.form.get('nombreCategoria')?.value,
        tipo: this.form.get('tipo')?.value
      };

      if (this.editingCategory) {
        this.dashboardService.updateCategory(this.editingCategory.id, categoryData)
          .subscribe(
            (response) => {
              console.log('Categoría actualizada con éxito:', response);
              this.loadCategories();
              this.closeModal();
            },
            (error) => {
              console.error('Error al actualizar la categoría:', error);
              alert('Hubo un error al actualizar la categoría.');
            }
          );
      } else {
        this.dashboardService.insertCategory(categoryData)
          .subscribe(
            (response) => {
              console.log('Categoría agregada exitosamente:', response);
              this.loadCategories();
              this.closeModal();
            },
            (error) => {
              console.error('Error al agregar la categoría:', error);
              alert('Hubo un error al agregar la categoría.');
            }
          );
      }
    } else {
      alert('Por favor, complete todos los campos del formulario.');
    }
  }


  editCategory(categoria: any): void {
    this.openModal(categoria); // Abrir el modal
    this.form.patchValue({
      nombreCategoria: categoria.nombreCategoria,
      tipoProducto: categoria.tipo
    });
    this.editingCategory = categoria; // Guardar la categoría en edición
  }


// Modal para mostrar mensaje de "No se encontraron productos"
showNoResultsModal(query: string) {
  this.isModalVisible = true;
  this.selectedCategory = {
    nombre: `No se encontraron productos para la búsqueda: "${query}"`, // Mensaje con la búsqueda

  };
}
    // Funciones de exportación (vacías, puedes agregar lógica según sea necesario)
    exportToXLSX(): void {
      // Agregar lógica para exportar a XLSX
      console.log('Exportando a XLSX');
    }

    exportToCSV(): void {
      // Agregar lógica para exportar a CSV
      console.log('Exportando a CSV');
      }

  }

