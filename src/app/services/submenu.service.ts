import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class SubmenuService {
private subMenuItems =[
  {
    label:'Inicio',
    path:'/home',
    subMenu: []
  },
  
  {
    label :'Licores',
    path: '/licores',
    subMenu:[
        {label:'Vinos',path :'/vinos'},
        {label:'Cerveza',path :'/cerveza'},
        {label:'Whiskey',path :'/whiskey'},
        {label:'Brandy',path :'/brandy'},
        {label:'Vodka',path :'/vodka'},
        {label:'Tequila',path :'/tequila'},
        {label:'Gin',path :'/gin'}      
    ]
  },

  //confiteria submenu 
  {
    label:'Confiteria',
    path:'/confiteria',
    subMenu:[
      {label:'Galletas', path:'/confiteria/galletas'},
      {label:'Chocolate', path:'/confiteria/chocolates'},
      {label:'Chupete', path:'/confiteria/chupetes'},
      {label:'Gomitas', path:'/confiteria/gomitas'},
      {label:'Caramelos', path:'/confiteria/caramelos'},
      {label:'Chicle', path:'/confiteria/chicle'},
      {label:'Snack', path:'/confiteria/snaks'}
    ]

  },
  {
    label:'Promociones',
    path:'/promociones',
    subMenu: []
  },
  
  {
    label:'Nosotros',
    path:'/nosotros',
    subMenu: []
  }
];

geSubMenuItems() {
  return this.subMenuItems;
}
}
