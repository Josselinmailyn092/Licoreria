import { Component } from '@angular/core';
import { BaseLicoresComponent } from '../../../models/base-licores.component';
@Component({
  selector: 'app-gin',
  templateUrl: './gin.component.html',
  styleUrl: '../licores.component.css'
})
export class GinComponent extends BaseLicoresComponent {
  categoria = 'Gin';

}


