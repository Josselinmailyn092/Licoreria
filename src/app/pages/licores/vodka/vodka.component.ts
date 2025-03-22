import { Component } from '@angular/core';
import { BaseLicoresComponent } from '../../../models/base-licores.component';
@Component({
  selector: 'app-vodka',
  templateUrl: './vodka.component.html',
  styleUrl: '../licores.component.css'
})
export class VodkaComponent extends BaseLicoresComponent {
  categoria = 'Vodka';


}


