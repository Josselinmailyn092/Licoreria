import { Component } from '@angular/core';
import { BaseLicoresComponent } from '../../../models/base-licores.component';
@Component({
  selector: 'app-vinos',
  templateUrl: './vinos.component.html',
  styleUrl: '../licores.component.css'
})

export class VinosComponent extends BaseLicoresComponent {
  categoria = 'Vinos';
}


