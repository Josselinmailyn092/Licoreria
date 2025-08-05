// models/licores.models.ts
// models/licores.models.ts
export interface Producto {
  id: number;
  nombre: string;
  marca: string;
  imagen: string;
  presentaciones: {
    presentacion_ml: number;
    precio: number;
    descuento: number;
    cantidad?: number;
  }[];
}

export interface Categoria {
  Categoria: string;
  TotalProductos: number;
}

export interface Marca {
  nombreMarca: string;
  cantidad: number;
}

export interface Presentacion {
  presentacion_ml: number;
  cantidad: number;
}

export interface ProductoConPresentacion {
  producto: Producto;
  presentacion: any;
}
