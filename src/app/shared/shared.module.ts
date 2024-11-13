import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router'; // Asegúrate de importar esto
import { NzButtonModule } from 'ng-zorro-antd/button';
import { MenuOutline, SearchOutline } from '@ant-design/icons-angular/icons';
import{NzImageModule}  from 'ng-zorro-antd/image';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { FormsModule } from '@angular/forms';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { SidebarComponent } from './sidebar/sidebar.component';
@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    
  ],
  exports:[HeaderComponent,FooterComponent],
  imports: [
    CommonModule,
    FormsModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    RouterModule,
    NzButtonModule,
    NzDropDownModule, 
    NzIconModule.forRoot([MenuOutline,SearchOutline]),
    NzImageModule,NzPaginationModule,
    SidebarComponent
    
  ]
})
export class SharedModule {
  }

