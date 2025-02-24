import { NgModule ,  CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicoresRoutingModule } from './licores-routing.module';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
// Componentes
import { LicoresComponent } from './licores.component';
import { BrandyComponent } from './brandy/brandy.component';
import { CervezaComponent } from './cerveza/cerveza.component';
import { GinComponent } from './gin/gin.component';
import { TequilaComponent } from './tequila/tequila.component';
import { VinosComponent } from './vinos/vinos.component';
import { VodkaComponent } from './vodka/vodka.component';
import { WhiskeyComponent } from './whiskey/whiskey.component';
import { NZ_CONFIG, NzConfig } from 'ng-zorro-antd/core/config';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import { DoubleLeftOutline,DoubleRightOutline } from '@ant-design/icons-angular/icons';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { FiltrosComponenteComponent } from './components/filtros-componente/filtros-componente.component';
import { PaginacionComponent } from './components/paginacion/paginacion.component';
const icons: IconDefinition[] = [DoubleLeftOutline, DoubleRightOutline];

@NgModule({
  declarations: [
    LicoresComponent,
    BrandyComponent,
    CervezaComponent,
    GinComponent,
    TequilaComponent,
    VinosComponent,
    VodkaComponent,
    WhiskeyComponent,
    SideMenuComponent,
    ProductListComponent,
    FiltrosComponenteComponent,
    PaginacionComponent
  ],
  imports: [
    CommonModule,
    NzMenuModule,
    LicoresRoutingModule,
    NzPaginationModule,
    NzGridModule,
    NzCardModule,
    NzButtonModule,
    NzPaginationModule,
    NzSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NzSelectModule,
    BrowserAnimationsModule, // Obligatorio para NG Zorro
    FormsModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzButtonModule,
    NzButtonModule,
  NzIconModule,
    FormsModule,
    CommonModule,
    FormsModule,
    NzMenuModule,
    NzIconModule,
    NzButtonModule,
    NzPaginationModule,

  ],
  exports: [
    WhiskeyComponent,
    CervezaComponent,
    GinComponent
     // Exporta el componente para que sea accesible desde otros módulos
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] ,
  providers: [
    { provide: NZ_ICONS, useValue: icons },
  ],

})
export class LicoresModule { }
