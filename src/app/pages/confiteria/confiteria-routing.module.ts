import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalletasComponent } from './galletas/galletas.component';
import { ChocolateComponent } from './chocolate/chocolate.component';
import { ChupetesComponent } from './chupetes/chupetes.component';
import { GomitasComponent } from './gomitas/gomitas.component';
import { CaramelosComponent } from './caramelos/caramelos.component';
import { ChicleComponent } from './chicle/chicle.component';
import { SnaksComponent } from './snaks/snaks.component';

const routes: Routes = [
     { path: 'galletas', component: GalletasComponent },
          { path: 'chocolates', component: ChocolateComponent },
          { path: 'chupetes', component: ChupetesComponent },
          { path: 'gomitas', component: GomitasComponent },
          { path: 'caramelos', component: CaramelosComponent },
          { path: 'chicle', component: ChicleComponent },
          { path: 'snaks', component: SnaksComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ConfiteriaRoutingModule { }
