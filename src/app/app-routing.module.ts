import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importación de los componentes
import { HomeComponent } from './pages/home/home.component';
import {LicoresComponent} from './pages/licores/licores.component';
import { ConfiteriaComponent } from './pages/confiteria/confiteria.component';
import { PromocionesComponent } from './pages/promociones/promociones.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { CaramelosComponent } from './pages/confiteria/caramelos/caramelos.component';
import { ChicleComponent } from './pages/confiteria/chicle/chicle.component';
import { ChocolateComponent } from './pages/confiteria/chocolate/chocolate.component';
import { ChupetesComponent } from './pages/confiteria/chupetes/chupetes.component';
import { GalletasComponent } from './pages/confiteria/galletas/galletas.component';
import { GomitasComponent } from './pages/confiteria/gomitas/gomitas.component';
import { SnaksComponent } from './pages/confiteria/snaks/snaks.component';
import { VinosComponent } from './pages/licores/vinos/vinos.component';
import { CervezaComponent } from './pages/licores/cerveza/cerveza.component';
import { WhiskeyComponent } from './pages/licores/whiskey/whiskey.component';
import { BrandyComponent } from './pages/licores/brandy/brandy.component';
import { VodkaComponent } from './pages/licores/vodka/vodka.component';
import { TequilaComponent } from './pages/licores/tequila/tequila.component';
import { GinComponent } from './pages/licores/gin/gin.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'licores',component: LicoresComponent
    
    },
    { path: 'licores', component: LicoresComponent },
    { path: 'vinos', component: VinosComponent },
    { path: 'cerveza', component: CervezaComponent },
    { path: 'whiskey', component: WhiskeyComponent },
    { path: 'brandy', component: BrandyComponent },
    { path: 'vodka', component: VodkaComponent },
    { path: 'tequila', component: TequilaComponent },
    { path: 'gin', component: GinComponent },
  
  { 
    path: 'confiteria',
     component: ConfiteriaComponent ,
     children: [
      { path: 'galletas', component: GalletasComponent },
      { path: 'chocolates', component: ChocolateComponent },
      { path: 'chupetes', component: ChupetesComponent },
      { path: 'gomitas', component: GomitasComponent },
      { path: 'caramelos', component: CaramelosComponent },
      { path: 'chicle', component: ChicleComponent },
      { path: 'snaks', component: SnaksComponent },
      
      
      
      
    ]
    },
  { path: 'promociones', component: PromocionesComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirecciona a /home por defecto
  { path: '**', redirectTo: '/home', pathMatch: 'full' } // Redirecciona a /home para rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
