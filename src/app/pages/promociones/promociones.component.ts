import { Component, OnInit } from '@angular/core';
import { PromocionesService } from '../../services/promociones.service';
@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrl: './promociones.component.css'
})
export class PromocionesComponent implements OnInit{
 
  promociones: any[] = [];
  promocionDestacada: any = null;
  constructor( private promocionesService: PromocionesService) {}

  ngOnInit(): void {
    this.obtenerPromociones(); 
    this.obtenerPromocionDestacada();
  }

  obtenerPromociones(): void {
    this.promocionesService.getPromociones().subscribe(data => {
      this.promociones = data;  // Asignar las promociones a la variable
    });
  }

  obtenerPromocionDestacada(): void {
    this.promocionesService.getPromocionDestacada().subscribe(data => {
      this.promocionDestacada = data; // Asignar la promoción destacada a la variable
    });
  }

}
