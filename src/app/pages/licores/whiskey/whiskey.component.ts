import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-whiskey',
  templateUrl: './whiskey.component.html',
  styleUrl: './whiskey.component.css'
})
export class WhiskeyComponent  implements OnInit{
  selectedCategory = 'Whiskey'; // Define la categoría actual
  brands = [
    { name: 'Carlyle', count: 2 }
    // Agrega más marcas si es necesario
  ];
  constructor(){}

  ngOnInit(): void {
      
  }

}
