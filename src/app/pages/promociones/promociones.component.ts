import { Component, OnInit } from '@angular/core';
import { PromocionesService } from '../../services/promociones.service';

interface Promociones {
  title: string;
  description: string;
  discount: number;
  expirationDate: string;
  image: string;
}
@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrl: './promociones.component.css'
})
export class PromocionesComponent implements OnInit {

  promociones: Promociones[] = [];

  constructor(private promocionesService: PromocionesService) { }
  ngOnInit(): void {
    this.cargarPromociones();

  }

  cargarPromociones() {
    this.promocionesService.obtenerPromociones()
      .subscribe((promociones: Promociones[]) => {
        this.promociones = promociones;
      });
  }
}
