import { Component } from '@angular/core';
import { BaseLicoresComponent } from '../../../models/base-licores.component';
@Component({
  selector: 'app-vodka',
  templateUrl: './vodka.component.html',
  styleUrl: './vodka.component.css'
})
export class VodkaComponent extends BaseLicoresComponent {
  categoria = 'Vodka';


}


