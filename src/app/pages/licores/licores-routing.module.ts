import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LicoresComponent } from './licores.component';
import { VinosComponent } from './vinos/vinos.component';
import { CervezaComponent } from './cerveza/cerveza.component';
import { WhiskeyComponent } from './whiskey/whiskey.component';
import { BrandyComponent } from './brandy/brandy.component';
import { VodkaComponent } from './vodka/vodka.component';
import { TequilaComponent } from './tequila/tequila.component';
import { GinComponent } from './gin/gin.component';

const routes: Routes = [
  { path: 'licores', component: LicoresComponent },
  { path: 'vinos', component: VinosComponent },
  { path: 'cerveza', component: CervezaComponent },
  { path: 'whiskey', component: WhiskeyComponent },
  { path: 'brandy', component: BrandyComponent },
  { path: 'vodka', component: VodkaComponent },
  { path: 'tequila', component: TequilaComponent },
  { path: 'gin', component: GinComponent },
  { path: '', redirectTo: 'licores', pathMatch: 'full' } // Ruta por defecto
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicoresRoutingModule { }
