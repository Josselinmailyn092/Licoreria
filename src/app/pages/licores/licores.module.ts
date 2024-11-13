import { NgModule ,  CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicoresRoutingModule } from './licores-routing.module';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzMenuModule } from 'ng-zorro-antd/menu';
// Componentes
import { LicoresComponent } from './licores.component';
import { BrandyComponent } from './brandy/brandy.component';
import { CervezaComponent } from './cerveza/cerveza.component';
import { GinComponent } from './gin/gin.component';
import { TequilaComponent } from './tequila/tequila.component';
import { VinosComponent } from './vinos/vinos.component';
import { VodkaComponent } from './vodka/vodka.component';
import { WhiskeyComponent } from './whiskey/whiskey.component';

@NgModule({
  declarations: [
    LicoresComponent,
    BrandyComponent,
    CervezaComponent,
    GinComponent,
    TequilaComponent,
    VinosComponent,
    VodkaComponent,
    WhiskeyComponent
  ],
  imports: [
    CommonModule,
    NzMenuModule,
    LicoresRoutingModule,
    NzPaginationModule
  ],
  exports: [
    WhiskeyComponent,
    CervezaComponent,
    GinComponent
     // Exporta el componente para que sea accesible desde otros módulos
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class LicoresModule { }
