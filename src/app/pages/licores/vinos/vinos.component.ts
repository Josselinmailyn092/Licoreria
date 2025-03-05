import { Component } from '@angular/core';
import { BaseLicoresComponent } from '../../../models/base-licores.component';
@Component({
  selector: 'app-vinos',
  templateUrl: './vinos.component.html',
  styleUrl: './vinos.component.css'
})

export class VinosComponent extends BaseLicoresComponent {
  categoria = 'Vinos';
}


