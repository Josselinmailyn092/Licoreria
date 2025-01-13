
export interface Producto {
      id:number
    cantidad:number
    nombreProducto: string;
    presentacion_ml: number;
    descripcion: string;
    precio: number;
    tipo:String;
    categoria:String;
    imagenUrl: string;
    marca: string;
  }
  export interface Categoria {
    id_categoria: number;
  nombreCategoria: string;
  tipo: string;
  }
