
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
    id: number;
    nombreCategoria: string;
    descripcion?: string;
  }
