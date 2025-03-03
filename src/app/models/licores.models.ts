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
  }[];
  cantidad?: number;
}
export interface Categoria {
  id_categoria: number;
  nombreCategoria: string;
  tipo: string;
}
