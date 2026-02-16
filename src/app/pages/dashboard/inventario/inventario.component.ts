// PASO 1: Agrega el soporte de modal en el componente
import {Component} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {ProductosService} from '@app/services/productos.service';
import {PresentacionService} from '@app/services/presentacion.service';
import {environment} from '@environments/environment';
import {MarcasService} from '@app/services/marcas.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent {
  lista_productos: any = [];
  marcas: any = [];

  nuevoProducto: any = {
    nombreProducto: '',
    marca_id: null
  };

  selectedFile: File | null = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  constructor(
    private productoService: ProductosService,
    private presentacionService: PresentacionService,
    private modal: NzModalService,
    private marcasService: MarcasService
  ) {}

  ngOnInit() {
    this.cargar_productos();
  }

  cargar_productos() {
    this.productoService.obtenerProductos().subscribe((value: any) => {
      this.lista_productos = value.map((producto: any) => ({
        ...producto,
        expand: false
      }));
    });
    this.marcasService.obtenerMarcas().subscribe((value: any) => {
      this.marcas = value;
    });
  }

  obtenerImagen(nombreImagen: string): string {
    return `${environment.url}/uploads/` + nombreImagen;
  }

  // Acciones de producto
  editarProducto(producto: any): void {
    this.modal.create({
      nzTitle: 'Editar Producto',
      nzContent: `Formulario para editar el producto: ${producto.nombre}`,
      nzOnOk: () => {
        // Lógica de guardado aquí
      }
    });
  }

  eliminarProducto(id: number): void {
    this.modal.confirm({
      nzTitle: '¿Estás seguro de eliminar este producto?',
      nzOnOk: () => {
        this.productoService.eliminarProducto(id).subscribe(() => {
          this.cargar_productos();
        });
      }
    });
  }

  // Acciones de presentación
  editarPresentacion(p: any): void {
    this.modal.create({
      nzTitle: 'Editar Presentación',
      nzContent: `Formulario para editar la presentación ${p.presentacion_ml}ml`,
      nzOnOk: () => {
        // Lógica de actualización aquí
      }
    });
  }

  eliminarPresentacion(producto_id: number, p: any): void {
    console.log(p);
    this.modal.confirm({
      nzTitle: `¿Eliminar presentación ${p.presentacion_ml}ml?`,
      nzOnOk: () => {
        this.presentacionService
          .deletePresentacion({
            producto_id: producto_id,
            presentacion_ml: p.presentacion_ml
          })
          .subscribe(() => {
            this.cargar_productos();
          });
      }
    });
  }
  agregarProducto(): void {
    let nombreInput: HTMLInputElement;
    let marcaSelect: HTMLSelectElement;
    let imagenInput: HTMLInputElement;
    let selectedFile: File | null = null;

    const modal = this.modal.create({
      nzTitle: 'Agregar nuevo producto',
      nzContent: `
      <form id="form-producto" nz-form>
        <nz-form-item>
          <nz-form-label [nzSpan]="6">Nombre</nz-form-label>
          <nz-form-control [nzSpan]="18">
            <input id="nombreProducto" nz-input />
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label [nzSpan]="6">Marca</nz-form-label>
          <nz-form-control [nzSpan]="18">
            <select id="marcaSelect" class="ant-select">
              ${this.marcas.map((m: any) => `<option value="${m}">${m}</option>`).join('')}
            </select>
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label [nzSpan]="6">Imagen</nz-form-label>
          <nz-form-control [nzSpan]="18">
            <input type="file" id="imagenInput" />
          </nz-form-control>
        </nz-form-item>
      </form>
    `,
      nzOnOk: () => {
        const nombre = nombreInput.value;
        const marca_id = marcaSelect.value;

        const formData = new FormData();
        formData.append('nombreProducto', nombre);
        formData.append('marca_id', marca_id);
        if (selectedFile) {
          formData.append('imagen', selectedFile);
        }

        this.productoService.añadirProducto(formData).subscribe(() => {
          this.cargar_productos();
        });
      }
    });

    // Suscribirse al evento nzAfterOpen del modal
    modal.afterOpen.subscribe(() => {
      nombreInput = document.getElementById('nombreProducto') as HTMLInputElement;
      marcaSelect = document.getElementById('marcaSelect') as HTMLSelectElement;
      imagenInput = document.getElementById('imagenInput') as HTMLInputElement;

      imagenInput.addEventListener('change', (event: Event) => {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
          selectedFile = input.files[0];
        }
      });
    });
  }
}
